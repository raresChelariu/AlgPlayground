// Adauga un buton "Ruleaza" pe blocurile de cod din lectii al caror continut
// corespunde unui exemplu cu trace generat. Butonul duce la pagina Playground,
// unde acelasi program se vede rulat pas cu pas.
//
// Se face la BUILD, nu in browser. Motivul e in vitepress/dist/client/app/index.js:
// router.go() apeleaza onAfterRouteChange INAINTE de app.mount(), deci la prima
// incarcare a paginii nu exista inca niciun bloc de cod in DOM. In plus, aici avem
// token.content - sursa bruta din .md - deci potrivirea e exacta prin constructie,
// nu reconstituita din HTML-ul randat de Shiki.

import type MarkdownIt from 'markdown-it'
import { hartaCod, normalizeaza } from './exemple'

// Butonul de copiere al VitePress isi gaseste blocul <pre> numarand doi frati
// inainte de el (copyCode.js: el.nextElementSibling?.nextElementSibling). Daca am
// insera intre el si <pre>, butonul de copiere ar copia cuvantul "Ruleaza".
// De aceea intram ca PRIM copil, inaintea lui. Asta pastreaza si selectorul
// "button.copy + span.lang", prin care tema ascunde eticheta limbajului la hover.
const DESCHIDERE = /^(<div class="language-[^"]*"[^>]*>)/

function butonPentru(nume: string): string {
  return (
    `<a class="pg-ruleaza no-icon" href="/cpp/unelte/playground/${nume}.html"` +
    ` target="_blank" rel="noopener"` +
    ` title="Deschide in Playground si vezi executia pas cu pas">Ruleaza</a>`
  )
}

export function butonRuleaza(md: MarkdownIt): void {
  const randeazaImplicit = md.renderer.rules.fence

  if (!randeazaImplicit)
  {
    console.warn('[buton-ruleaza] md.renderer.rules.fence lipseste; butonul nu se adauga.')
    return
  }

  md.renderer.rules.fence = (tokens, idx, optiuni, env, self) => {
    const html = randeazaImplicit(tokens, idx, optiuni, env, self)

    // Nu ne uitam la limbajul din token.info. Daca textul se potriveste cu o sursa
    // C++ cunoscuta, e cod C++ oricum - si asa acoperim gratis si formele
    // ```cpp{1,3}, ```cpp [titlu] sau ```cpp:line-numbers.
    const nume = hartaCod.get(normalizeaza(tokens[idx].content))
    if (!nume) return html

    if (!DESCHIDERE.test(html))
    {
      console.warn(
        `[buton-ruleaza] structura blocului de cod s-a schimbat; sar peste "${nume}".\n` +
        `  inceput: ${html.slice(0, 120)}`,
      )
      return html
    }

    return html.replace(DESCHIDERE, `$1${butonPentru(nume)}`)
  }
}
