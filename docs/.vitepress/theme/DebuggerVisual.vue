<script setup lang="ts">
import { computed, onMounted, onUnmounted, ref, watch, nextTick } from 'vue'
import { withBase } from 'vitepress'

// Debugger pas cu pas peste un trace de executie generat in prealabil de
// scripts/genereaza-trace.mjs. Fisierul se citeste din docs/public/traces/,
// deci nu se compileaza si nu se ruleaza nimic in browser.
//
// Utilizare:  <DebuggerVisual trace="lista-dublata" titlu="..." />
const props = defineProps<{ trace: string; titlu?: string }>()

interface Variabila {
  nume: string
  tip: string
  val: string
  pointer: boolean
}

interface Cadru {
  functie: string
  activ: boolean
  linie: number | null
  locale: Variabila[]
}

interface BlocHeap {
  adr: string
  fel: 'nod' | 'tablou'
  tip: string
  campuri?: Variabila[]
  elemente?: { idx: number; val: string }[]
}

interface Pas {
  eveniment: 'apel' | 'linie' | 'retur'
  linie: number
  stiva: Cadru[]
  globale: Variabila[]
  heap: BlocHeap[]
  consola: string
}

interface Trace {
  cod: string
  intrare: string
  pasi: Pas[]
}

const date = ref<Trace | null>(null)
const eroare = ref('')
const pas = ref(0)
const ruleaza = ref(false)
const viteza = ref(500)
// Adresa evidentiata acum: tine locul sagetilor stiva -> heap. Trecerea cu
// mouse-ul peste o pastila de pointer aprinde blocul catre care arata.
const adresaSubMouse = ref<string | null>(null)

let cronometru: ReturnType<typeof setInterval> | null = null

onMounted(async () => {
  try
  {
    const raspuns = await fetch(withBase(`/traces/${props.trace}.json`))
    if (!raspuns.ok) throw new Error(`HTTP ${raspuns.status}`)
    date.value = await raspuns.json()
  }
  catch (e)
  {
    eroare.value = `Nu am putut incarca trace-ul "${props.trace}".`
  }
})

onUnmounted(opresteCronometru)

const linii = computed(() => (date.value?.cod ?? '').replace(/\n$/, '').split('\n'))
const pasi = computed(() => date.value?.pasi ?? [])
const ultimulPas = computed(() => Math.max(0, pasi.value.length - 1))
const pasCurent = computed<Pas | null>(() => pasi.value[pas.value] ?? null)

// Varful stivei primul: apelul in care ne aflam acum trebuie sa fie sus.
const stiva = computed(() => [...(pasCurent.value?.stiva ?? [])].reverse())

const noduri = computed(() => (pasCurent.value?.heap ?? []).filter((b) => b.fel === 'nod'))
const tablouri = computed(() => (pasCurent.value?.heap ?? []).filter((b) => b.fel === 'tablou'))

// Sageata dintre doua noduri vecine se deseneaza doar daca legatura chiar
// exista in date: un camp de tip pointer al nodului k care arata catre nodul
// k+1. Daca lantul nu urmeaza ordinea alocarii, nu inventam nicio sageata -
// ramane pastila cu adresa, care spune adevarul.
function areLegaturaCatreUrmatorul(idx: number): boolean {
  const aici = noduri.value[idx]
  const urmatorul = noduri.value[idx + 1]
  if (!aici || !urmatorul) return false
  return (aici.campuri ?? []).some((c) => c.pointer && c.val === urmatorul.adr)
}

const mesaj = computed(() => {
  const p = pasCurent.value
  if (!p) return ''
  const varf = p.stiva[p.stiva.length - 1]
  const numeFunctie = varf?.functie ?? ''

  if (p.eveniment === 'apel')
    return `Se apeleaza ${numeFunctie}(). Pe varful stivei apare un cadru nou, cu parametrii si variabilele lui locale.`

  if (p.eveniment === 'retur')
    return `${numeFunctie}() s-a terminat. Sageata sta pe acolada de inchidere, iar cadrul se sterge de pe stiva impreuna cu tot ce continea.`

  return `Se executa linia ${p.linie} din ${numeFunctie}().`
})

// --- navigare ---------------------------------------------------------------

function opresteCronometru() {
  if (cronometru !== null) clearInterval(cronometru)
  cronometru = null
}

function comutaRulare() {
  if (ruleaza.value)
  {
    ruleaza.value = false
    opresteCronometru()
    return
  }
  if (pas.value >= ultimulPas.value) pas.value = 0
  ruleaza.value = true
  porneste()
}

function porneste() {
  opresteCronometru()
  cronometru = setInterval(() => {
    if (pas.value >= ultimulPas.value)
    {
      ruleaza.value = false
      opresteCronometru()
      return
    }
    pas.value++
  }, viteza.value)
}

watch(viteza, () => {
  if (ruleaza.value) porneste()
})

function inainte() {
  if (pas.value < ultimulPas.value) pas.value++
}

function inapoi() {
  if (pas.value > 0) pas.value--
}

function reset() {
  ruleaza.value = false
  opresteCronometru()
  pas.value = 0
}

// "Peste" (step over): sare pana la primul pas la care stiva NU este mai adanca
// decat acum. Adica intra intr-un apel, il lasa sa se termine si se opreste
// abia la intoarcere. Adancimea stivei e singura informatie necesara.
function peste() {
  const adancimeaAcum = pasCurent.value?.stiva.length ?? 0
  for (let i = pas.value + 1; i <= ultimulPas.value; i++)
  {
    if (pasi.value[i].stiva.length <= adancimeaAcum)
    {
      pas.value = i
      return
    }
  }
  pas.value = ultimulPas.value
}

// Linia activa trebuie sa ramana vizibila si cand autoplay-ul coboara prin cod.
const zonaCod = ref<HTMLElement | null>(null)

watch(pas, async () => {
  await nextTick()
  const zona = zonaCod.value
  if (!zona) return
  const activa = zona.querySelector<HTMLElement>('.dbg-linie--activa')
  if (!activa) return
  const sus = activa.offsetTop
  const jos = sus + activa.offsetHeight
  if (sus < zona.scrollTop || jos > zona.scrollTop + zona.clientHeight)
  {
    zona.scrollTop = sus - zona.clientHeight / 2
  }
})
</script>

<template>
  <div class="dbg">
    <div v-if="titlu" class="dbg__titlu">{{ titlu }}</div>

    <p v-if="eroare" class="dbg__eroare">{{ eroare }}</p>
    <p v-else-if="!date" class="dbg__incarcare">Se incarca trace-ul...</p>

    <template v-else>
      <div class="dbg__controale">
        <button class="dbg-buton dbg-buton--play" @click="comutaRulare">
          {{ ruleaza ? '❚❚ Pauza' : '▶ Ruleaza' }}
        </button>
        <select v-model.number="viteza" class="dbg-select" aria-label="Viteza de rulare">
          <option :value="900">Lent</option>
          <option :value="500">Normal</option>
          <option :value="200">Rapid</option>
        </select>
        <button class="dbg-buton" :disabled="pas === 0" @click="reset">Reset</button>
        <button class="dbg-buton" :disabled="pas === 0" @click="inapoi">&lt; Inapoi</button>
        <button class="dbg-buton" :disabled="pas === ultimulPas" @click="inainte">Inainte &gt;</button>
        <button class="dbg-buton" :disabled="pas === ultimulPas" @click="peste" title="Executa apelul curent pana la capat, fara sa intri in el">
          Peste ⤼
        </button>
        <input
          class="dbg__slider"
          type="range"
          min="0"
          :max="ultimulPas"
          v-model.number="pas"
          aria-label="Pasul curent"
        />
        <span class="dbg__contor">Pasul {{ pas }} din {{ ultimulPas }}</span>
      </div>

      <div class="dbg__coloane">
        <div ref="zonaCod" class="dbg__cod">
          <div
            v-for="(linie, idx) in linii"
            :key="idx"
            class="dbg-linie"
            :class="{
              'dbg-linie--activa': pasCurent?.linie === idx + 1,
              'dbg-linie--retur': pasCurent?.linie === idx + 1 && pasCurent?.eveniment === 'retur',
            }"
          >
            <span class="dbg-linie__marcaj">{{ pasCurent?.linie === idx + 1 ? '▶' : '' }}</span>
            <span class="dbg-linie__nr">{{ idx + 1 }}</span>
            <span class="dbg-linie__text">{{ linie }}</span>
          </div>
        </div>

        <div class="dbg__panou">
          <div class="dbg__eticheta">Stiva de apeluri</div>
          <div class="dbg__cadre">
            <div
              v-for="(cadru, idx) in stiva"
              :key="`${idx}-${cadru.functie}`"
              class="dbg-cadru"
              :class="{ 'dbg-cadru--activ': cadru.activ }"
            >
              <div class="dbg-cadru__antet">
                <span class="dbg-cadru__nume">{{ cadru.functie }}()</span>
                <span v-if="idx === 0" class="dbg-cadru__varf">varf</span>
                <span v-if="cadru.linie" class="dbg-cadru__linie">ln {{ cadru.linie }}</span>
              </div>
              <div v-if="cadru.locale.length > 0" class="dbg-cadru__locale">
                <div v-for="v in cadru.locale" :key="v.nume" class="dbg-var">
                  <span class="dbg-var__nume">{{ v.nume }}</span>
                  <span class="dbg-var__tip">{{ v.tip }}</span>
                  <span
                    class="dbg-var__val"
                    :class="{
                      'dbg-var__val--ptr': v.pointer,
                      'dbg-var__val--null': v.val === 'NULL',
                      'dbg-var__val--gol': v.val === '?',
                      'dbg-var__val--cald': v.pointer && adresaSubMouse === v.val,
                    }"
                    @mouseenter="adresaSubMouse = v.pointer ? v.val : null"
                    @mouseleave="adresaSubMouse = null"
                    >{{ v.val }}</span
                  >
                </div>
              </div>
              <div v-else class="dbg-cadru__goale">fara variabile in acest domeniu</div>
            </div>
          </div>

          <div class="dbg__eticheta">Variabile globale</div>
          <div class="dbg-cadru dbg-cadru--globale">
            <div class="dbg-cadru__locale">
              <div v-for="v in pasCurent?.globale ?? []" :key="v.nume" class="dbg-var">
                <span class="dbg-var__nume">{{ v.nume }}</span>
                <span class="dbg-var__tip">{{ v.tip }}</span>
                <span
                  class="dbg-var__val"
                  :class="{
                    'dbg-var__val--ptr': v.pointer,
                    'dbg-var__val--null': v.val === 'NULL',
                    'dbg-var__val--gol': v.val === '?',
                    'dbg-var__val--cald': v.pointer && adresaSubMouse === v.val,
                  }"
                  @mouseenter="adresaSubMouse = v.pointer ? v.val : null"
                  @mouseleave="adresaSubMouse = null"
                  >{{ v.val }}</span
                >
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="dbg__eticheta dbg__eticheta--heap">
        Heap <span class="dbg__nota">(memoria alocata cu <code>new</code>)</span>
      </div>
      <div class="dbg__heap">
        <p v-if="noduri.length === 0 && tablouri.length === 0" class="dbg__heap-gol">
          Heap-ul este gol - nu s-a alocat inca nimic cu <code>new</code>.
        </p>

        <div v-if="noduri.length > 0" class="dbg__lant">
          <template v-for="(bloc, idx) in noduri" :key="bloc.adr">
            <div class="dbg-nod" :class="{ 'dbg-nod--cald': adresaSubMouse === bloc.adr }">
              <div class="dbg-nod__adr">{{ bloc.adr }}</div>
              <div class="dbg-nod__tip">{{ bloc.tip }}</div>
              <div v-for="c in bloc.campuri ?? []" :key="c.nume" class="dbg-nod__camp">
                <span class="dbg-nod__camp-nume">{{ c.nume }}</span>
                <span
                  class="dbg-nod__camp-val"
                  :class="{
                    'dbg-var__val--ptr': c.pointer,
                    'dbg-var__val--null': c.val === 'NULL',
                    'dbg-var__val--gol': c.val === '?',
                  }"
                  >{{ c.val }}</span
                >
              </div>
            </div>
            <span v-if="areLegaturaCatreUrmatorul(idx)" class="dbg__sageata">→</span>
          </template>
        </div>

        <div
          v-for="bloc in tablouri"
          :key="bloc.adr"
          class="dbg-tablou"
          :class="{ 'dbg-nod--cald': adresaSubMouse === bloc.adr }"
        >
          <div class="dbg-tablou__antet">
            <span class="dbg-nod__adr">{{ bloc.adr }}</span>
            <span class="dbg-nod__tip">{{ bloc.tip }}[{{ (bloc.elemente ?? []).length }}]</span>
          </div>
          <div class="dbg-tablou__celule">
            <div v-for="el in bloc.elemente ?? []" :key="el.idx" class="dbg-celula">
              <span class="dbg-celula__idx">{{ el.idx }}</span>
              <span class="dbg-celula__val" :class="{ 'dbg-var__val--gol': el.val === '?' }">{{ el.val }}</span>
            </div>
          </div>
        </div>
      </div>

      <div class="dbg__jos">
        <div class="dbg__consola">
          <div class="dbg__eticheta">Ce s-a afisat pana acum</div>
          <pre class="dbg__consola-text">{{ pasCurent?.consola || '(nimic inca)' }}</pre>
        </div>
        <p class="dbg__mesaj">{{ mesaj }}</p>
      </div>
    </template>
  </div>
</template>

<style scoped>
.dbg {
  border: 1px solid var(--vp-c-divider);
  border-radius: 12px;
  background-color: var(--vp-c-bg-soft);
  padding: 18px;
  margin: 24px 0;
}

.dbg__titlu {
  font-weight: 600;
  font-size: 0.95rem;
  margin-bottom: 14px;
  color: var(--vp-c-text-1);
}

.dbg__eroare,
.dbg__incarcare {
  margin: 0;
  font-size: 0.9rem;
  color: var(--vp-c-text-3);
}

.dbg__eroare {
  color: var(--vp-c-danger-1);
}

/* --- controale --- */

.dbg__controale {
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: 8px;
  margin-bottom: 14px;
}

.dbg-buton,
.dbg-select {
  border: 1px solid var(--vp-c-divider);
  border-radius: 7px;
  background-color: var(--vp-c-bg);
  color: var(--vp-c-text-1);
  font-size: 0.88rem;
  padding: 5px 13px;
  cursor: pointer;
  transition: border-color 0.2s, color 0.2s;
}

.dbg-buton:hover:not(:disabled),
.dbg-select:hover {
  border-color: var(--vp-c-brand-1);
  color: var(--vp-c-brand-1);
}

.dbg-buton:disabled {
  opacity: 0.4;
  cursor: not-allowed;
}

.dbg-buton--play {
  min-width: 108px;
  font-weight: 600;
  border-color: var(--vp-c-brand-1);
  color: var(--vp-c-brand-1);
}

.dbg-select {
  padding: 5px 8px;
}

.dbg__slider {
  flex: 1;
  min-width: 120px;
  accent-color: var(--vp-c-brand-1);
}

.dbg__contor {
  font-size: 0.85rem;
  color: var(--vp-c-text-3);
  white-space: nowrap;
}

/* --- cod + stiva --- */

.dbg__coloane {
  display: grid;
  grid-template-columns: minmax(0, 1.35fr) minmax(0, 1fr);
  gap: 14px;
  align-items: start;
}

.dbg__cod {
  max-height: 420px;
  overflow: auto;
  border: 1px solid var(--vp-c-divider);
  border-radius: 8px;
  background-color: var(--vp-c-bg);
  padding: 8px 0;
  scroll-behavior: smooth;
}

.dbg-linie {
  display: grid;
  grid-template-columns: 18px 34px 1fr;
  align-items: baseline;
  font-family: var(--vp-font-family-mono);
  font-size: 0.78rem;
  line-height: 1.55;
  border-left: 3px solid transparent;
}

/* Culori fixe: linia activa trebuie sa se vada la fel de bine in ambele teme */
.dbg-linie--activa {
  background-color: rgba(255, 197, 61, 0.22);
  border-left-color: #f0b429;
}

/* Pasul de "retur" sta pe acolada de inchidere - alta nuanta, ca sa se vada
   ca functia tocmai s-a terminat, nu ca mai executa ceva */
.dbg-linie--retur {
  background-color: rgba(120, 180, 255, 0.22);
  border-left-color: #4c8dd9;
}

.dbg-linie__marcaj {
  text-align: center;
  color: #f0b429;
  font-size: 0.7rem;
}

.dbg-linie--retur .dbg-linie__marcaj {
  color: #4c8dd9;
}

.dbg-linie__nr {
  text-align: right;
  padding-right: 10px;
  color: var(--vp-c-text-3);
  user-select: none;
}

.dbg-linie__text {
  white-space: pre;
  color: var(--vp-c-text-1);
}

.dbg__panou {
  min-width: 0;
}

.dbg__eticheta {
  font-size: 0.78rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.04em;
  color: var(--vp-c-text-3);
  margin-bottom: 6px;
}

.dbg__eticheta--heap {
  margin-top: 18px;
}

.dbg__nota {
  text-transform: none;
  letter-spacing: 0;
  font-weight: 400;
}

.dbg__cadre {
  display: flex;
  flex-direction: column;
  gap: 6px;
  margin-bottom: 16px;
}

.dbg-cadru {
  border: 1px solid var(--vp-c-divider);
  border-radius: 7px;
  background-color: var(--vp-c-bg);
  overflow: hidden;
}

.dbg-cadru--activ {
  border-color: var(--vp-c-brand-1);
  box-shadow: inset 3px 0 0 var(--vp-c-brand-1);
}

.dbg-cadru__antet {
  display: flex;
  align-items: baseline;
  gap: 7px;
  padding: 6px 10px;
  font-family: var(--vp-font-family-mono);
  font-size: 0.8rem;
  color: var(--vp-c-text-1);
}

.dbg-cadru__nume {
  font-weight: 600;
}

.dbg-cadru__varf {
  font-size: 0.62rem;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  padding: 1px 5px;
  border-radius: 4px;
  background-color: var(--vp-c-brand-soft);
  color: var(--vp-c-brand-1);
  font-family: var(--vp-font-family-base);
}

.dbg-cadru__linie {
  margin-left: auto;
  font-size: 0.72rem;
  color: var(--vp-c-text-3);
}

.dbg-cadru__locale {
  border-top: 1px solid var(--vp-c-divider);
  padding: 4px 10px 7px;
}

.dbg-cadru__goale {
  border-top: 1px solid var(--vp-c-divider);
  padding: 5px 10px;
  font-size: 0.72rem;
  font-style: italic;
  color: var(--vp-c-text-3);
}

.dbg-var {
  display: grid;
  grid-template-columns: minmax(0, auto) minmax(0, 1fr) auto;
  align-items: baseline;
  gap: 7px;
  font-family: var(--vp-font-family-mono);
  font-size: 0.76rem;
  padding: 2px 0;
}

.dbg-var__nume {
  color: var(--vp-c-text-1);
}

.dbg-var__tip {
  font-size: 0.68rem;
  color: var(--vp-c-text-3);
}

.dbg-var__val,
.dbg-nod__camp-val {
  padding: 1px 6px;
  border-radius: 4px;
  border: 1px solid var(--vp-c-divider);
  background-color: var(--vp-c-bg-soft);
  color: var(--vp-c-text-1);
  white-space: nowrap;
}

.dbg-var__val--ptr {
  border-color: var(--vp-c-brand-1);
  color: var(--vp-c-brand-1);
  cursor: pointer;
}

.dbg-var__val--cald {
  background-color: var(--vp-c-brand-soft);
}

.dbg-var__val--null {
  color: var(--vp-c-text-3);
  font-style: italic;
}

/* Valoare neinitializata: exact ce arata si un debugger real */
.dbg-var__val--gol {
  color: var(--vp-c-warning-1);
  border-color: var(--vp-c-warning-1);
  font-weight: 700;
}

/* --- heap --- */

.dbg__heap {
  border: 1px solid var(--vp-c-divider);
  border-radius: 8px;
  background-color: var(--vp-c-bg);
  padding: 12px;
  overflow-x: auto;
}

.dbg__heap-gol {
  margin: 0;
  font-size: 0.82rem;
  font-style: italic;
  color: var(--vp-c-text-3);
}

.dbg__lant {
  display: flex;
  align-items: center;
  gap: 4px;
  width: max-content;
}

.dbg-nod {
  border: 1px solid var(--vp-c-divider);
  border-radius: 7px;
  background-color: var(--vp-c-bg-soft);
  padding: 6px 8px;
  min-width: 104px;
  transition: border-color 0.18s, box-shadow 0.18s;
}

.dbg-nod--cald {
  border-color: var(--vp-c-brand-1);
  box-shadow: 0 0 0 2px var(--vp-c-brand-soft);
}

.dbg-nod__adr {
  font-family: var(--vp-font-family-mono);
  font-size: 0.66rem;
  color: var(--vp-c-brand-1);
}

.dbg-nod__tip {
  font-family: var(--vp-font-family-mono);
  font-size: 0.72rem;
  font-weight: 600;
  color: var(--vp-c-text-2);
  margin-bottom: 3px;
}

.dbg-nod__camp {
  display: flex;
  align-items: baseline;
  justify-content: space-between;
  gap: 8px;
  font-family: var(--vp-font-family-mono);
  font-size: 0.72rem;
  padding: 1px 0;
}

.dbg-nod__camp-nume {
  color: var(--vp-c-text-2);
}

.dbg__sageata {
  color: var(--vp-c-brand-1);
  font-size: 1.1rem;
  flex-shrink: 0;
}

.dbg-tablou {
  display: inline-block;
  border: 1px solid var(--vp-c-divider);
  border-radius: 7px;
  background-color: var(--vp-c-bg-soft);
  padding: 6px 8px;
  margin-top: 10px;
}

.dbg-tablou__antet {
  display: flex;
  align-items: baseline;
  gap: 8px;
  margin-bottom: 4px;
}

.dbg-tablou__celule {
  display: flex;
  gap: 3px;
}

.dbg-celula {
  display: flex;
  flex-direction: column;
  align-items: center;
  min-width: 34px;
  border: 1px solid var(--vp-c-divider);
  border-radius: 5px;
  background-color: var(--vp-c-bg);
  padding: 2px 5px;
}

.dbg-celula__idx {
  font-family: var(--vp-font-family-mono);
  font-size: 0.62rem;
  color: var(--vp-c-text-3);
}

.dbg-celula__val {
  font-family: var(--vp-font-family-mono);
  font-size: 0.78rem;
  color: var(--vp-c-text-1);
}

.dbg-celula__val.dbg-var__val--gol {
  border: none;
  background: none;
  padding: 0;
}

/* --- consola + mesaj --- */

.dbg__jos {
  display: grid;
  grid-template-columns: minmax(0, 1fr) minmax(0, 1.35fr);
  gap: 14px;
  align-items: start;
  margin-top: 16px;
}

.dbg__consola-text {
  margin: 0;
  min-height: 3em;
  border: 1px solid var(--vp-c-divider);
  border-radius: 8px;
  background-color: var(--vp-c-bg);
  padding: 8px 10px;
  font-family: var(--vp-font-family-mono);
  font-size: 0.8rem;
  color: var(--vp-c-text-1);
  white-space: pre-wrap;
}

.dbg__mesaj {
  margin: 0;
  font-size: 0.88rem;
  line-height: 1.55;
  color: var(--vp-c-text-2);
}

@media (max-width: 720px) {
  .dbg {
    padding: 14px;
  }

  .dbg__coloane,
  .dbg__jos {
    grid-template-columns: minmax(0, 1fr);
  }

  .dbg__cod {
    max-height: 300px;
  }
}
</style>
