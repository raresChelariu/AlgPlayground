import { defineConfig } from 'vitepress'
import { withMermaid } from 'vitepress-plugin-mermaid'

export default withMermaid(
  defineConfig({
    title: 'AlgPlayground',
    description: 'Algoritmi si structuri de date - C++',
    themeConfig: {
      nav: [
        { text: 'Lectii', link: '/cpp/algoritmi/clasa-a-9a/lectii/01-expresii' },
        { text: 'Helper', link: '/cpp/algoritmi/clasa-a-9a/helper/expresii' },
        { text: 'Pseudocod', link: '/cpp/pseudocod/if' },
      ],
      sidebar: [
        {
          text: 'Lectii',
          items: [
            { text: '01 - Expresii', link: '/cpp/algoritmi/clasa-a-9a/lectii/01-expresii' },
            { text: '02 - Primul program', link: '/cpp/algoritmi/clasa-a-9a/lectii/02-primul-program' },
            { text: '03 - Variabile', link: '/cpp/algoritmi/clasa-a-9a/lectii/03-variabile' },
            { text: '04 - Citire', link: '/cpp/algoritmi/clasa-a-9a/lectii/04-citire' },
            { text: '05 - Fisiere', link: '/cpp/algoritmi/clasa-a-9a/lectii/05-fisiere' },
            { text: '06 - Operatii aritmetice', link: '/cpp/algoritmi/clasa-a-9a/lectii/06-operatii-aritmetice' },
            { text: '07 - If', link: '/cpp/algoritmi/clasa-a-9a/lectii/07-if' },
          ],
        },
        {
          text: 'Helper',
          collapsed: true,
          items: [
            { text: 'Backtracking', link: '/cpp/algoritmi/clasa-a-9a/helper/backtracking' },
            { text: 'Baze de numeratie', link: '/cpp/algoritmi/clasa-a-9a/helper/baze-de-numeraaie' },
            { text: 'Caractere', link: '/cpp/algoritmi/clasa-a-9a/helper/caractere' },
            { text: 'Cautare binara', link: '/cpp/algoritmi/clasa-a-9a/helper/cautare-binara' },
            { text: 'Ce se intampla cand se apeleaza o functie', link: '/cpp/algoritmi/clasa-a-9a/helper/ce-se-intampla-cand-se-apeleaza-o-funcaie' },
            { text: 'Citire', link: '/cpp/algoritmi/clasa-a-9a/helper/citire' },
            { text: 'Citirea si scrierea in limbajul C', link: '/cpp/algoritmi/clasa-a-9a/helper/citirea-si-scrierea-in-limbajul-c' },
            { text: 'Ciurul lui Eratostene', link: '/cpp/algoritmi/clasa-a-9a/helper/ciurul-lui-eratostene' },
            { text: 'Cum evaluam o expresie', link: '/cpp/algoritmi/clasa-a-9a/helper/cum-evaluam-o-expresie' },
            { text: 'Divide et impera', link: '/cpp/algoritmi/clasa-a-9a/helper/divide-et-impera' },
            { text: 'Divizibilitate', link: '/cpp/algoritmi/clasa-a-9a/helper/divizibilitate' },
            { text: 'Expresii cu intervale matematice', link: '/cpp/algoritmi/clasa-a-9a/helper/expresii-cu-intervale-matematice' },
            { text: 'Expresii', link: '/cpp/algoritmi/clasa-a-9a/helper/expresii' },
            { text: 'Functii', link: '/cpp/algoritmi/clasa-a-9a/helper/funcaii' },
            { text: 'Functia sort', link: '/cpp/algoritmi/clasa-a-9a/helper/functia-sort' },
            { text: 'Impartirea cu numere cu virgula', link: '/cpp/algoritmi/clasa-a-9a/helper/imparairea-cu-numere-cu-virgula' },
            { text: 'Interclasare', link: '/cpp/algoritmi/clasa-a-9a/helper/interclasare' },
            { text: 'Keyword-ul static', link: '/cpp/algoritmi/clasa-a-9a/helper/keyword-ul-static' },
            { text: 'Legile lui DeMorgan', link: '/cpp/algoritmi/clasa-a-9a/helper/legile-lui-demorgan' },
            { text: 'Maxime si minime', link: '/cpp/algoritmi/clasa-a-9a/helper/maxime-si-minime' },
            { text: 'Operatii pe biti', link: '/cpp/algoritmi/clasa-a-9a/helper/operaaii-pe-biai' },
            { text: 'Parametri cu referinta', link: '/cpp/algoritmi/clasa-a-9a/helper/parametri-cu-referinaa' },
            { text: 'Pointeri', link: '/cpp/algoritmi/clasa-a-9a/helper/pointeri' },
            { text: 'Prioritatea operatorilor', link: '/cpp/algoritmi/clasa-a-9a/helper/prioritatea-operatorilor' },
            { text: 'Probleme cu toate/exista', link: '/cpp/algoritmi/clasa-a-9a/helper/probleme-cu-toateexista' },
            { text: 'Recursie', link: '/cpp/algoritmi/clasa-a-9a/helper/recursie' },
            { text: 'Secvente', link: '/cpp/algoritmi/clasa-a-9a/helper/secvenae' },
            { text: 'Siruri de caractere', link: '/cpp/algoritmi/clasa-a-9a/helper/siruri-de-caractere' },
            { text: 'Stergeri si inserari in vector', link: '/cpp/algoritmi/clasa-a-9a/helper/stergeri-si-inserari-in-vector' },
            { text: 'Stiva si coada', link: '/cpp/algoritmi/clasa-a-9a/helper/stiva-si-coada' },
            { text: 'Struct', link: '/cpp/algoritmi/clasa-a-9a/helper/struct' },
            { text: 'Switch case', link: '/cpp/algoritmi/clasa-a-9a/helper/switch-case' },
            { text: 'Tipuri de date primitive', link: '/cpp/algoritmi/clasa-a-9a/helper/tipuri-de-date-primitive' },
            { text: 'Vectori de frecventa/caracteristici', link: '/cpp/algoritmi/clasa-a-9a/helper/vectori-de-frecventacaracteristici' },
          ],
        },
        {
          text: 'Algoritmi',
          collapsed: true,
          items: [
            {
              text: 'Cifrele unui numar',
              collapsed: true,
              items: [
                { text: 'Oglindit', link: '/cpp/algoritmi/clasa-a-9a/cifrele-unui-numar/oglindit' },
                { text: 'Palindrom', link: '/cpp/algoritmi/clasa-a-9a/cifrele-unui-numar/palindrom' },
                { text: 'Prima cifra', link: '/cpp/algoritmi/clasa-a-9a/cifrele-unui-numar/prima-cifra' },
                { text: 'Suma cifrelor', link: '/cpp/algoritmi/clasa-a-9a/cifrele-unui-numar/suma-cifrelor' },
              ],
            },
            {
              text: 'Citiri pana la final',
              collapsed: true,
              items: [
                { text: 'Citire n nr ca perechi consecutive', link: '/cpp/algoritmi/clasa-a-9a/citiri-pana-la-final/citire-n-nr-ca-perechi-consecutive' },
                { text: 'Citire pana la aparitia lui zero', link: '/cpp/algoritmi/clasa-a-9a/citiri-pana-la-final/citire-pana-la-aparitia-lui-zero' },
                { text: 'Citire pana la finalul consolei', link: '/cpp/algoritmi/clasa-a-9a/citiri-pana-la-final/citire-pana-la-finalul-consolei' },
                { text: 'Citire pana la finalul fisierului', link: '/cpp/algoritmi/clasa-a-9a/citiri-pana-la-final/citire-pana-la-finalul-fisierului' },
                { text: 'Citire perechi pana la 0 0', link: '/cpp/algoritmi/clasa-a-9a/citiri-pana-la-final/citire-perechi-pana-la-0-0' },
              ],
            },
            {
              text: 'Divizibilitate',
              collapsed: true,
              items: [
                {
                  text: 'CMMDC si CMMMC',
                  collapsed: true,
                  items: [
                    { text: 'CMMDC', link: '/cpp/algoritmi/clasa-a-9a/divizibilitate/cmmdc-si-cmmmc/cmmdc' },
                    { text: 'CMMMC', link: '/cpp/algoritmi/clasa-a-9a/divizibilitate/cmmdc-si-cmmmc/cmmmc' },
                  ],
                },
                {
                  text: 'Descompunere in factori primi',
                  collapsed: true,
                  items: [
                    { text: 'Varianta 1 - banala', link: '/cpp/algoritmi/clasa-a-9a/divizibilitate/descompunere-in-factori-primi/var-1-banala' },
                    { text: 'Varianta 2 - 2 este singurul prim par', link: '/cpp/algoritmi/clasa-a-9a/divizibilitate/descompunere-in-factori-primi/var-2-2-este-singurul-prim-par' },
                    { text: 'Varianta 3 - testare nr prim', link: '/cpp/algoritmi/clasa-a-9a/divizibilitate/descompunere-in-factori-primi/var-3-testare-nr-prim' },
                  ],
                },
                {
                  text: 'Determinarea divizorilor',
                  collapsed: true,
                  items: [
                    { text: 'Metoda banala', link: '/cpp/algoritmi/clasa-a-9a/divizibilitate/determinarea-divizorilor/divizori-metoda-banala' },
                    { text: 'Merg pana la jumatate', link: '/cpp/algoritmi/clasa-a-9a/divizibilitate/determinarea-divizorilor/divizori-merg-pana-la-jumatate' },
                    { text: 'Merg pana la radical', link: '/cpp/algoritmi/clasa-a-9a/divizibilitate/determinarea-divizorilor/divizori-merg-pana-la-radical' },
                  ],
                },
              ],
            },
          ],
        },
        {
          text: 'Pseudocod',
          collapsed: true,
          items: [
            { text: 'If', link: '/cpp/pseudocod/if' },
            { text: 'For', link: '/cpp/pseudocod/for' },
            { text: 'While', link: '/cpp/pseudocod/while' },
            { text: 'Cat timp', link: '/cpp/pseudocod/cat-timp' },
            { text: 'Pentru', link: '/cpp/pseudocod/pentru' },
            { text: 'Repeta pana cand', link: '/cpp/pseudocod/repeta-pana-cand' },
            {
              text: 'Conversii',
              collapsed: true,
              items: [
                { text: 'Cat timp in repeta pana cand', link: '/cpp/pseudocod/conversii/cat-timp-in-repeta-pana-cand' },
                { text: 'Pentru in cat timp', link: '/cpp/pseudocod/conversii/pentru-in-cat-timp' },
                { text: 'Pentru in repeta pana cand', link: '/cpp/pseudocod/conversii/pentru-in-repeta-pana-cand' },
                { text: 'Repeta in cat timp', link: '/cpp/pseudocod/conversii/repeta-in-cat-timp' },
              ],
            },
          ],
        },
      ],
    },
  })
)
