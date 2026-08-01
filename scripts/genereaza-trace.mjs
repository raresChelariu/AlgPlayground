// Genereaza trace-ul de executie pentru un program C++, folosind backend-ul
// public al pythontutor.com (Valgrind + g++). Rezultatul se salveaza ca fisier
// static in docs/public/traces/ si e citit de componenta DebuggerVisual.vue.
//
// Rularea se face O SINGURA DATA, la scrierea lectiei - site-ul livrat nu
// contacteaza niciun backend.
//
// Folosire:
//   node scripts/genereaza-trace.mjs scripts/exemple/lista-dublata.cpp "6 1 2 3 1 2 3" lista-dublata
//
// Formatul brut intors de pythontutor este cel al proiectului Online Python
// Tutor (chei snake_case, valori codate ca tupluri C_DATA / C_STRUCT / C_ARRAY).
// Il traducem intr-o forma mult mai simpla, cu valorile deja formatate ca text,
// ca sa nu ducem logica de decodare in componenta Vue.

import { readFileSync, writeFileSync, mkdirSync } from 'node:fs'
import { dirname, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'

const radacina = resolve(dirname(fileURLToPath(import.meta.url)), '..')

const [caleSursa, intrare = '', numeIesire] = process.argv.slice(2)

if (!caleSursa || !numeIesire)
{
  console.error('Folosire: node scripts/genereaza-trace.mjs <fisier.cpp> "<intrare>" <nume-iesire>')
  process.exit(1)
}

// --- 1. cererea catre backend ----------------------------------------------

const cod = readFileSync(resolve(radacina, caleSursa), 'utf8').replace(/\r\n/g, '\n')

const parametri = new URLSearchParams({
  user_script: cod,
  raw_input_json: intrare ? JSON.stringify([intrare]) : '',
  options_json: JSON.stringify({
    cpp_version: 'cpp_g++9.3.0',
    fe_disableHeapNesting: false,
    fe_textualMemoryLabels: false,
    fe_matrixMode: false,
  }),
  n: String(Math.floor(Math.random() * 1000)),
})

console.log(`Trimit ${cod.length} caractere de cod catre pythontutor...`)

const raspuns = await fetch(`https://pythontutor.com/web_exec_cpp.py?${parametri}`, {
  headers: { Referer: 'https://pythontutor.com/visualize.html' },
})

if (!raspuns.ok)
{
  console.error(`Backend-ul a raspuns cu ${raspuns.status}`)
  process.exit(1)
}

const brut = await raspuns.json()

if (!Array.isArray(brut.trace) || brut.trace.length === 0)
{
  console.error('Raspuns fara pasi de executie:', JSON.stringify(brut).slice(0, 500))
  process.exit(1)
}

const ultimul = brut.trace[brut.trace.length - 1]
if (ultimul.event === 'uncaught_exception' || ultimul.exception_msg)
{
  console.error(`Programul s-a oprit cu eroare: ${ultimul.exception_msg}`)
  process.exit(1)
}

console.log(`Am primit ${brut.trace.length} pasi.`)

// --- 2. remaparea adreselor -------------------------------------------------

// Adresele reale (0x5C7BC80) nu spun nimic unui elev si fac schema ilizibila.
// Le inlocuim cu 0x100, 0x110, 0x120... in ordinea in care blocurile apar
// prima data in trace, adica exact ordinea alocarii lor cu "new".
const adrese = new Map()

for (const pas of brut.trace)
{
  for (const adresa of Object.keys(pas.heap ?? {}))
  {
    if (!adrese.has(adresa)) adrese.set(adresa, `0x${(0x100 + adrese.size * 0x10).toString(16).toUpperCase()}`)
  }
}

function tradAdresa(valoare) {
  if (valoare === null || valoare === undefined || valoare === '0x0') return null
  return adrese.get(valoare) ?? String(valoare)
}

// --- 3. decodarea valorilor -------------------------------------------------

const esteData = (v) => Array.isArray(v) && v[0] === 'C_DATA'
const esteStruct = (v) => Array.isArray(v) && v[0] === 'C_STRUCT'
const esteArray = (v) => Array.isArray(v) && v[0] === 'C_ARRAY'

// Al treilea element al unui C_ARRAY este un dictionar de metadate
// (elt_bytes, heap_block), nu un element propriu-zis.
function elementeArray(v) {
  const rest = v.slice(2)
  if (rest.length > 0 && !Array.isArray(rest[0]) && typeof rest[0] === 'object') return rest.slice(1)
  return rest
}

function numeStruct(v) {
  const al3lea = v[2]
  if (typeof al3lea === 'string') return al3lea
  return al3lea?.name ?? 'struct'
}

// Campurile <padding> sunt octetii de aliniere dintre membrii unui struct.
// Nu exista in codul sursa, deci nu au ce cauta intr-o lectie.
const estePadding = (nume) => nume === '<padding>'

// Intoarce { tip, val, pointer } pentru o valoare simpla.
function citesteData(v) {
  const tip = String(v[2])
  const valoare = v[3]

  if (valoare === '<UNINITIALIZED>' || valoare === '<UNALLOCATED>') return { tip, val: '?', pointer: false }

  if (tip === 'pointer' || tip === 'ref')
  {
    const tinta = tradAdresa(valoare)
    return { tip: 'pointer', val: tinta ?? 'NULL', pointer: tinta !== null }
  }

  if (typeof valoare === 'string') return { tip, val: valoare, pointer: false }
  return { tip, val: String(valoare), pointer: false }
}

function listaVariabile(numeOrdonate, codate) {
  const rezultat = []
  for (const nume of numeOrdonate ?? [])
  {
    const v = codate?.[nume]
    if (v === undefined) continue
    if (esteData(v)) rezultat.push({ nume, ...citesteData(v) })
    else rezultat.push({ nume, tip: '', val: '...', pointer: false })
  }
  return rezultat
}

// Un bloc de heap este mereu un C_ARRAY cu heap_block: true. Daca are un singur
// element si acela e un struct, il aratam ca nod; altfel ca tablou.
function citesteBlocHeap(adresa, v) {
  const adr = adrese.get(adresa) ?? adresa
  if (!esteArray(v)) return { adr, fel: 'tablou', tip: '', elemente: [] }

  const elemente = elementeArray(v)

  if (elemente.length === 1 && esteStruct(elemente[0]))
  {
    const s = elemente[0]
    const campuri = []
    for (const camp of s.slice(3))
    {
      if (!Array.isArray(camp)) continue
      const [nume, valoare] = camp
      if (estePadding(nume)) continue
      if (esteData(valoare)) campuri.push({ nume, ...citesteData(valoare) })
    }
    return { adr, fel: 'nod', tip: numeStruct(s), campuri }
  }

  return {
    adr,
    fel: 'tablou',
    tip: elemente.length > 0 && esteData(elemente[0]) ? String(elemente[0][2]) : '',
    elemente: elemente.map((el, idx) => ({ idx, val: esteData(el) ? citesteData(el).val : '...' })),
  }
}

// --- 4. traducerea pasilor --------------------------------------------------

const traduceEveniment = { call: 'apel', return: 'retur', step_line: 'linie' }

// "FLsiDublu(Nod*)" -> "FLsiDublu"
const numeScurt = (n) => String(n ?? '').split('(')[0]

const pasi = brut.trace.map((pas) => ({
  eveniment: traduceEveniment[pas.event] ?? 'linie',
  linie: pas.line,
  stiva: (pas.stack_to_render ?? []).map((cadru) => ({
    functie: numeScurt(cadru.func_name),
    activ: Boolean(cadru.is_highlighted),
    linie: cadru.line ?? null,
    locale: listaVariabile(cadru.ordered_varnames, cadru.encoded_locals),
  })),
  globale: listaVariabile(pas.ordered_globals, pas.globals),
  heap: Object.entries(pas.heap ?? {}).map(([adresa, v]) => citesteBlocHeap(adresa, v)),
  consola: pas.stdout ?? '',
}))

// --- 5. scrierea fisierului -------------------------------------------------

const iesire = { cod, intrare, pasi }
const caleIesire = resolve(radacina, 'docs/public/traces', `${numeIesire}.json`)

mkdirSync(dirname(caleIesire), { recursive: true })
writeFileSync(caleIesire, JSON.stringify(iesire), 'utf8')

const kb = (n) => `${(n / 1024).toFixed(1)} KB`
console.log(`Scris ${caleIesire}`)
console.log(`  ${pasi.length} pasi, ${adrese.size} blocuri de heap, ${kb(JSON.stringify(iesire).length)}`)
console.log(`  consola finala: ${JSON.stringify(pasi[pasi.length - 1].consola)}`)
