import { defineConfig } from 'vitepress'
import { withMermaid } from 'vitepress-plugin-mermaid'

export default withMermaid(
  defineConfig({
    title: 'Code helper',
    description: 'Algoritmi si structuri de date - C++',
    themeConfig: {
      nav: [
        { text: 'Lectii', link: '/cpp/algoritmi/clasa-a-9a/lectii/expresii' },
        { text: 'Pseudocod', link: '/cpp/pseudocod/if' },
      ],
      sidebar: [
        {
          text: 'Clasa a IX-a',
          collapsed: false,
          items: [
            { text: 'Expresii', link: '/cpp/algoritmi/clasa-a-9a/lectii/expresii' },
            { text: 'Intervale matematice', link: '/cpp/algoritmi/clasa-a-9a/lectii/expresii-pentru-intervale' },
            { text: 'Expresii cu cifre', link: '/cpp/algoritmi/clasa-a-9a/lectii/expresii-cu-cifre' },
            { text: 'Primul program', link: '/cpp/algoritmi/clasa-a-9a/lectii/primul-program' },
            { text: 'Variabile', link: '/cpp/algoritmi/clasa-a-9a/lectii/variabile' },
            { text: 'Citire', link: '/cpp/algoritmi/clasa-a-9a/lectii/citire' },
            { text: 'Fisiere', link: '/cpp/algoritmi/clasa-a-9a/lectii/fisiere' },
            { text: 'Operatii aritmetice', link: '/cpp/algoritmi/clasa-a-9a/lectii/operatii-aritmetice' },
            { text: 'If', link: '/cpp/algoritmi/clasa-a-9a/lectii/if' },
            { text: 'Debug', link: '/cpp/algoritmi/clasa-a-9a/lectii/debug' },
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
          ],
        },
        {
          text: 'Clasa a X-a',
          collapsed: false,
          items: [
            { text: 'Struct', link: '/cpp/algoritmi/clasa-a-10a/struct' },
            {
              text: 'Siruri de caractere',
              collapsed: true,
              items: [
                { text: 'Siruri de caractere', link: '/cpp/algoritmi/clasa-a-10a/siruri-de-caractere/siruri' },
                { text: 'Caractere', link: '/cpp/algoritmi/clasa-a-10a/siruri-de-caractere/caractere' },
                { text: 'strlen', link: '/cpp/algoritmi/clasa-a-10a/siruri-de-caractere/strlen' },
                { text: 'strcpy', link: '/cpp/algoritmi/clasa-a-10a/siruri-de-caractere/strcpy' },
                { text: 'strcat', link: '/cpp/algoritmi/clasa-a-10a/siruri-de-caractere/strcat' },
                { text: 'strcmp', link: '/cpp/algoritmi/clasa-a-10a/siruri-de-caractere/strcmp' },
                { text: 'strchr', link: '/cpp/algoritmi/clasa-a-10a/siruri-de-caractere/strchr' },
                { text: 'strstr', link: '/cpp/algoritmi/clasa-a-10a/siruri-de-caractere/strstr' },
                { text: 'strtok', link: '/cpp/algoritmi/clasa-a-10a/siruri-de-caractere/strtok' },
                { text: 'Colectie de cuvinte', link: '/cpp/algoritmi/clasa-a-10a/siruri-de-caractere/colectie-de-cuvinte' },
              ],
            },
            { text: 'Pointeri', link: '/cpp/algoritmi/clasa-a-10a/pointeri' },
            { text: 'Alocare dinamica', link: '/cpp/algoritmi/clasa-a-10a/alocare-dinamica' },
            { text: 'Liste inlantuite', link: '/cpp/algoritmi/clasa-a-10a/liste-inlantuite' },
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
