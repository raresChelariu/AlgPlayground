<script setup lang="ts">
import { computed, ref, watch } from 'vue'

// Vizualizator pas cu pas pentru algoritmul lui Lee.
// Harta se da ca un singur string, cu liniile separate prin "|":
//   "S....|.###.|...#.|....B"
// Caractere: "." celula libera, "#" zid, "S" soricelul, "B" branza.
const props = defineProps<{ harta: string; titlu?: string }>()

interface Pozitie {
  lin: number
  col: number
}

type Faza = 'init' | 'pop' | 'gata' | 'drum' | 'mers'

interface Cadru {
  d: number[][] // distantele marcate pana la acest pas (0 = nemarcata)
  coada: Pozitie[] // toate pozitiile intrate vreodata in coada
  primul: number // indicele primului element nescos inca (1-based)
  curent: Pozitie | null // celula scoasa din coada la acest pas
  vecini: Pozitie[] // vecinii marcati la acest pas
  drum: Pozitie[] // celulele drumului minim descoperite pana acum
  soricel: Pozitie // unde este desenat soricelul
  mesaj: string
  faza: Faza
}

const dLin = [0, -1, 1, 0, 0]
const dCol = [0, 0, 0, -1, 1]

// Harta descompusa in matricea de ziduri + pozitiile soricelului si branzei.
const labirint = computed(() => {
  const linii = props.harta.split('|').map((r) => r.trim()).filter((r) => r.length > 0)
  const n = linii.length
  const m = n > 0 ? Math.max(...linii.map((r) => r.length)) : 0

  // a[1..n][1..m]: 0 = liber, 1 = zid
  const a: number[][] = matriceNoua(n, m)
  let start: Pozitie = { lin: 1, col: 1 }
  let branza: Pozitie = { lin: 1, col: 1 }

  for (let i = 1; i <= n; i++)
  {
    for (let j = 1; j <= m; j++)
    {
      const ch = linii[i - 1][j - 1] ?? '.'
      if (ch === '#') a[i][j] = 1
      if (ch === 'S') start = { lin: i, col: j }
      if (ch === 'B') branza = { lin: i, col: j }
    }
  }

  return { n, m, a, start, branza }
})

function matriceNoua(n: number, m: number): number[][] {
  const mat: number[][] = []
  for (let i = 0; i <= n + 1; i++) mat.push(new Array(m + 2).fill(0))
  return mat
}

function copiaza(mat: number[][]): number[][] {
  return mat.map((linie) => linie.slice())
}

function scrie(p: Pozitie): string {
  return `(${p.lin}, ${p.col})`
}

// Insiruire in romana: "(1, 2)", "(1, 2) si (3, 4)", "(1, 2), (3, 4) si (5, 6)"
function insiruie(lista: string[]): string {
  if (lista.length === 0) return ''
  if (lista.length === 1) return lista[0]
  return lista.slice(0, -1).join(', ') + ' si ' + lista[lista.length - 1]
}

// Simularea completa: toate cadrele sunt calculate o singura data, deci
// butonul "Inapoi" inseamna doar pasCurent--.
const cadre = computed<Cadru[]>(() => {
  const { n, m, a, start, branza } = labirint.value
  const lista: Cadru[] = []

  const d = matriceNoua(n, m)
  const coada: Pozitie[] = [start]
  d[start.lin][start.col] = 1

  lista.push({
    d: copiaza(d),
    coada: coada.slice(),
    primul: 1,
    curent: null,
    vecini: [],
    drum: [],
    soricel: start,
    mesaj:
      `Pornim de la soricel, ${scrie(start)}. Il marcam cu 1 (nu cu 0, pentru ca 0 inseamna ` +
      `"celula nemarcata") si il punem in coada.`,
    faza: 'init',
  })

  // Parcurgerea in latime: un cadru pentru fiecare element scos din coada.
  let primul = 0
  while (primul < coada.length)
  {
    const curent = coada[primul]
    primul++

    const noi: Pozitie[] = []
    const zid: string[] = []
    const marcate: string[] = []

    for (let k = 1; k <= 4; k++)
    {
      const il = curent.lin + dLin[k]
      const ic = curent.col + dCol[k]
      if (il < 1 || il > n || ic < 1 || ic > m) continue

      if (a[il][ic] === 1)
      {
        zid.push(scrie({ lin: il, col: ic }))
      }
      else if (d[il][ic] !== 0)
      {
        marcate.push(scrie({ lin: il, col: ic }))
      }
      else
      {
        d[il][ic] = d[curent.lin][curent.col] + 1
        coada.push({ lin: il, col: ic })
        noi.push({ lin: il, col: ic })
      }
    }

    let mesaj = `Scoatem ${scrie(curent)} din coada. `
    if (noi.length > 0)
    {
      mesaj +=
        `Vecinii ${insiruie(noi.map(scrie))} sunt liberi si nemarcati: primesc ` +
        `${d[curent.lin][curent.col] + 1} si intra la sfarsitul cozii. `
    }
    else
    {
      mesaj += 'Niciun vecin nou de marcat. '
    }
    if (zid.length > 0) mesaj += `${insiruie(zid)} ${zid.length === 1 ? 'este zid' : 'sunt ziduri'}. `
    if (marcate.length > 0)
      mesaj += `${insiruie(marcate)} ${marcate.length === 1 ? 'este deja marcat' : 'sunt deja marcate'}.`

    lista.push({
      d: copiaza(d),
      coada: coada.slice(),
      primul: primul + 1,
      curent,
      vecini: noi,
      drum: [],
      soricel: start,
      mesaj: mesaj.trim(),
      faza: 'pop',
    })
  }

  const distanta = d[branza.lin][branza.col]

  if (distanta === 0)
  {
    lista.push({
      d: copiaza(d),
      coada: coada.slice(),
      primul: coada.length + 1,
      curent: null,
      vecini: [],
      drum: [],
      soricel: start,
      mesaj:
        `Coada s-a golit, dar branza ${scrie(branza)} a ramas nemarcata: d = 0. ` +
        `Zidurile o inchid complet, deci nu exista drum. Programul afiseaza -1.`,
      faza: 'gata',
    })
    return lista
  }

  lista.push({
    d: copiaza(d),
    coada: coada.slice(),
    primul: coada.length + 1,
    curent: null,
    vecini: [],
    drum: [],
    soricel: start,
    mesaj:
      `Coada s-a golit, unda a acoperit tot ce se putea atinge. Branza ${scrie(branza)} are ` +
      `d = ${distanta}, deci drumul minim are ${distanta - 1} pasi. Urmeaza reconstituirea drumului.`,
    faza: 'gata',
  })

  // Reconstituirea drumului: de la branza inapoi, spre un vecin cu d mai mic cu 1.
  const drum: Pozitie[] = []
  let i = branza.lin
  let j = branza.col
  drum.push({ lin: i, col: j })

  while (d[i][j] > 1)
  {
    let urmLin = i
    let urmCol = j
    for (let k = 1; k <= 4; k++)
    {
      const il = i + dLin[k]
      const ic = j + dCol[k]
      if (il < 1 || il > n || ic < 1 || ic > m) continue
      if (d[il][ic] === d[i][j] - 1)
      {
        urmLin = il
        urmCol = ic
      }
    }

    lista.push({
      d: copiaza(d),
      coada: coada.slice(),
      primul: coada.length + 1,
      curent: { lin: i, col: j },
      vecini: [],
      drum: drum.slice(),
      soricel: start,
      mesaj:
        `Reconstituim drumul: suntem in ${scrie({ lin: i, col: j })}, cu d = ${d[i][j]}. ` +
        `Ne intoarcem catre vecinul ${scrie({ lin: urmLin, col: urmCol })}, care are ` +
        `d = ${d[i][j] - 1}.`,
      faza: 'drum',
    })

    i = urmLin
    j = urmCol
    drum.push({ lin: i, col: j })
  }

  // Drumul a fost construit de la branza spre soricel; il intoarcem ca sa mearga
  // soricelul pe el in ordinea fireasca.
  const drumOrdonat = drum.slice().reverse()

  for (let idx = 0; idx < drumOrdonat.length; idx++)
  {
    const aici = drumOrdonat[idx]
    let mesaj: string

    if (idx === 0)
    {
      mesaj =
        `Drumul minim este complet: ${distanta} celule, adica ${distanta - 1} pasi. ` +
        `Soricelul porneste din ${scrie(aici)}.`
    }
    else if (idx === drumOrdonat.length - 1)
    {
      mesaj = `Pasul ${idx} din ${distanta - 1}: soricelul a ajuns la branza, in ${scrie(aici)}!`
    }
    else
    {
      mesaj = `Pasul ${idx} din ${distanta - 1}: soricelul ajunge in ${scrie(aici)}.`
    }

    lista.push({
      d: copiaza(d),
      coada: coada.slice(),
      primul: coada.length + 1,
      curent: null,
      vecini: [],
      drum: drumOrdonat,
      soricel: aici,
      mesaj,
      faza: 'mers',
    })
  }

  return lista
})

const pas = ref(0)

// Daca harta se schimba (alta instanta reutilizata), o luam de la capat.
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

// Cheie de cautare rapida pentru celulele "speciale" ale cadrului curent.
function areCelula(lista: Pozitie[], i: number, j: number): boolean {
  return lista.some((p) => p.lin === i && p.col === j)
}

const inCoada = computed(() => {
  const c = cadru.value
  return c.coada.slice(c.primul - 1)
})

const scoase = computed(() => {
  const c = cadru.value
  return c.coada.slice(0, c.primul - 1)
})

interface Celula {
  lin: number
  col: number
  zid: boolean
  d: number
  esteCurenta: boolean
  esteVecinNou: boolean
  esteInCoada: boolean
  estePeDrum: boolean
  areSoricel: boolean
  areBranza: boolean
}

const celule = computed<Celula[]>(() => {
  const { n, m, a, branza } = labirint.value
  const c = cadru.value
  const rezultat: Celula[] = []

  for (let i = 1; i <= n; i++)
  {
    for (let j = 1; j <= m; j++)
    {
      rezultat.push({
        lin: i,
        col: j,
        zid: a[i][j] === 1,
        d: c.d[i][j],
        esteCurenta: c.curent !== null && c.curent.lin === i && c.curent.col === j,
        esteVecinNou: areCelula(c.vecini, i, j),
        esteInCoada: areCelula(inCoada.value, i, j),
        estePeDrum: areCelula(c.drum, i, j),
        areSoricel: c.soricel.lin === i && c.soricel.col === j,
        areBranza: branza.lin === i && branza.col === j,
      })
    }
  }
  return rezultat
})

// Fiecare inel al undei (aceeasi distanta) primeste propria nuanta, ca sa se
// vada dintr-o privire cum inainteaza unda. Lightness fix => text inchis lizibil
// si in tema light, si in tema dark.
function culoareUnda(d: number): string {
  if (d === 0) return ''
  const hue = (200 + (d - 1) * 26) % 360
  return `hsl(${hue}, 62%, 74%)`
}
</script>

<template>
  <div class="lee">
    <div v-if="titlu" class="lee__titlu">{{ titlu }}</div>

    <div
      class="lee__grila"
      :style="{ gridTemplateColumns: `repeat(${labirint.m}, var(--lee-celula))` }"
    >
      <div
        v-for="celula in celule"
        :key="`${celula.lin}-${celula.col}`"
        class="lee-celula"
        :class="{
          'lee-celula--zid': celula.zid,
          'lee-celula--curenta': celula.esteCurenta,
          'lee-celula--noua': celula.esteVecinNou,
          'lee-celula--coada': celula.esteInCoada,
          'lee-celula--drum': celula.estePeDrum,
        }"
        :style="{ backgroundColor: celula.zid ? undefined : culoareUnda(celula.d) }"
      >
        <span v-if="celula.d > 0 && !celula.zid" class="lee-celula__d">{{ celula.d }}</span>
        <span v-if="celula.areBranza" class="lee-celula__emoji">🧀</span>
        <span v-if="celula.areSoricel" class="lee-celula__emoji">🐭</span>
      </div>
    </div>

    <div class="lee__coada">
      <span class="lee__eticheta">Coada:</span>
      <div class="lee__chipuri">
        <span v-for="(p, idx) in scoase" :key="`s-${idx}`" class="lee-chip lee-chip--scos">
          ({{ p.lin }}, {{ p.col }})
        </span>
        <span
          v-for="(p, idx) in inCoada"
          :key="`c-${idx}`"
          class="lee-chip"
          :class="{ 'lee-chip--primul': idx === 0 }"
        >
          ({{ p.lin }}, {{ p.col }})
        </span>
        <span v-if="inCoada.length === 0" class="lee-chip lee-chip--goala">coada este vida</span>
      </div>
    </div>

    <p class="lee__mesaj">{{ cadru.mesaj }}</p>

    <div class="lee__controale">
      <button class="lee-buton" :disabled="pas === 0" @click="reset">Reset</button>
      <button class="lee-buton" :disabled="pas === 0" @click="inapoi">&lt; Inapoi</button>
      <button class="lee-buton" :disabled="pas === ultimulPas" @click="inainte">Inainte &gt;</button>
      <span class="lee__contor">Pasul {{ pas }} din {{ ultimulPas }}</span>
    </div>
  </div>
</template>

<style scoped>
.lee {
  --lee-celula: 46px;
  border: 1px solid var(--vp-c-divider);
  border-radius: 12px;
  background-color: var(--vp-c-bg-soft);
  padding: 18px;
  margin: 24px 0;
}

.lee__titlu {
  font-weight: 600;
  font-size: 0.95rem;
  margin-bottom: 14px;
  color: var(--vp-c-text-1);
}

.lee__grila {
  display: grid;
  gap: 3px;
  justify-content: start;
  overflow-x: auto;
  padding-bottom: 4px;
}

.lee-celula {
  position: relative;
  width: var(--lee-celula);
  height: var(--lee-celula);
  border-radius: 6px;
  border: 2px solid transparent;
  background-color: var(--vp-c-bg);
  box-shadow: inset 0 0 0 1px var(--vp-c-divider);
  display: flex;
  align-items: center;
  justify-content: center;
  transition: background-color 0.18s;
}

/* Culoare fixa (nu din tema): celulele undei au si ele culori fixe, deci zidul
   arata la fel de "solid" si in tema light, si in tema dark */
.lee-celula--zid {
  background-color: #3c3c43;
  box-shadow: inset 0 0 0 1px #55555f;
}

/* Celula scoasa din coada la acest pas */
.lee-celula--curenta {
  border-color: var(--vp-c-danger-1);
}

/* Vecinii marcati chiar acum */
.lee-celula--noua {
  border-color: var(--vp-c-success-1);
}

/* Celule care asteapta in coada */
.lee-celula--coada {
  border-style: dashed;
  border-color: var(--vp-c-warning-1);
}

/* Celulele drumului minim reconstituit */
.lee-celula--drum {
  border-style: solid;
  border-color: var(--vp-c-brand-1);
  box-shadow: 0 0 0 2px var(--vp-c-brand-soft);
}

.lee-celula__d {
  font-size: 0.85rem;
  font-weight: 600;
  font-family: var(--vp-font-family-mono);
  /* Fundalul inelelor are lightness fix, deci textul inchis merge in ambele teme */
  color: #1b1b1f;
}

.lee-celula__emoji {
  position: absolute;
  font-size: 1.35rem;
  line-height: 1;
  pointer-events: none;
}

/* Cand soricelul si branza sunt in aceeasi celula, soricelul sta putin peste */
.lee-celula__emoji + .lee-celula__emoji {
  transform: translate(4px, 4px);
}

.lee__coada {
  display: flex;
  align-items: baseline;
  gap: 10px;
  margin-top: 16px;
}

.lee__eticheta {
  font-size: 0.85rem;
  font-weight: 600;
  color: var(--vp-c-text-2);
  flex-shrink: 0;
}

.lee__chipuri {
  display: flex;
  flex-wrap: nowrap;
  gap: 5px;
  overflow-x: auto;
  padding-bottom: 4px;
}

.lee-chip {
  flex-shrink: 0;
  font-family: var(--vp-font-family-mono);
  font-size: 0.78rem;
  padding: 2px 7px;
  border-radius: 5px;
  background-color: var(--vp-c-default-soft);
  color: var(--vp-c-text-1);
  border: 1px solid transparent;
}

.lee-chip--scos {
  opacity: 0.35;
  text-decoration: line-through;
}

.lee-chip--primul {
  border-color: var(--vp-c-brand-1);
  font-weight: 700;
}

.lee-chip--goala {
  font-style: italic;
  opacity: 0.7;
}

.lee__mesaj {
  margin: 14px 0 0;
  min-height: 3.4em;
  font-size: 0.92rem;
  line-height: 1.55;
  color: var(--vp-c-text-2);
}

.lee__controale {
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: 8px;
  margin-top: 10px;
}

.lee-buton {
  border: 1px solid var(--vp-c-divider);
  border-radius: 7px;
  background-color: var(--vp-c-bg);
  color: var(--vp-c-text-1);
  font-size: 0.88rem;
  padding: 5px 13px;
  cursor: pointer;
  transition: border-color 0.2s, color 0.2s;
}

.lee-buton:hover:not(:disabled) {
  border-color: var(--vp-c-brand-1);
  color: var(--vp-c-brand-1);
}

.lee-buton:disabled {
  opacity: 0.4;
  cursor: not-allowed;
}

.lee__contor {
  margin-left: 6px;
  font-size: 0.85rem;
  color: var(--vp-c-text-3);
}

@media (max-width: 640px) {
  .lee {
    --lee-celula: 36px;
    padding: 14px;
  }

  .lee-celula__emoji {
    font-size: 1.1rem;
  }
}
</style>
