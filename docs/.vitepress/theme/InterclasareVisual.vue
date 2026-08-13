<script setup lang="ts">
import { computed, onUnmounted, ref, watch } from 'vue'

// Vizualizator pas cu pas pentru interclasarea a doi vectori sortati crescator.
// Vectorii se dau ca string-uri cu valorile separate prin spatii: a="3 7 9".
//   mod = "carti"  -> doua teancuri de carti de joc si teancul rezultat
//   mod = "numere" -> vectorii A, B, C cu indicii i, j, k
// varianta alege ce ajunge in C: toate elementele (interclasare) sau rezultatul
// unei operatii cu multimi ordonate.
const props = withDefaults(
  defineProps<{
    a: string
    b: string
    mod?: 'carti' | 'numere'
    varianta?: 'interclasare' | 'reuniune' | 'intersectie' | 'diferenta'
    titlu?: string
  }>(),
  { mod: 'numere', varianta: 'interclasare' }
)

type Sursa = 'A' | 'B' | 'AB'

interface ElementC {
  val: number
  sursa: Sursa
}

type Faza =
  | 'init'
  | 'compara'
  | 'iaA'
  | 'iaB'
  | 'iaAmbele'
  | 'sareA'
  | 'sareB'
  | 'sareAmbele'
  | 'goleste-A'
  | 'goleste-B'
  | 'gata'

interface Cadru {
  i: number
  j: number
  k: number
  c: ElementC[]
  compara: boolean // se evidentiaza in acelasi timp A[i] si B[j]
  sariteA: number[] // indici din A lasati deoparte, care nu ajung in C
  sariteB: number[]
  nou: boolean // ultimul element din C tocmai a fost adaugat
  faza: Faza
  mesaj: string
}

// Vector indexat de la 1: pozitia 0 ramane nefolosita.
function citesteVector(text: string): number[] {
  const valori = text
    .trim()
    .split(/\s+/)
    .map((x) => parseInt(x, 10))
    .filter((x) => !isNaN(x))

  return [0, ...valori]
}

const vA = computed(() => citesteVector(props.a))
const vB = computed(() => citesteVector(props.b))

const numeRang = ['', 'A', '2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K']

function rang(val: number): string {
  return val >= 1 && val <= 13 ? numeRang[val] : String(val)
}

// "A[2] = 5" in mod numere, "5 de inima rosie" in mod carti.
function descrie(care: 'A' | 'B', idx: number, val: number): string {
  if (props.mod === 'carti') return `${rang(val)}${care === 'A' ? '♥' : '♠'}`
  return `${care}[${idx}] = ${val}`
}

// Cate elemente poate avea C in cazul cel mai bun, pentru varianta curenta.
const capacitate = computed(() => {
  const n = vA.value.length - 1
  const m = vB.value.length - 1
  if (props.varianta === 'intersectie') return Math.min(n, m)
  if (props.varianta === 'diferenta') return n
  return n + m
})

const cadre = computed<Cadru[]>(() => {
  const A = vA.value
  const B = vB.value
  const n = A.length - 1
  const m = B.length - 1
  const varianta = props.varianta
  const carti = props.mod === 'carti'

  const lista: Cadru[] = []
  const c: ElementC[] = []
  const sariteA: number[] = []
  const sariteB: number[] = []
  let i = 1
  let j = 1

  function adauga(faza: Faza, mesaj: string, compara = false, nou = false) {
    lista.push({
      i,
      j,
      k: c.length,
      c: c.slice(),
      compara,
      sariteA: sariteA.slice(),
      sariteB: sariteB.slice(),
      nou,
      faza,
      mesaj,
    })
  }

  adauga(
    'init',
    carti
      ? 'Ambele teancuri sunt deja ordonate crescator, cu fata in sus. Ne uitam doar la cartea ' +
          'de deasupra fiecarui teanc; teancul rezultat este inca gol.'
      : `i arata spre primul element din A, j spre primul element din B, iar C este gol, deci k = 0.`
  )

  while (i <= n && j <= m)
  {
    const x = A[i]
    const y = B[j]
    const etichetaA = descrie('A', i, x)
    const etichetaB = descrie('B', j, y)

    let verdict: string
    if (x < y) verdict = `${x} < ${y}`
    else if (x > y) verdict = `${x} > ${y}`
    else verdict = `${x} = ${y}`

    adauga('compara', `Comparam ${etichetaA} cu ${etichetaB}: ${verdict}.`, true)

    if (varianta === 'interclasare')
    {
      if (x < y)
      {
        c.push({ val: x, sursa: 'A' })
        i++
        adauga(
          'iaA',
          carti
            ? `${rang(x)}♥ este mai mica, deci coboara in teancul rezultat. Descoperim urmatoarea ` +
                `carte din teancul A.`
            : `Punem ${x} in C[${c.length}] si avansam i la ${i}.`,
          false,
          true
        )
      }
      else
      {
        c.push({ val: y, sursa: 'B' })
        j++
        const explicatie =
          x === y
            ? `${x} nu este strict mai mic decat ${y}, deci se ia elementul din B`
            : `${y} este mai mic`
        adauga(
          'iaB',
          carti
            ? `${rang(y)}♠ nu este mai mare, deci ea coboara in teancul rezultat. Descoperim ` +
                `urmatoarea carte din teancul B.`
            : `${explicatie}: C[${c.length}] = ${y}, iar j avanseaza la ${j}.`,
          false,
          true
        )
      }
    }
    else if (varianta === 'reuniune')
    {
      if (x < y)
      {
        c.push({ val: x, sursa: 'A' })
        i++
        adauga('iaA', `${x} apare doar in A pe pozitia asta: C[${c.length}] = ${x}, i devine ${i}.`, false, true)
      }
      else if (x > y)
      {
        c.push({ val: y, sursa: 'B' })
        j++
        adauga('iaB', `${y} apare doar in B pe pozitia asta: C[${c.length}] = ${y}, j devine ${j}.`, false, true)
      }
      else
      {
        c.push({ val: x, sursa: 'AB' })
        i++
        j++
        adauga(
          'iaAmbele',
          `${x} apare in ambii vectori, dar in reuniune intra o singura data: C[${c.length}] = ${x}. ` +
            `Avansam si i (la ${i}), si j (la ${j}).`,
          false,
          true
        )
      }
    }
    else if (varianta === 'intersectie')
    {
      if (x < y)
      {
        sariteA.push(i)
        i++
        adauga('sareA', `${x} este mai mic decat orice element ramas in B, deci nu poate fi comun. Avansam i la ${i}.`)
      }
      else if (x > y)
      {
        sariteB.push(j)
        j++
        adauga('sareB', `${y} este mai mic decat orice element ramas in A, deci nu poate fi comun. Avansam j la ${j}.`)
      }
      else
      {
        c.push({ val: x, sursa: 'AB' })
        i++
        j++
        adauga(
          'iaAmbele',
          `${x} apare in amandoi vectorii, deci intra in intersectie: C[${c.length}] = ${x}. ` +
            `Avansam si i (la ${i}), si j (la ${j}).`,
          false,
          true
        )
      }
    }
    else
    {
      if (x < y)
      {
        c.push({ val: x, sursa: 'A' })
        i++
        adauga(
          'iaA',
          `${x} este mai mic decat toate elementele ramase in B, deci sigur nu apare in B: ` +
            `C[${c.length}] = ${x}, iar i devine ${i}.`,
          false,
          true
        )
      }
      else if (x > y)
      {
        sariteB.push(j)
        j++
        adauga('sareB', `${y} nu ne intereseaza: cautam elemente din A. Avansam doar j, la ${j}.`)
      }
      else
      {
        sariteA.push(i)
        sariteB.push(j)
        i++
        j++
        adauga(
          'sareAmbele',
          `${x} apare si in B, deci nu intra in diferenta. Avansam si i (la ${i}), si j (la ${j}).`
        )
      }
    }
  }

  const goleseA = varianta !== 'intersectie'
  const goleseB = varianta === 'interclasare' || varianta === 'reuniune'

  while (i <= n)
  {
    if (goleseA)
    {
      const x = A[i]
      c.push({ val: x, sursa: 'A' })
      i++
      adauga(
        'goleste-A',
        carti
          ? `Teancul B s-a terminat, deci restul cartilor din A coboara in ordine. Acum coboara ${rang(x)}♥.`
          : `In B nu mai avem elemente, deci copiem restul lui A: C[${c.length}] = ${x}, i devine ${i}.`,
        false,
        true
      )
    }
    else
    {
      sariteA.push(i)
      i++
      adauga('sareA', `In B nu mai avem elemente, deci niciun element ramas in A nu mai poate fi comun.`)
    }
  }

  while (j <= m)
  {
    if (goleseB)
    {
      const y = B[j]
      c.push({ val: y, sursa: 'B' })
      j++
      adauga(
        'goleste-B',
        carti
          ? `Teancul A s-a terminat, deci restul cartilor din B coboara in ordine. Acum coboara ${rang(y)}♠.`
          : `In A nu mai avem elemente, deci copiem restul lui B: C[${c.length}] = ${y}, j devine ${j}.`,
        false,
        true
      )
    }
    else
    {
      sariteB.push(j)
      j++
      adauga('sareB', `Elementele ramase in B nu mai conteaza pentru rezultat.`)
    }
  }

  const numeRezultat =
    varianta === 'reuniune'
      ? 'reuniunea'
      : varianta === 'intersectie'
        ? 'intersectia'
        : varianta === 'diferenta'
          ? 'diferenta A \\ B'
          : 'rezultatul'

  adauga(
    'gata',
    carti
      ? `Gata: teancul rezultat are ${c.length} carti si este ordonat crescator. Fiecare carte a ` +
          `coborat exact o data.`
      : `Gata: in C avem ${numeRezultat}, cu ${c.length} elemente, in ordine crescatoare. ` +
          `Fiecare element a fost privit o singura data.`
  )

  return lista
})

const pas = ref(0)
const ruleaza = ref(false)
const viteza = ref(600)
let cronometru: ReturnType<typeof setInterval> | null = null

const cadru = computed(() => cadre.value[Math.min(pas.value, cadre.value.length - 1)])
const ultimulPas = computed(() => cadre.value.length - 1)

function opresteCronometru() {
  if (cronometru !== null)
  {
    clearInterval(cronometru)
    cronometru = null
  }
}

watch([ruleaza, viteza], () => {
  opresteCronometru()
  if (!ruleaza.value) return

  cronometru = setInterval(() => {
    if (pas.value >= ultimulPas.value)
    {
      ruleaza.value = false
      return
    }
    pas.value++
  }, viteza.value)
})

onUnmounted(opresteCronometru)

function comutaRulare() {
  if (ruleaza.value)
  {
    ruleaza.value = false
    return
  }
  // De la capat, daca simularea s-a terminat deja
  if (pas.value >= ultimulPas.value) pas.value = 0
  ruleaza.value = true
}

function inainte() {
  ruleaza.value = false
  if (pas.value < ultimulPas.value) pas.value++
}

function inapoi() {
  ruleaza.value = false
  if (pas.value > 0) pas.value--
}

function reset() {
  ruleaza.value = false
  pas.value = 0
}

watch(cadre, () => {
  ruleaza.value = false
  pas.value = 0
})

interface Celula {
  idx: number
  val: number
  luata: boolean // indicele a fost depasit
  curenta: boolean // pe ea arata indicele acum
  comparata: boolean // participa la comparatia din acest pas
  sarita: boolean // a fost lasata deoparte, nu ajunge in C
  santinela: boolean // pozitia n + 1, unde ajunge indicele la final
}

function construieste(care: 'A' | 'B'): Celula[] {
  const v = care === 'A' ? vA.value : vB.value
  const n = v.length - 1
  const c = cadru.value
  const indice = care === 'A' ? c.i : c.j
  const sarite = care === 'A' ? c.sariteA : c.sariteB
  const rezultat: Celula[] = []

  for (let p = 1; p <= n; p++)
  {
    rezultat.push({
      idx: p,
      val: v[p],
      luata: p < indice,
      curenta: p === indice,
      comparata: c.compara && p === indice,
      sarita: sarite.indexOf(p) !== -1,
      santinela: false,
    })
  }

  // Pozitia n + 1 nu exista in vector, dar indicele ajunge acolo cand vectorul s-a golit.
  rezultat.push({
    idx: n + 1,
    val: 0,
    luata: false,
    curenta: indice === n + 1,
    comparata: false,
    sarita: false,
    santinela: true,
  })

  return rezultat
}

const celuleA = computed(() => construieste('A'))
const celuleB = computed(() => construieste('B'))

// Cartile ramase in teanc: prima nedescoperita este cea de deasupra.
const cartiA = computed(() => celuleA.value.filter((x) => !x.santinela))
const cartiB = computed(() => celuleB.value.filter((x) => !x.santinela))

// In mod numere desenam si pozitiile inca nescrise din C, ca sa se vada cate mai incap.
const sloturiGoale = computed(() => Math.max(capacitate.value - cadru.value.c.length, 0))

function simbol(sursa: Sursa): string {
  return sursa === 'B' ? '♠' : '♥'
}
</script>

<template>
  <div class="ic" :class="`ic--${mod}`">
    <div v-if="titlu" class="ic__titlu">{{ titlu }}</div>

    <!-- Modul carti: doua teancuri cu fata in sus si teancul rezultat -->
    <template v-if="mod === 'carti'">
      <div class="ic__teanc">
        <span class="ic__eticheta">Teancul A</span>
        <div class="ic__carti">
          <div
            v-for="x in cartiA"
            :key="`a-${x.idx}`"
            class="ic-carte ic-carte--rosie"
            :class="{
              'ic-carte--luata': x.luata,
              'ic-carte--deasupra': x.curenta,
              'ic-carte--comparata': x.comparata,
            }"
          >
            <span class="ic-carte__rang">{{ rang(x.val) }}</span>
            <span class="ic-carte__semn">♥</span>
          </div>
          <span v-if="cartiA.every((x) => x.luata)" class="ic__gol">teanc gol</span>
        </div>
      </div>

      <div class="ic__teanc">
        <span class="ic__eticheta">Teancul B</span>
        <div class="ic__carti">
          <div
            v-for="x in cartiB"
            :key="`b-${x.idx}`"
            class="ic-carte ic-carte--neagra"
            :class="{
              'ic-carte--luata': x.luata,
              'ic-carte--deasupra': x.curenta,
              'ic-carte--comparata': x.comparata,
            }"
          >
            <span class="ic-carte__rang">{{ rang(x.val) }}</span>
            <span class="ic-carte__semn">♠</span>
          </div>
          <span v-if="cartiB.every((x) => x.luata)" class="ic__gol">teanc gol</span>
        </div>
      </div>

      <div class="ic__teanc ic__teanc--rezultat">
        <span class="ic__eticheta">Rezultat</span>
        <div class="ic__carti">
          <div
            v-for="(x, idx) in cadru.c"
            :key="`c-${idx}`"
            class="ic-carte"
            :class="[
              x.sursa === 'B' ? 'ic-carte--neagra' : 'ic-carte--rosie',
              { 'ic-carte--noua': cadru.nou && idx === cadru.c.length - 1 },
            ]"
          >
            <span class="ic-carte__rang">{{ rang(x.val) }}</span>
            <span class="ic-carte__semn">{{ simbol(x.sursa) }}</span>
          </div>
          <span v-if="cadru.c.length === 0" class="ic__gol">inca nicio carte</span>
        </div>
      </div>

      <p class="ic__legenda">
        Culoarea arata de unde a venit cartea: <span class="ic__rosu">♥ din teancul A</span>,
        <span class="ic__negru">♠ din teancul B</span>.
      </p>
    </template>

    <!-- Modul numere: vectorii A, B, C cu indicii i, j, k -->
    <template v-else>
      <div class="ic__rand">
        <span class="ic__eticheta">A</span>
        <div class="ic__celule">
          <div v-for="x in celuleA" :key="`a-${x.idx}`" class="ic-coloana">
            <div
              class="ic-celula"
              :class="{
                'ic-celula--santinela': x.santinela,
                'ic-celula--luata': x.luata,
                'ic-celula--curenta': x.curenta && !x.santinela,
                'ic-celula--comparata': x.comparata,
                'ic-celula--sarita': x.sarita,
              }"
            >
              <span v-if="!x.santinela">{{ x.val }}</span>
            </div>
            <span class="ic-coloana__index">{{ x.idx }}</span>
            <span class="ic-coloana__indice" :class="{ 'ic-coloana__indice--activ': x.curenta }">
              {{ x.curenta ? 'i' : '' }}
            </span>
          </div>
        </div>
      </div>

      <div class="ic__rand">
        <span class="ic__eticheta">B</span>
        <div class="ic__celule">
          <div v-for="x in celuleB" :key="`b-${x.idx}`" class="ic-coloana">
            <div
              class="ic-celula"
              :class="{
                'ic-celula--santinela': x.santinela,
                'ic-celula--luata': x.luata,
                'ic-celula--curenta': x.curenta && !x.santinela,
                'ic-celula--comparata': x.comparata,
                'ic-celula--sarita': x.sarita,
              }"
            >
              <span v-if="!x.santinela">{{ x.val }}</span>
            </div>
            <span class="ic-coloana__index">{{ x.idx }}</span>
            <span class="ic-coloana__indice" :class="{ 'ic-coloana__indice--activ': x.curenta }">
              {{ x.curenta ? 'j' : '' }}
            </span>
          </div>
        </div>
      </div>

      <div class="ic__rand">
        <span class="ic__eticheta">C</span>
        <div class="ic__celule">
          <div v-for="(x, idx) in cadru.c" :key="`c-${idx}`" class="ic-coloana">
            <div
              class="ic-celula ic-celula--scrisa"
              :class="[
                x.sursa === 'B' ? 'ic-celula--dinB' : 'ic-celula--dinA',
                { 'ic-celula--noua': cadru.nou && idx === cadru.c.length - 1 },
              ]"
            >
              {{ x.val }}
            </div>
            <span class="ic-coloana__index">{{ idx + 1 }}</span>
            <span
              class="ic-coloana__indice"
              :class="{ 'ic-coloana__indice--activ': idx === cadru.c.length - 1 }"
            >
              {{ idx === cadru.c.length - 1 ? 'k' : '' }}
            </span>
          </div>

          <div v-for="s in sloturiGoale" :key="`gol-${s}`" class="ic-coloana">
            <div class="ic-celula ic-celula--liber"></div>
            <span class="ic-coloana__index">{{ cadru.c.length + s }}</span>
            <span class="ic-coloana__indice"></span>
          </div>
        </div>
      </div>

      <p class="ic__legenda">
        <span class="ic__pastila ic__pastila--dinA">venit din A</span>
        <span class="ic__pastila ic__pastila--dinB">venit din B</span>
        <span class="ic__pastila ic__pastila--curent">elementul spre care arata indicele</span>
      </p>
    </template>

    <p class="ic__mesaj">{{ cadru.mesaj }}</p>

    <div class="ic__controale">
      <button class="ic-buton ic-buton--play" @click="comutaRulare">
        {{ ruleaza ? '❚❚ Pauza' : '▶ Ruleaza' }}
      </button>
      <select v-model.number="viteza" class="ic-select" aria-label="Viteza de rulare">
        <option :value="1000">Lent</option>
        <option :value="600">Normal</option>
        <option :value="250">Rapid</option>
      </select>
      <button class="ic-buton" :disabled="pas === 0" @click="reset">Reset</button>
      <button class="ic-buton" :disabled="pas === 0" @click="inapoi">&lt; Inapoi</button>
      <button class="ic-buton" :disabled="pas === ultimulPas" @click="inainte">Inainte &gt;</button>
      <span class="ic__contor">Pasul {{ pas }} din {{ ultimulPas }}</span>
    </div>
  </div>
</template>

<style scoped>
.ic {
  --ic-celula: 44px;
  --ic-carte-l: 46px;
  --ic-carte-h: 64px;
  border: 1px solid var(--vp-c-divider);
  border-radius: 12px;
  background-color: var(--vp-c-bg-soft);
  padding: 18px;
  margin: 24px 0;
}

.ic__titlu {
  font-weight: 600;
  font-size: 0.95rem;
  margin-bottom: 14px;
  color: var(--vp-c-text-1);
}

.ic__rand,
.ic__teanc {
  display: flex;
  align-items: flex-start;
  gap: 12px;
  margin-bottom: 10px;
}

.ic__teanc--rezultat {
  margin-top: 16px;
  padding-top: 14px;
  border-top: 1px dashed var(--vp-c-divider);
}

.ic__eticheta {
  flex-shrink: 0;
  width: 62px;
  padding-top: 12px;
  font-family: var(--vp-font-family-mono);
  font-size: 0.9rem;
  font-weight: 700;
  color: var(--vp-c-text-2);
}

.ic__celule,
.ic__carti {
  display: flex;
  align-items: flex-start;
  gap: 6px;
  overflow-x: auto;
  padding-bottom: 4px;
  min-height: var(--ic-celula);
}

.ic__gol {
  align-self: center;
  font-size: 0.85rem;
  font-style: italic;
  color: var(--vp-c-text-3);
}

/* --- celule (mod numere) --- */

.ic-coloana {
  flex-shrink: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.ic-celula {
  width: var(--ic-celula);
  height: var(--ic-celula);
  display: flex;
  align-items: center;
  justify-content: center;
  border: 2px solid var(--vp-c-divider);
  border-radius: 8px;
  background-color: var(--vp-c-bg);
  font-family: var(--vp-font-family-mono);
  font-size: 0.95rem;
  font-weight: 600;
  color: var(--vp-c-text-1);
  transition: background-color 0.18s, border-color 0.18s, opacity 0.18s;
}

.ic-celula--luata {
  opacity: 0.35;
}

.ic-celula--curenta {
  border-color: var(--vp-c-brand-1);
  opacity: 1;
}

.ic-celula--comparata {
  border-color: var(--vp-c-warning-1);
  background-color: hsl(40, 85%, 68%);
  color: #1b1b1f;
}

.ic-celula--sarita {
  border-style: dashed;
  border-color: var(--vp-c-danger-1);
  text-decoration: line-through;
}

.ic-celula--santinela {
  border-style: dashed;
  background-color: transparent;
  opacity: 0.6;
}

.ic-celula--liber {
  border-style: dashed;
  background-color: transparent;
  opacity: 0.45;
}

/* Culori fixe: elementele din C arata la fel in tema light si in tema dark */
.ic-celula--dinA {
  background-color: hsl(0, 62%, 80%);
  border-color: hsl(0, 52%, 58%);
  color: #1b1b1f;
}

.ic-celula--dinB {
  background-color: hsl(205, 45%, 80%);
  border-color: hsl(205, 45%, 52%);
  color: #1b1b1f;
}

.ic-celula--noua {
  border-color: var(--vp-c-success-1);
  border-width: 3px;
}

.ic-coloana__index {
  margin-top: 5px;
  font-family: var(--vp-font-family-mono);
  font-size: 0.78rem;
  color: var(--vp-c-text-3);
}

.ic-coloana__indice {
  height: 1.2em;
  font-family: var(--vp-font-family-mono);
  font-size: 0.85rem;
  font-weight: 700;
  color: transparent;
}

.ic-coloana__indice--activ {
  color: var(--vp-c-brand-1);
}

/* --- carti de joc (mod carti) --- */

.ic-carte {
  flex-shrink: 0;
  position: relative;
  width: var(--ic-carte-l);
  height: var(--ic-carte-h);
  border-radius: 7px;
  border: 1px solid hsl(0, 0%, 70%);
  background-color: hsl(0, 0%, 97%);
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.25);
  transition: transform 0.18s, opacity 0.18s, border-color 0.18s;
}

.ic-carte--rosie {
  color: hsl(352, 70%, 42%);
}

.ic-carte--neagra {
  color: #1b1b1f;
}

.ic-carte__rang {
  position: absolute;
  top: 3px;
  left: 5px;
  font-family: var(--vp-font-family-mono);
  font-size: 0.82rem;
  font-weight: 700;
}

.ic-carte__semn {
  font-size: 1.5rem;
  line-height: 1;
}

.ic-carte--luata {
  opacity: 0.28;
  transform: scale(0.9);
}

.ic-carte--deasupra {
  transform: translateY(-6px);
  border-color: var(--vp-c-brand-1);
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.3);
}

.ic-carte--comparata {
  border-color: var(--vp-c-warning-1);
  border-width: 2px;
}

.ic-carte--noua {
  border-color: var(--vp-c-success-1);
  border-width: 2px;
}

/* --- legenda, mesaj, controale --- */

.ic__legenda {
  margin: 12px 0 0;
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 8px;
  font-size: 0.84rem;
  color: var(--vp-c-text-2);
}

.ic__rosu {
  color: hsl(352, 70%, 48%);
  font-weight: 600;
}

.ic__negru {
  color: var(--vp-c-text-1);
  font-weight: 600;
}

.ic__pastila {
  padding: 2px 8px;
  border-radius: 999px;
  border: 2px solid transparent;
  font-size: 0.78rem;
  color: #1b1b1f;
}

.ic__pastila--dinA {
  background-color: hsl(0, 62%, 80%);
}

.ic__pastila--dinB {
  background-color: hsl(205, 45%, 80%);
}

.ic__pastila--curent {
  background-color: transparent;
  border-color: var(--vp-c-brand-1);
  color: var(--vp-c-text-2);
}

.ic__mesaj {
  margin: 14px 0 0;
  min-height: 3.4em;
  font-size: 0.92rem;
  line-height: 1.55;
  color: var(--vp-c-text-2);
}

.ic__controale {
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: 8px;
  margin-top: 10px;
}

.ic-buton,
.ic-select {
  border: 1px solid var(--vp-c-divider);
  border-radius: 7px;
  background-color: var(--vp-c-bg);
  color: var(--vp-c-text-1);
  font-size: 0.88rem;
  padding: 5px 13px;
  cursor: pointer;
  transition: border-color 0.2s, color 0.2s;
}

.ic-buton:hover:not(:disabled),
.ic-select:hover {
  border-color: var(--vp-c-brand-1);
  color: var(--vp-c-brand-1);
}

.ic-buton:disabled {
  opacity: 0.4;
  cursor: not-allowed;
}

.ic-buton--play {
  min-width: 108px;
  font-weight: 600;
  border-color: var(--vp-c-brand-1);
  color: var(--vp-c-brand-1);
}

.ic-select {
  padding: 5px 8px;
}

.ic__contor {
  margin-left: 6px;
  font-size: 0.85rem;
  color: var(--vp-c-text-3);
}

@media (max-width: 640px) {
  .ic {
    --ic-celula: 34px;
    --ic-carte-l: 36px;
    --ic-carte-h: 50px;
    padding: 14px;
  }

  .ic__eticheta {
    width: 44px;
    font-size: 0.82rem;
  }

  .ic-carte__semn {
    font-size: 1.15rem;
  }
}
</style>
