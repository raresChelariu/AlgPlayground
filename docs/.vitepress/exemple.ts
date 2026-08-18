// Exemplele care au trace de executie generat, citite direct din
// docs/public/traces/. De aici stiu si butonul "Ruleaza" (ce blocuri de cod din
// lectii se potrivesc), si paginile Playground (ce rute se genereaza).
//
// Datele vin din trace-urile aflate deja in git, nu din scripts/genereaza-toate.mjs:
// acela ruleaza doar in GitHub Actions, cu Docker, deci o lista intretinuta acolo
// ar putea ramane in urma fata de trace-urile reale.

import { readFileSync, readdirSync } from 'node:fs'
import { dirname, join, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'

const dirTrace = resolve(dirname(fileURLToPath(import.meta.url)), '../public/traces')

interface Pas {
  heap?: unknown[]
}

interface Trace {
  cod: string
  intrare: string
  pasi: Pas[]
}

// Codul din blocul ```cpp al lectiei si fisierul .cpp care a generat trace-ul sunt
// scrise separat, deci pot sa difere prin terminatii de linie sau spatii la capat.
// Comparam formele normalizate, ca sa nu ratam o potrivire pentru un caracter invizibil.
export function normalizeaza(cod: string): string {
  return cod.replace(/\r\n/g, '\n').replace(/[ \t]+$/gm, '').replace(/\s+$/, '')
}

const trace = new Map<string, Trace>()

for (const fisier of readdirSync(dirTrace).sort())
{
  if (!fisier.endsWith('.json')) continue
  const nume = fisier.slice(0, -'.json'.length)
  trace.set(nume, JSON.parse(readFileSync(join(dirTrace, fisier), 'utf8')) as Trace)
}

export const numeExemple: string[] = [...trace.keys()]

// cod normalizat -> numele exemplului
export const hartaCod: Map<string, string> = new Map(
  [...trace].map(([nume, t]) => [normalizeaza(t.cod), nume]),
)

// Panoul de heap se ascunde cand programul nu aloca nimic cu new - altfel ar sta
// gol pe toata durata executiei. Se deduce din trace, nu se tine intr-o lista.
export function areHeap(nume: string): boolean {
  return (trace.get(nume)?.pasi ?? []).some((p) => (p.heap ?? []).length > 0)
}

// Titlurile nu exista in trace; sunt scrise de mana la fiecare <DebuggerVisual>
// din lectii. Le repetam aici pentru paginile Playground.
export const titluri: Record<string, string> = {
  'acelasi-nume': 'doi n diferiti: parametrul si globala',
  factorial: 'factorial(4) — patru apeluri ale aceleiasi functii pe stiva',
  'lista-dublata': '1 2 3 1 2 3 — cele doua jumatati sunt identice',
  'parametri-copie': 'x se dubleaza, dar a ramane 5',
  'stiva-apeluri': 'main apeleaza cub, cub apeleaza patrat',
}
