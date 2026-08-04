// Genereaza trace-urile de executie pentru toate exemplele din scripts/exemple/
// si le scrie in docs/public/traces/.
//
// Fiecare exemplu are sursa .cpp si, alaturi, datele de intrare in .in
// (fisier gol daca programul nu citeste nimic).
//
// Trace-urile RAMAN in git, si asta e intentionat: Cloudflare Pages construieste
// site-ul din repo, pe infrastructura lui, unde nu exista Docker. Practic git e
// cache-ul - un exemplu se regenereaza doar cand i se schimba sursa, intrarea sau
// versiunea imaginii. Un efect secundar util: site-ul ramane self-contained, deci
// lectiile merg si daca runner-ul se strica.
//
// Folosire:
//   node scripts/genereaza-toate.mjs              # doar ce s-a schimbat
//   node scripts/genereaza-toate.mjs --forteaza   # tot
//
// Are nevoie de Docker. Local, pe o masina fara virtualizare, nu ruleaza - de
// aceea rularea normala e in GitHub Actions (.github/workflows/trace-uri.yml).

import { execFileSync } from 'node:child_process'
import { readFileSync, writeFileSync, readdirSync, existsSync, mkdirSync } from 'node:fs'
import { createHash } from 'node:crypto'
import { dirname, resolve, join, basename } from 'node:path'
import { fileURLToPath } from 'node:url'

const radacina = resolve(dirname(fileURLToPath(import.meta.url)), '..')
const dirExemple = join(radacina, 'scripts/exemple')
const dirTrace = join(radacina, 'docs/public/traces')

const IMAGINE = process.env.IMAGINE ?? 'ghcr.io/rareschelariu/cpptracerunner:latest'
const forteaza = process.argv.includes('--forteaza')

// --- versiunea imaginii ------------------------------------------------------
//
// Intra in amprenta, ca o corectie in runner sa regenereze toate trace-urile.
// Exact asa s-a propagat corectia cu stdbuf, fara sa tinem minte ce e afectat.
function digestImagine() {
  try {
    const iesire = execFileSync('docker', [
      'image', 'inspect', '--format', '{{index .RepoDigests 0}}', IMAGINE,
    ], { encoding: 'utf8' }).trim()
    return iesire || IMAGINE
  } catch {
    // Imagine construita local, fara digest de registry.
    try {
      return execFileSync('docker', [
        'image', 'inspect', '--format', '{{.Id}}', IMAGINE,
      ], { encoding: 'utf8' }).trim()
    } catch {
      console.error(`Nu gasesc imaginea ${IMAGINE}. Ai Docker pornit si imaginea trasa?`)
      process.exit(1)
    }
  }
}

const versiune = digestImagine()
console.log(`Imagine: ${versiune}`)

// --- exemplele ---------------------------------------------------------------

const exemple = readdirSync(dirExemple)
  .filter((f) => f.endsWith('.cpp'))
  .map((f) => basename(f, '.cpp'))
  .sort()

if (exemple.length === 0) {
  console.error(`Niciun .cpp in ${dirExemple}`)
  process.exit(1)
}

mkdirSync(dirTrace, { recursive: true })

const amprenta = (cod, intrare) =>
  createHash('sha256').update(`${cod}\0${intrare}\0${versiune}`).digest('hex')

let generate = 0
let sarite = 0
const esuate = []

for (const nume of exemple) {
  const caleSursa = join(dirExemple, `${nume}.cpp`)
  const caleIntrare = join(dirExemple, `${nume}.in`)
  const caleTrace = join(dirTrace, `${nume}.json`)

  const cod = readFileSync(caleSursa, 'utf8').replace(/\r\n/g, '\n')
  const intrare = existsSync(caleIntrare)
    ? readFileSync(caleIntrare, 'utf8').replace(/\r\n/g, '\n')
    : ''

  const acum = amprenta(cod, intrare)

  if (!forteaza && existsSync(caleTrace)) {
    try {
      if (JSON.parse(readFileSync(caleTrace, 'utf8')).amprenta === acum) {
        sarite++
        continue
      }
    } catch {
      // Fisier stricat sau vechi, fara amprenta - il regeneram.
    }
  }

  process.stdout.write(`${nume}... `)

  try {
    const brut = execFileSync('docker', [
      'run', '--rm', '-i', IMAGINE, 'cli', '-', intrare,
    ], { input: cod, encoding: 'utf8', maxBuffer: 64 * 1024 * 1024 })

    const trace = JSON.parse(brut)
    trace.amprenta = acum

    // Un cadru de apel identic cu cel de sub el inseamna ca stiva nu s-a format
    // inca si a fost raportata gresit. S-a intamplat o data, la primul apel din
    // main, si a trecut nevazut pentru ca verificam doar liniile si evenimentele.
    const cadruDublat = trace.pasi.findIndex((p) => {
      const s = p.stiva ?? []
      if (s.length < 2) return false
      const [jos, sus] = [s[s.length - 2], s[s.length - 1]]
      return jos.functie === sus.functie && jos.linie === sus.linie
    })
    if (cadruDublat !== -1)
      throw new Error(`pasul ${cadruDublat} are cadrul din varf identic cu cel de dedesubt`)

    writeFileSync(caleTrace, JSON.stringify(trace), 'utf8')

    const kb = (Buffer.byteLength(JSON.stringify(trace)) / 1024).toFixed(1)
    console.log(`${trace.pasi.length} pasi, ${kb} KB`)
    generate++
  } catch (e) {
    const detaliu = e.stderr?.toString().trim() || e.message
    console.log('ESEC')
    console.error(`  ${detaliu.split('\n').slice(0, 3).join('\n  ')}`)
    esuate.push(nume)
  }
}

console.log(`\n${generate} generate, ${sarite} nemodificate, ${esuate.length} esuate`)

if (esuate.length > 0) {
  console.error(`Esuate: ${esuate.join(', ')}`)
  process.exit(1)
}
