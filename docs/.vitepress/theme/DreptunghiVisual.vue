<script setup lang="ts">
import { computed, ref, watch } from 'vue'

// Vizualizator pas cu pas pentru "cel mai mare dreptunghi din bare alaturate".
// Inaltimile se dau ca un singur string, separate prin spatii: "2 1 5 6 2 3".
const props = defineProps<{ inaltimi: string; titlu?: string }>()

interface Dreptunghi {
  stanga: number
  dreapta: number
  inaltime: number
  arie: number
}

type Faza = 'init' | 'pop' | 'push' | 'gata'

interface Cadru {
  i: number // bara curenta (n + 1 = bara fictiva)
  stiva: number[] // indicii de pe stiva, de la baza spre varf
  scos: number // bara scoasa la acest pas (0 = niciuna)
  dreptunghi: Dreptunghi | null // dreptunghiul calculat la acest pas
  dreptunghiMax: Dreptunghi | null // cel mai bun dreptunghi gasit pana acum
  arataMax: boolean // desenam si dreptunghiul maxim (doar la final)
  ariaMax: number
  mesaj: string
  faza: Faza
}

// Sirul de inaltimi, indexat de la 1, cu bara fictiva de inaltime 0 pe pozitia n + 1.
const bare = computed(() => {
  const valori = props.inaltimi
    .trim()
    .split(/\s+/)
    .map((x) => parseInt(x, 10))
    .filter((x) => !isNaN(x) && x >= 0)

  const n = valori.length
  const h: number[] = [0]
  for (let i = 0; i < n; i++) h.push(valori[i])
  h.push(0) // h[n + 1] = 0, bara fictiva

  const maxH = n > 0 ? Math.max(...valori) : 1
  return { n, h, maxH: Math.max(maxH, 1) }
})

const cadre = computed<Cadru[]>(() => {
  const { n, h } = bare.value
  const lista: Cadru[] = []
  const st: number[] = []
  let ariaMax = 0
  let dMax: Dreptunghi | null = null

  lista.push({
    i: 0,
    stiva: [],
    scos: 0,
    dreptunghi: null,
    dreptunghiMax: null,
    arataMax: false,
    ariaMax: 0,
    mesaj:
      'Stiva este goala. Pe stiva vom tine indicii barelor care inca pot creste spre dreapta, ' +
      'in ordine crescatoare a inaltimilor.',
    faza: 'init',
  })

  for (let i = 1; i <= n + 1; i++)
  {
    while (st.length > 0 && h[st[st.length - 1]] >= h[i])
    {
      const scos = st[st.length - 1]
      const inaltime = h[scos]
      st.pop()

      const stanga = st.length === 0 ? 1 : st[st.length - 1] + 1
      const dreapta = i - 1
      const latime = dreapta - stanga + 1
      const arie = inaltime * latime

      const esteNouMax = arie > ariaMax
      if (esteNouMax)
      {
        ariaMax = arie
        dMax = { stanga, dreapta, inaltime, arie }
      }

      const cauza =
        i === n + 1
          ? 'Bara fictiva este mai joasa decat orice bara reala, deci goleste stiva.'
          : `Bara ${i} nu este mai inalta decat varful stivei (bara ${scos}, inaltime ${inaltime}), ` +
            `deci dreptunghiul de inaltime ${inaltime} nu se mai poate intinde spre dreapta.`

      lista.push({
        i,
        stiva: st.slice(),
        scos,
        dreptunghi: { stanga, dreapta, inaltime, arie },
        dreptunghiMax: dMax,
        arataMax: false,
        ariaMax,
        mesaj:
          `${cauza} Scoatem bara ${scos} si ii calculam dreptunghiul: se intinde de la bara ` +
          `${stanga} pana la bara ${dreapta}, deci are latimea ${latime} si aria ` +
          `${inaltime} * ${latime} = ${arie}.` +
          (esteNouMax ? ' Este cel mai mare de pana acum.' : ` Aria maxima ramane ${ariaMax}.`),
        faza: 'pop',
      })
    }

    st.push(i)

    if (i <= n)
    {
      lista.push({
        i,
        stiva: st.slice(),
        scos: 0,
        dreptunghi: null,
        dreptunghiMax: dMax,
        arataMax: false,
        ariaMax,
        mesaj:
          `Bara ${i}, de inaltime ${h[i]}, intra pe stiva. Inaltimile de pe stiva raman ` +
          `crescatoare de la baza spre varf.`,
        faza: 'push',
      })
    }
  }

  lista.push({
    i: n + 1,
    stiva: [],
    scos: 0,
    dreptunghi: null,
    dreptunghiMax: dMax,
    arataMax: true,
    ariaMax,
    mesaj:
      dMax === null
        ? 'Nu avem bare, deci aria maxima este 0.'
        : `Am terminat. Cel mai mare dreptunghi are inaltimea ${dMax.inaltime}, se intinde de la ` +
          `bara ${dMax.stanga} pana la bara ${dMax.dreapta} si are aria ${dMax.arie}.`,
    faza: 'gata',
  })

  return lista
})

const pas = ref(0)

watch(cadre, () => {
  pas.value = 0
})

const cadru = computed(() => cadre.value[Math.min(pas.value, cadre.value.length - 1)])
const ultimulPas = computed(() => cadre.value.length - 1)

function inainte() {
  if (pas.value < ultimulPas.value) pas.value++
}

function inapoi() {
  if (pas.value > 0) pas.value--
}

function reset() {
  pas.value = 0
}

interface Bara {
  idx: number
  inaltime: number
  fictiva: boolean
  peStiva: boolean
  curenta: boolean
  scoasa: boolean
}

const bareAfisate = computed<Bara[]>(() => {
  const { n, h } = bare.value
  const c = cadru.value
  const rezultat: Bara[] = []

  for (let j = 1; j <= n + 1; j++)
  {
    rezultat.push({
      idx: j,
      inaltime: h[j],
      fictiva: j === n + 1,
      peStiva: c.stiva.indexOf(j) !== -1,
      curenta: c.faza !== 'gata' && j === c.i && c.scos === 0,
      scoasa: j === c.scos,
    })
  }
  return rezultat
})

// Latimea unei coloane = latimea barei + spatiul dintre bare.
function stilDreptunghi(d: Dreptunghi) {
  const latime = d.dreapta - d.stanga + 1
  return {
    left: `calc((var(--drept-bara) + var(--drept-gol)) * ${d.stanga - 1})`,
    width: `calc((var(--drept-bara) + var(--drept-gol)) * ${latime} - var(--drept-gol))`,
    height: `calc(var(--drept-unitate) * ${d.inaltime})`,
  }
}

function stilBara(inaltime: number) {
  return { height: `calc(var(--drept-unitate) * ${inaltime})` }
}

const inaltimeScena = computed(() => `calc(var(--drept-unitate) * ${bare.value.maxH})`)
</script>

<template>
  <div class="drept">
    <div v-if="titlu" class="drept__titlu">{{ titlu }}</div>

    <div class="drept__panza">
      <div class="drept__scena" :style="{ height: inaltimeScena }">
        <div
          v-if="cadru.arataMax && cadru.dreptunghiMax"
          class="drept__zona drept__zona--max"
          :style="stilDreptunghi(cadru.dreptunghiMax)"
        >
          <span class="drept__eticheta-zona">aria {{ cadru.dreptunghiMax.arie }}</span>
        </div>

        <div
          v-if="cadru.dreptunghi"
          class="drept__zona"
          :style="stilDreptunghi(cadru.dreptunghi)"
        >
          <span class="drept__eticheta-zona">
            {{ cadru.dreptunghi.inaltime }} x
            {{ cadru.dreptunghi.dreapta - cadru.dreptunghi.stanga + 1 }} =
            {{ cadru.dreptunghi.arie }}
          </span>
        </div>

        <div class="drept__bare">
          <div v-for="b in bareAfisate" :key="b.idx" class="drept-coloana">
            <div
              class="drept-bara"
              :class="{
                'drept-bara--fictiva': b.fictiva,
                'drept-bara--stiva': b.peStiva,
                'drept-bara--curenta': b.curenta,
                'drept-bara--scoasa': b.scoasa,
              }"
              :style="stilBara(b.inaltime)"
            >
              <span v-if="!b.fictiva" class="drept-bara__valoare">{{ b.inaltime }}</span>
            </div>
          </div>
        </div>
      </div>

      <div class="drept__indici">
        <div v-for="b in bareAfisate" :key="b.idx" class="drept-index">
          <span :class="{ 'drept-index--fictiv': b.fictiva }">{{ b.idx }}</span>
        </div>
      </div>
    </div>

    <div class="drept__stiva">
      <span class="drept__eticheta">Stiva (baza &rarr; varf):</span>
      <div class="drept__chipuri">
        <span v-for="(j, idx) in cadru.stiva" :key="idx" class="drept-chip">
          bara {{ j }} (h = {{ bare.h[j] }})
        </span>
        <span v-if="cadru.stiva.length === 0" class="drept-chip drept-chip--goala">
          stiva este vida
        </span>
      </div>
    </div>

    <div class="drept__stiva">
      <span class="drept__eticheta">Aria maxima:</span>
      <span class="drept__aria">{{ cadru.ariaMax }}</span>
    </div>

    <p class="drept__mesaj">{{ cadru.mesaj }}</p>

    <div class="drept__controale">
      <button class="drept-buton" :disabled="pas === 0" @click="reset">Reset</button>
      <button class="drept-buton" :disabled="pas === 0" @click="inapoi">&lt; Inapoi</button>
      <button class="drept-buton" :disabled="pas === ultimulPas" @click="inainte">
        Inainte &gt;
      </button>
      <span class="drept__contor">Pasul {{ pas }} din {{ ultimulPas }}</span>
    </div>
  </div>
</template>

<style scoped>
.drept {
  --drept-bara: 46px;
  --drept-gol: 6px;
  --drept-unitate: 26px;
  border: 1px solid var(--vp-c-divider);
  border-radius: 12px;
  background-color: var(--vp-c-bg-soft);
  padding: 18px;
  margin: 24px 0;
}

.drept__titlu {
  font-weight: 600;
  font-size: 0.95rem;
  margin-bottom: 14px;
  color: var(--vp-c-text-1);
}

.drept__panza {
  overflow-x: auto;
  /* loc pentru eticheta desenata deasupra dreptunghiului cel mai inalt */
  padding-top: 26px;
  padding-bottom: 4px;
}

.drept__scena {
  position: relative;
  min-width: min-content;
}

.drept__bare {
  position: absolute;
  left: 0;
  bottom: 0;
  display: flex;
  align-items: flex-end;
  gap: var(--drept-gol);
}

.drept-coloana {
  width: var(--drept-bara);
  display: flex;
  align-items: flex-end;
  justify-content: center;
}

/* Culori fixe (nu din tema): barele arata la fel in tema light si in tema dark */
.drept-bara {
  width: var(--drept-bara);
  min-height: 3px;
  border-radius: 5px 5px 0 0;
  background-color: hsl(215, 20%, 72%);
  border: 2px solid transparent;
  position: relative;
  transition: background-color 0.18s;
}

.drept-bara--stiva {
  background-color: hsl(205, 62%, 68%);
}

.drept-bara--curenta {
  border-color: var(--vp-c-brand-1);
  background-color: hsl(40, 85%, 68%);
}

.drept-bara--scoasa {
  border-color: var(--vp-c-danger-1);
  background-color: hsl(0, 62%, 72%);
}

.drept-bara--fictiva {
  background-color: transparent;
  border: 2px dashed var(--vp-c-text-3);
  border-bottom: none;
  height: 10px !important;
  border-radius: 0;
}

.drept-bara__valoare {
  position: absolute;
  top: 3px;
  left: 0;
  right: 0;
  text-align: center;
  font-family: var(--vp-font-family-mono);
  font-size: 0.82rem;
  font-weight: 600;
  color: #1b1b1f;
}

.drept__zona {
  position: absolute;
  bottom: 0;
  background-color: rgba(220, 60, 60, 0.22);
  border: 2px solid var(--vp-c-danger-1);
  border-radius: 4px;
  pointer-events: none;
  z-index: 2;
}

.drept__zona--max {
  background-color: rgba(60, 160, 90, 0.2);
  border: 2px dashed var(--vp-c-success-1);
}

.drept__eticheta-zona {
  position: absolute;
  top: -22px;
  left: 0;
  white-space: nowrap;
  font-family: var(--vp-font-family-mono);
  font-size: 0.76rem;
  font-weight: 700;
  color: var(--vp-c-text-1);
}

.drept__indici {
  display: flex;
  gap: var(--drept-gol);
  margin-top: 6px;
  min-width: min-content;
}

.drept-index {
  width: var(--drept-bara);
  text-align: center;
  font-family: var(--vp-font-family-mono);
  font-size: 0.8rem;
  color: var(--vp-c-text-2);
}

.drept-index--fictiv {
  opacity: 0.5;
  font-style: italic;
}

.drept__stiva {
  display: flex;
  align-items: baseline;
  gap: 10px;
  margin-top: 14px;
}

.drept__eticheta {
  font-size: 0.85rem;
  font-weight: 600;
  color: var(--vp-c-text-2);
  flex-shrink: 0;
}

.drept__aria {
  font-family: var(--vp-font-family-mono);
  font-size: 0.9rem;
  font-weight: 700;
  color: var(--vp-c-brand-1);
}

.drept__chipuri {
  display: flex;
  flex-wrap: nowrap;
  gap: 5px;
  overflow-x: auto;
  padding-bottom: 4px;
}

.drept-chip {
  flex-shrink: 0;
  font-family: var(--vp-font-family-mono);
  font-size: 0.78rem;
  padding: 2px 7px;
  border-radius: 5px;
  background-color: var(--vp-c-default-soft);
  color: var(--vp-c-text-1);
  border: 1px solid transparent;
}

.drept-chip--goala {
  font-style: italic;
  opacity: 0.7;
}

.drept__mesaj {
  margin: 14px 0 0;
  min-height: 3.4em;
  font-size: 0.92rem;
  line-height: 1.55;
  color: var(--vp-c-text-2);
}

.drept__controale {
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: 8px;
  margin-top: 10px;
}

.drept-buton {
  border: 1px solid var(--vp-c-divider);
  border-radius: 7px;
  background-color: var(--vp-c-bg);
  color: var(--vp-c-text-1);
  font-size: 0.88rem;
  padding: 5px 13px;
  cursor: pointer;
  transition: border-color 0.2s, color 0.2s;
}

.drept-buton:hover:not(:disabled) {
  border-color: var(--vp-c-brand-1);
  color: var(--vp-c-brand-1);
}

.drept-buton:disabled {
  opacity: 0.4;
  cursor: not-allowed;
}

.drept__contor {
  margin-left: 6px;
  font-size: 0.85rem;
  color: var(--vp-c-text-3);
}

@media (max-width: 640px) {
  .drept {
    --drept-bara: 34px;
    --drept-unitate: 20px;
    padding: 14px;
  }
}
</style>
