<script setup lang="ts">
import { computed, ref, watch } from 'vue'

// Vizualizator pas cu pas pentru interclasarea a doi vectori ordonati crescator
// si pentru operatiile pe multimi care folosesc acelasi mecanism de doi indici.
// Vectorii se dau ca string-uri cu valori separate prin spatii: a="1 4 7 9".
//
// Prop-ul `operatie` alege ce se intampla la fiecare comparatie:
//   interclasare - pastreaza tot, inclusiv valorile care apar in ambii vectori
//   reuniune     - pastreaza tot, dar valoarea comuna se scrie o singura data
//   intersectie  - pastreaza doar valorile care apar in ambii vectori
//   diferenta    - pastreaza valorile din a care nu apar in b
const props = withDefaults(
  defineProps<{ a: string; b: string; operatie?: string; titlu?: string }>(),
  { operatie: 'interclasare' }
)

type Operatie = 'interclasare' | 'reuniune' | 'intersectie' | 'diferenta'
type Faza = 'init' | 'principal' | 'iesire' | 'coadaA' | 'coadaB' | 'gata'
type Zona = 'init' | 'principal' | 'ramA' | 'ramB' | 'ramEg' | 'coadaA' | 'coadaB' | 'gata'
type Actiune = '' | 'iaA' | 'iaB' | 'iaComun' | 'sarA' | 'sarB' | 'sarAmbii'
type Sursa = 'a' | 'b' | 'ambii'

interface Valoare {
  valoare: number
  sursa: Sursa
}

interface Cadru {
  i: number
  j: number
  c: Valoare[]
  faza: Faza
  zona: Zona
  semn: string // '<', '>' sau '=' — gol cand nu comparam nimic
  comparam: boolean
  actiune: Actiune
  coadaActiva: 'a' | 'b' | 'niciuna' // completat doar la iesirea din while-ul principal
  mesaj: string
}

interface LinieCod {
  text: string
  zone: Zona[]
  coada?: 'a' | 'b' // marcheaza cele doua while-uri finale, ca sa le pot stinge
}

const operatie = computed<Operatie>(() => {
  const o = props.operatie.trim().toLowerCase()
  if (o === 'reuniune' || o === 'intersectie' || o === 'diferenta') return o
  return 'interclasare'
})

// Vectorii sunt indexati de la 1, ca in lectii: pozitia 0 ramane nefolosita.
function citeste(text: string): number[] {
  const valori = text
    .trim()
    .split(/\s+/)
    .map((x) => parseInt(x, 10))
    .filter((x) => !isNaN(x))
  return [0, ...valori]
}

const a = computed(() => citeste(props.a))
const b = computed(() => citeste(props.b))
const n = computed(() => a.value.length - 1)
const m = computed(() => b.value.length - 1)

// Algoritmul are sens doar pe vectori ordonati strict crescator, asa cum e
// definitia din lectie. Daca datele nu respecta asta, spunem direct.
const eroare = computed(() => {
  if (n.value === 0 || m.value === 0) return 'Ambii vectori trebuie sa aiba cel putin un element.'
  for (let k = 1; k < n.value; k++)
    if (a.value[k] >= a.value[k + 1]) return 'Vectorul a nu este ordonat strict crescator.'
  for (let k = 1; k < m.value; k++)
    if (b.value[k] >= b.value[k + 1]) return 'Vectorul b nu este ordonat strict crescator.'
  return ''
})

// Ce face fiecare operatie la o comparatie si daca isi copiaza sau nu cozile.
const reguli: Record<Operatie, { copiazaA: boolean; copiazaB: boolean; nume: string }> = {
  interclasare: { copiazaA: true, copiazaB: true, nume: 'Interclasare' },
  reuniune: { copiazaA: true, copiazaB: true, nume: 'Reuniune' },
  intersectie: { copiazaA: false, copiazaB: false, nume: 'Intersectie' },
  diferenta: { copiazaA: true, copiazaB: false, nume: 'Diferenta a \\ b' },
}

function decide(op: Operatie, semn: string): Actiune {
  if (op === 'interclasare')
  {
    if (semn === '<') return 'iaA'
    return 'iaB' // si la egalitate: conditia a[i] < b[j] e falsa, deci merge pe else
  }
  if (op === 'reuniune')
  {
    if (semn === '<') return 'iaA'
    if (semn === '>') return 'iaB'
    return 'iaComun'
  }
  if (op === 'intersectie')
  {
    if (semn === '<') return 'sarA'
    if (semn === '>') return 'sarB'
    return 'iaComun'
  }
  if (semn === '<') return 'iaA' // diferenta
  if (semn === '>') return 'sarB'
  return 'sarAmbii'
}

function zonaPentru(semn: string, op: Operatie): Zona {
  if (op === 'interclasare') return semn === '<' ? 'ramA' : 'ramB'
  if (semn === '<') return 'ramA'
  if (semn === '>') return 'ramB'
  return 'ramEg'
}

function explica(actiune: Actiune, va: number, vb: number, semn: string): string {
  const cmp = `${va} ${semn === '=' ? '==' : semn} ${vb}`
  if (actiune === 'iaA') return `${cmp}, deci valoarea mai mica este in a: o scriu in c si avansez i.`
  if (actiune === 'iaB' && semn === '=')
    return (
      `${cmp}, deci conditia a[i] < b[j] este falsa si se executa else: scriu in c valoarea ` +
      `din b si avansez j. Valoarea egala din a va fi scrisa la pasul urmator, imediat dupa ea.`
    )
  if (actiune === 'iaB') return `${cmp}, deci valoarea mai mica este in b: o scriu in c si avansez j.`
  if (actiune === 'iaComun')
    return `${cmp}, deci valoarea apare in amandoi vectorii: o scriu o singura data si avansez si i, si j.`
  if (actiune === 'sarA')
    return `${cmp}, deci ${va} apare doar in a. Nu are ce cauta in rezultat: avansez i fara sa scriu nimic.`
  if (actiune === 'sarB')
    return `${cmp}, deci ${vb} apare doar in b. Nu are ce cauta in rezultat: avansez j fara sa scriu nimic.`
  return `${cmp}, deci ${va} apare si in b. Il elimin din rezultat: avansez si i, si j, fara sa scriu nimic.`
}

const cadre = computed<Cadru[]>(() => {
  const lista: Cadru[] = []
  if (eroare.value) return lista

  const va = a.value
  const vb = b.value
  const nn = n.value
  const mm = m.value
  const op = operatie.value
  const regula = reguli[op]

  let i = 1
  let j = 1
  const c: Valoare[] = []

  // Fiecare cadru arata starea de DINAINTEA actiunii: indicii stau exact pe cele
  // doua valori comparate, iar mesajul spune ce urmeaza sa se intample.
  const instantaneu = (faza: Faza, zona: Zona, mesaj: string, extra: Partial<Cadru> = {}): void => {
    lista.push({
      i,
      j,
      c: [...c],
      faza,
      zona,
      semn: '',
      comparam: false,
      actiune: '',
      coadaActiva: 'niciuna',
      mesaj,
      ...extra,
    })
  }

  instantaneu(
    'init',
    'init',
    'Pornim cu i = 1 si j = 1, adica de la primul element al fiecarui vector. Vectorul c este gol.'
  )

  while (i <= nn && j <= mm)
  {
    const semn = va[i] < vb[j] ? '<' : va[i] > vb[j] ? '>' : '='
    const actiune = decide(op, semn)

    instantaneu('principal', zonaPentru(semn, op), explica(actiune, va[i], vb[j], semn), {
      semn,
      comparam: true,
      actiune,
    })

    if (actiune === 'iaA')
    {
      c.push({ valoare: va[i], sursa: 'a' })
      i++
    }
    else if (actiune === 'iaB')
    {
      c.push({ valoare: vb[j], sursa: 'b' })
      j++
    }
    else if (actiune === 'iaComun')
    {
      c.push({ valoare: va[i], sursa: 'ambii' })
      i++
      j++
    }
    else if (actiune === 'sarA') i++
    else if (actiune === 'sarB') j++
    else
    {
      i++
      j++
    }
  }

  // Cadrul-cheie: aici se vede ca exact unul dintre cei doi indici a depasit capatul,
  // iar celalalt este inca inauntru, cu cel putin un element neconsumat.
  const aGata = i > nn
  const ramaseA = nn - i + 1
  const ramaseB = mm - j + 1
  const coadaActiva: 'a' | 'b' | 'niciuna' = aGata
    ? regula.copiazaB
      ? 'b'
      : 'niciuna'
    : regula.copiazaA
      ? 'a'
      : 'niciuna'

  let mesajIesire: string
  if (aGata)
    mesajIesire =
      `i = ${i} > n = ${nn}, deci vectorul a s-a terminat si while-ul principal se opreste. ` +
      `In acelasi timp j = ${j} <= m = ${mm}: in b au mai ramas ${ramaseB} ` +
      `element${ramaseB === 1 ? '' : 'e'}. `
  else
    mesajIesire =
      `j = ${j} > m = ${mm}, deci vectorul b s-a terminat si while-ul principal se opreste. ` +
      `In acelasi timp i = ${i} <= n = ${nn}: in a au mai ramas ${ramaseA} ` +
      `element${ramaseA === 1 ? '' : 'e'}. `

  if (coadaActiva === 'b')
    mesajIesire +=
      'Porneste while (j <= m). Celalalt while, while (i <= n), are conditia falsa inca de la ' +
      'prima verificare, deci nu face niciun pas.'
  else if (coadaActiva === 'a')
    mesajIesire +=
      'Porneste while (i <= n). Celalalt while, while (j <= m), are conditia falsa inca de la ' +
      'prima verificare, deci nu face niciun pas.'
  else
    mesajIesire +=
      'Ce a ramas nu mai poate ajunge in rezultat, pentru ca nu mai are cu ce sa fie comparat: ' +
      'aceasta operatie nu are cozi de copiat.'

  instantaneu('iesire', 'principal', mesajIesire, { coadaActiva })

  while (regula.copiazaA && i <= nn)
  {
    instantaneu(
      'coadaA',
      'coadaA',
      `Copiez a[${i}] = ${va[i]} in c. In b nu mai exista nimic, deci nu mai am ce compara: ` +
        'tot ce a ramas in a este oricum mai mare decat orice am scris pana acum.'
    )
    c.push({ valoare: va[i], sursa: 'a' })
    i++
  }

  while (regula.copiazaB && j <= mm)
  {
    instantaneu(
      'coadaB',
      'coadaB',
      `Copiez b[${j}] = ${vb[j]} in c. In a nu mai exista nimic, deci nu mai am ce compara: ` +
        'tot ce a ramas in b este oricum mai mare decat orice am scris pana acum.'
    )
    c.push({ valoare: vb[j], sursa: 'b' })
    j++
  }

  const rezultat = c.map((x) => x.valoare).join(' ')
  instantaneu(
    'gata',
    'gata',
    c.length === 0
      ? 'Am terminat. Rezultatul este vid: nicio valoare nu respecta conditia.'
      : `Am terminat. c are ${c.length} element${c.length === 1 ? '' : 'e'}: ${rezultat}.`
  )

  return lista
})

const cadruGol: Cadru = {
  i: 1,
  j: 1,
  c: [],
  faza: 'init',
  zona: 'init',
  semn: '',
  comparam: false,
  actiune: '',
  coadaActiva: 'niciuna',
  mesaj: '',
}

const pas = ref(0)

watch(cadre, () => {
  pas.value = 0
})

const cadru = computed<Cadru>(
  () => cadre.value[Math.min(pas.value, cadre.value.length - 1)] ?? cadruGol
)
const ultimulPas = computed(() => Math.max(cadre.value.length - 1, 0))

function inainte() {
  if (pas.value < ultimulPas.value) pas.value++
}

function inapoi() {
  if (pas.value > 0) pas.value--
}

function reset() {
  pas.value = 0
}

interface Celula {
  idx: number
  valoare: number
  consumat: boolean
  curent: boolean
  seIa: boolean
  seArunca: boolean
}

function celule(vector: number[], lungime: number, indice: number, care: 'a' | 'b'): Celula[] {
  const c = cadru.value
  const lista: Celula[] = []
  const compara = c.faza === 'principal'
  const seIa =
    care === 'a'
      ? c.actiune === 'iaA' || c.actiune === 'iaComun'
      : c.actiune === 'iaB' || c.actiune === 'iaComun'
  const seArunca =
    care === 'a'
      ? c.actiune === 'sarA' || c.actiune === 'sarAmbii'
      : c.actiune === 'sarB' || c.actiune === 'sarAmbii'
  const inCoada = (care === 'a' && c.faza === 'coadaA') || (care === 'b' && c.faza === 'coadaB')

  for (let k = 1; k <= lungime; k++)
  {
    const curent = k === indice && c.faza !== 'gata'
    lista.push({
      idx: k,
      valoare: vector[k],
      consumat: k < indice,
      curent,
      seIa: curent && ((compara && seIa) || inCoada),
      seArunca: curent && compara && seArunca,
    })
  }
  return lista
}

const celuleA = computed(() => celule(a.value, n.value, cadru.value.i, 'a'))
const celuleB = computed(() => celule(b.value, m.value, cadru.value.j, 'b'))

const etichetaFaza = computed(() => {
  switch (cadru.value.faza)
  {
    case 'init':
      return 'pornire'
    case 'principal':
      return 'while (i <= n && j <= m)'
    case 'iesire':
      return 'while-ul principal s-a oprit'
    case 'coadaA':
      return 'coada lui a — while (i <= n)'
    case 'coadaB':
      return 'coada lui b — while (j <= m)'
    default:
      return 'gata'
  }
})

// Codul afisat langa vectori este exact cel din lectie, ca sa se vada pe ce linie
// se afla executia la fiecare pas.
const codPrincipal: Record<Operatie, LinieCod[]> = {
  interclasare: [
    { text: 'while (i <= n && j <= m)', zone: ['principal', 'ramA', 'ramB'] },
    { text: '{', zone: ['principal', 'ramA', 'ramB'] },
    { text: '    if (a[i] < b[j])', zone: ['ramA', 'ramB'] },
    { text: '    {', zone: ['ramA'] },
    { text: '        k++;', zone: ['ramA'] },
    { text: '        c[k] = a[i];', zone: ['ramA'] },
    { text: '        i++;', zone: ['ramA'] },
    { text: '    }', zone: ['ramA'] },
    { text: '    else', zone: ['ramB'] },
    { text: '    {', zone: ['ramB'] },
    { text: '        k++;', zone: ['ramB'] },
    { text: '        c[k] = b[j];', zone: ['ramB'] },
    { text: '        j++;', zone: ['ramB'] },
    { text: '    }', zone: ['ramB'] },
    { text: '}', zone: ['principal', 'ramA', 'ramB'] },
  ],
  reuniune: [
    { text: 'while (i <= n && j <= m)', zone: ['principal', 'ramA', 'ramB', 'ramEg'] },
    { text: '{', zone: ['principal', 'ramA', 'ramB', 'ramEg'] },
    { text: '    if (a[i] < b[j])', zone: ['ramA', 'ramB', 'ramEg'] },
    { text: '    {', zone: ['ramA'] },
    { text: '        k++;', zone: ['ramA'] },
    { text: '        c[k] = a[i];', zone: ['ramA'] },
    { text: '        i++;', zone: ['ramA'] },
    { text: '    }', zone: ['ramA'] },
    { text: '    else if (a[i] > b[j])', zone: ['ramB', 'ramEg'] },
    { text: '    {', zone: ['ramB'] },
    { text: '        k++;', zone: ['ramB'] },
    { text: '        c[k] = b[j];', zone: ['ramB'] },
    { text: '        j++;', zone: ['ramB'] },
    { text: '    }', zone: ['ramB'] },
    { text: '    else', zone: ['ramEg'] },
    { text: '    {', zone: ['ramEg'] },
    { text: '        k++;', zone: ['ramEg'] },
    { text: '        c[k] = a[i];', zone: ['ramEg'] },
    { text: '        i++;', zone: ['ramEg'] },
    { text: '        j++;', zone: ['ramEg'] },
    { text: '    }', zone: ['ramEg'] },
    { text: '}', zone: ['principal', 'ramA', 'ramB', 'ramEg'] },
  ],
  intersectie: [
    { text: 'while (i <= n && j <= m)', zone: ['principal', 'ramA', 'ramB', 'ramEg'] },
    { text: '{', zone: ['principal', 'ramA', 'ramB', 'ramEg'] },
    { text: '    if (a[i] < b[j])', zone: ['ramA', 'ramB', 'ramEg'] },
    { text: '        i++;', zone: ['ramA'] },
    { text: '    else if (a[i] > b[j])', zone: ['ramB', 'ramEg'] },
    { text: '        j++;', zone: ['ramB'] },
    { text: '    else', zone: ['ramEg'] },
    { text: '    {', zone: ['ramEg'] },
    { text: '        k++;', zone: ['ramEg'] },
    { text: '        c[k] = a[i];', zone: ['ramEg'] },
    { text: '        i++;', zone: ['ramEg'] },
    { text: '        j++;', zone: ['ramEg'] },
    { text: '    }', zone: ['ramEg'] },
    { text: '}', zone: ['principal', 'ramA', 'ramB', 'ramEg'] },
  ],
  diferenta: [
    { text: 'while (i <= n && j <= m)', zone: ['principal', 'ramA', 'ramB', 'ramEg'] },
    { text: '{', zone: ['principal', 'ramA', 'ramB', 'ramEg'] },
    { text: '    if (a[i] < b[j])', zone: ['ramA', 'ramB', 'ramEg'] },
    { text: '    {', zone: ['ramA'] },
    { text: '        k++;', zone: ['ramA'] },
    { text: '        c[k] = a[i];', zone: ['ramA'] },
    { text: '        i++;', zone: ['ramA'] },
    { text: '    }', zone: ['ramA'] },
    { text: '    else if (a[i] > b[j])', zone: ['ramB', 'ramEg'] },
    { text: '        j++;', zone: ['ramB'] },
    { text: '    else', zone: ['ramEg'] },
    { text: '    {', zone: ['ramEg'] },
    { text: '        i++;', zone: ['ramEg'] },
    { text: '        j++;', zone: ['ramEg'] },
    { text: '    }', zone: ['ramEg'] },
    { text: '}', zone: ['principal', 'ramA', 'ramB', 'ramEg'] },
  ],
}

const coadaLuiA: LinieCod[] = [
  { text: 'while (i <= n)', zone: ['coadaA'], coada: 'a' },
  { text: '{', zone: ['coadaA'] },
  { text: '    k++;', zone: ['coadaA'] },
  { text: '    c[k] = a[i];', zone: ['coadaA'] },
  { text: '    i++;', zone: ['coadaA'] },
  { text: '}', zone: ['coadaA'] },
]

const coadaLuiB: LinieCod[] = [
  { text: 'while (j <= m)', zone: ['coadaB'], coada: 'b' },
  { text: '{', zone: ['coadaB'] },
  { text: '    k++;', zone: ['coadaB'] },
  { text: '    c[k] = b[j];', zone: ['coadaB'] },
  { text: '    j++;', zone: ['coadaB'] },
  { text: '}', zone: ['coadaB'] },
]

const cod = computed<LinieCod[]>(() => {
  const regula = reguli[operatie.value]
  const linii: LinieCod[] = [
    { text: 'i = 1;', zone: ['init'] },
    { text: 'j = 1;', zone: ['init'] },
    { text: 'k = 0;', zone: ['init'] },
    { text: '', zone: [] },
    ...codPrincipal[operatie.value],
  ]
  if (regula.copiazaA) linii.push({ text: '', zone: [] }, ...coadaLuiA)
  if (regula.copiazaB) linii.push({ text: '', zone: [] }, ...coadaLuiB)
  return linii
})

function claseLinie(linie: LinieCod) {
  const c = cadru.value
  return {
    'ic-cod__linie--activa': linie.zone.indexOf(c.zona) !== -1,
    // La iesirea din while-ul principal aratam care dintre cele doua cozi porneste
    // si care are conditia falsa inca de la prima verificare.
    'ic-cod__linie--armata': c.faza === 'iesire' && linie.coada === c.coadaActiva,
    'ic-cod__linie--stinsa':
      c.faza === 'iesire' && linie.coada !== undefined && linie.coada !== c.coadaActiva,
  }
}

const numeOperatie = computed(() => reguli[operatie.value].nume)
</script>

<template>
  <div class="ic">
    <div v-if="titlu" class="ic__titlu">{{ titlu }}</div>

    <p v-if="eroare" class="ic__eroare">{{ eroare }}</p>

    <template v-else>
      <div class="ic__antet">
        <span class="ic__operatie">{{ numeOperatie }}</span>
        <span class="ic__faza" :class="`ic__faza--${cadru.faza}`">{{ etichetaFaza }}</span>
      </div>

      <div class="ic__corp">
        <div class="ic__scena">
          <div class="ic-rand">
            <span class="ic-rand__eticheta ic-rand__eticheta--a">a</span>
            <div class="ic-celule">
              <div v-for="el in celuleA" :key="el.idx" class="ic-slot">
                <span class="ic-slot__index">{{ el.idx }}</span>
                <div
                  class="ic-celula ic-celula--a"
                  :class="{
                    'ic-celula--consumata': el.consumat,
                    'ic-celula--curenta': el.curent,
                    'ic-celula--luata': el.seIa,
                    'ic-celula--aruncata': el.seArunca,
                  }"
                >
                  {{ el.valoare }}
                </div>
                <span class="ic-slot__cursor" :class="{ 'ic-slot__cursor--activ': el.curent }">
                  &#9650; i
                </span>
              </div>
            </div>
          </div>

          <div class="ic-comparatie">
            <template v-if="cadru.comparam">
              <span class="ic-comparatie__parte ic-comparatie__parte--a">
                a[{{ cadru.i }}] = {{ a[cadru.i] }}
              </span>
              <span class="ic-comparatie__semn">{{ cadru.semn === '=' ? '==' : cadru.semn }}</span>
              <span class="ic-comparatie__parte ic-comparatie__parte--b">
                b[{{ cadru.j }}] = {{ b[cadru.j] }}
              </span>
            </template>
            <span v-else class="ic-comparatie__gol">nu se compara nimic la acest pas</span>
          </div>

          <div class="ic-rand">
            <span class="ic-rand__eticheta ic-rand__eticheta--b">b</span>
            <div class="ic-celule">
              <div v-for="el in celuleB" :key="el.idx" class="ic-slot">
                <span class="ic-slot__index">{{ el.idx }}</span>
                <div
                  class="ic-celula ic-celula--b"
                  :class="{
                    'ic-celula--consumata': el.consumat,
                    'ic-celula--curenta': el.curent,
                    'ic-celula--luata': el.seIa,
                    'ic-celula--aruncata': el.seArunca,
                  }"
                >
                  {{ el.valoare }}
                </div>
                <span class="ic-slot__cursor" :class="{ 'ic-slot__cursor--activ': el.curent }">
                  &#9650; j
                </span>
              </div>
            </div>
          </div>

          <div class="ic__separator"></div>

          <div class="ic-rand">
            <span class="ic-rand__eticheta ic-rand__eticheta--c">c</span>
            <div class="ic-celule">
              <div v-for="(el, idx) in cadru.c" :key="idx" class="ic-slot">
                <span class="ic-slot__index">{{ idx + 1 }}</span>
                <div class="ic-celula" :class="`ic-celula--${el.sursa}`">{{ el.valoare }}</div>
                <span class="ic-slot__cursor"></span>
              </div>
              <div v-if="cadru.c.length === 0" class="ic-slot">
                <span class="ic-slot__index">&nbsp;</span>
                <div class="ic-celula ic-celula--goala">&mdash;</div>
                <span class="ic-slot__cursor"></span>
              </div>
            </div>
          </div>

          <div class="ic__legenda">
            <span><i class="ic-pastila ic-pastila--a"></i> luat din a</span>
            <span><i class="ic-pastila ic-pastila--b"></i> luat din b</span>
            <span><i class="ic-pastila ic-pastila--ambii"></i> exista in amandoi</span>
          </div>
        </div>

        <pre class="ic-cod"><code><span
          v-for="(linie, idx) in cod"
          :key="idx"
          class="ic-cod__linie"
          :class="claseLinie(linie)"
        >{{ linie.text || ' ' }}
</span></code></pre>
      </div>

      <p class="ic__mesaj">{{ cadru.mesaj }}</p>

      <div class="ic__controale">
        <button class="ic-buton" :disabled="pas === 0" @click="reset">Reset</button>
        <button class="ic-buton" :disabled="pas === 0" @click="inapoi">&lt; Inapoi</button>
        <button class="ic-buton" :disabled="pas === ultimulPas" @click="inainte">
          Inainte &gt;
        </button>
        <span class="ic__contor">Pasul {{ pas }} din {{ ultimulPas }}</span>
      </div>
    </template>
  </div>
</template>

<style scoped>
.ic {
  --ic-celula: 44px;
  --ic-gol: 6px;
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

.ic__eroare {
  margin: 0;
  color: var(--vp-c-danger-1);
  font-size: 0.9rem;
}

.ic__antet {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 10px;
  margin-bottom: 14px;
}

.ic__operatie {
  font-size: 0.82rem;
  font-weight: 700;
  color: var(--vp-c-text-2);
}

/* Culori fixe (nu din tema): arata la fel in tema light si in tema dark */
.ic__faza {
  font-family: var(--vp-font-family-mono);
  font-size: 0.76rem;
  font-weight: 700;
  padding: 3px 10px;
  border-radius: 999px;
  color: #1b1b1f;
  background-color: hsl(215, 20%, 78%);
}

.ic__faza--principal {
  background-color: hsl(205, 70%, 74%);
}

.ic__faza--iesire {
  background-color: hsl(40, 88%, 70%);
}

.ic__faza--coadaA,
.ic__faza--coadaB {
  background-color: hsl(145, 45%, 70%);
}

.ic__corp {
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
  align-items: flex-start;
}

.ic__scena {
  flex: 1 1 340px;
  min-width: 0;
}

.ic-rand {
  display: flex;
  align-items: flex-start;
  gap: 10px;
  overflow-x: auto;
  padding-bottom: 2px;
}

.ic-rand__eticheta {
  font-family: var(--vp-font-family-mono);
  font-size: 0.95rem;
  font-weight: 700;
  line-height: var(--ic-celula);
  margin-top: 14px;
  width: 14px;
  flex: none;
}

.ic-rand__eticheta--a {
  color: hsl(205, 70%, 42%);
}

.ic-rand__eticheta--b {
  color: hsl(28, 80%, 42%);
}

.ic-rand__eticheta--c {
  color: var(--vp-c-text-1);
}

.ic-celule {
  display: flex;
  gap: var(--ic-gol);
  min-width: min-content;
}

.ic-slot {
  width: var(--ic-celula);
  flex: none;
  text-align: center;
}

.ic-slot__index {
  display: block;
  font-family: var(--vp-font-family-mono);
  font-size: 0.7rem;
  color: var(--vp-c-text-3);
  line-height: 14px;
}

.ic-celula {
  height: var(--ic-celula);
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 6px;
  border: 2px solid transparent;
  font-family: var(--vp-font-family-mono);
  font-size: 0.9rem;
  font-weight: 600;
  color: #1b1b1f;
  background-color: hsl(215, 20%, 78%);
  transition:
    background-color 0.18s,
    opacity 0.18s;
}

.ic-celula--a {
  background-color: hsl(205, 62%, 74%);
}

.ic-celula--b {
  background-color: hsl(30, 82%, 76%);
}

.ic-celula--ambii {
  background-color: hsl(145, 45%, 72%);
}

.ic-celula--goala {
  background-color: transparent;
  border: 2px dashed var(--vp-c-text-3);
  color: var(--vp-c-text-3);
}

.ic-celula--consumata {
  opacity: 0.34;
  text-decoration: line-through;
}

.ic-celula--curenta {
  border-color: var(--vp-c-text-1);
}

.ic-celula--luata {
  border-color: var(--vp-c-success-1);
  box-shadow: 0 0 0 3px rgba(60, 160, 90, 0.28);
}

.ic-celula--aruncata {
  border-color: var(--vp-c-danger-1);
  border-style: dashed;
  box-shadow: 0 0 0 3px rgba(220, 60, 60, 0.2);
}

.ic-slot__cursor {
  display: block;
  height: 18px;
  line-height: 18px;
  font-family: var(--vp-font-family-mono);
  font-size: 0.76rem;
  font-weight: 700;
  color: var(--vp-c-brand-1);
  visibility: hidden;
}

.ic-slot__cursor--activ {
  visibility: visible;
}

.ic-comparatie {
  display: flex;
  align-items: center;
  gap: 10px;
  margin: 4px 0 8px 24px;
  min-height: 26px;
}

.ic-comparatie__parte {
  font-family: var(--vp-font-family-mono);
  font-size: 0.82rem;
  font-weight: 700;
  padding: 2px 8px;
  border-radius: 5px;
  color: #1b1b1f;
}

.ic-comparatie__parte--a {
  background-color: hsl(205, 62%, 78%);
}

.ic-comparatie__parte--b {
  background-color: hsl(30, 82%, 80%);
}

.ic-comparatie__semn {
  font-family: var(--vp-font-family-mono);
  font-size: 0.95rem;
  font-weight: 700;
  color: var(--vp-c-text-1);
}

.ic-comparatie__gol {
  font-size: 0.8rem;
  color: var(--vp-c-text-3);
  font-style: italic;
}

.ic__separator {
  border-top: 1px dashed var(--vp-c-divider);
  margin: 10px 0 12px;
}

.ic__legenda {
  display: flex;
  flex-wrap: wrap;
  gap: 14px;
  margin-top: 12px;
  font-size: 0.76rem;
  color: var(--vp-c-text-2);
}

.ic-pastila {
  display: inline-block;
  width: 11px;
  height: 11px;
  border-radius: 3px;
  margin-right: 4px;
  vertical-align: -1px;
}

.ic-pastila--a {
  background-color: hsl(205, 62%, 74%);
}

.ic-pastila--b {
  background-color: hsl(30, 82%, 76%);
}

.ic-pastila--ambii {
  background-color: hsl(145, 45%, 72%);
}

.ic-cod {
  flex: 0 1 300px;
  margin: 0;
  padding: 12px 0;
  border-radius: 8px;
  background-color: var(--vp-c-bg);
  border: 1px solid var(--vp-c-divider);
  overflow-x: auto;
  font-size: 0.76rem;
  line-height: 1.5;
}

.ic-cod code {
  font-family: var(--vp-font-family-mono);
  padding: 0;
  background: none;
}

.ic-cod__linie {
  display: block;
  padding: 0 12px;
  white-space: pre;
  color: var(--vp-c-text-2);
  border-left: 3px solid transparent;
}

.ic-cod__linie--activa {
  background-color: rgba(100, 160, 255, 0.16);
  border-left-color: var(--vp-c-brand-1);
  color: var(--vp-c-text-1);
  font-weight: 600;
}

.ic-cod__linie--armata {
  background-color: rgba(60, 160, 90, 0.18);
  border-left-color: var(--vp-c-success-1);
  color: var(--vp-c-text-1);
  font-weight: 600;
}

.ic-cod__linie--stinsa {
  opacity: 0.4;
  text-decoration: line-through;
}

.ic__mesaj {
  margin: 14px 0 0;
  font-size: 0.88rem;
  line-height: 1.55;
  color: var(--vp-c-text-1);
  min-height: 3.2em;
}

.ic__controale {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 8px;
  margin-top: 12px;
}

.ic-buton {
  border: 1px solid var(--vp-c-divider);
  border-radius: 8px;
  background-color: var(--vp-c-bg);
  color: var(--vp-c-text-1);
  padding: 5px 12px;
  font-size: 0.82rem;
  font-weight: 600;
  cursor: pointer;
  transition: background-color 0.15s;
}

.ic-buton:hover:not(:disabled) {
  background-color: var(--vp-c-bg-soft);
  border-color: var(--vp-c-brand-1);
}

.ic-buton:disabled {
  opacity: 0.45;
  cursor: default;
}

.ic__contor {
  margin-left: 6px;
  font-size: 0.78rem;
  color: var(--vp-c-text-3);
}
</style>
