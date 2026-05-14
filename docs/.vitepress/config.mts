import { defineConfig } from 'vitepress'
import { withMermaid } from 'vitepress-plugin-mermaid'

export default withMermaid(
  defineConfig({
    title: 'Code helper',
    description: 'Algoritmi si structuri de date - C++',
    themeConfig: {
      search: {
        provider: 'local',
      },
      nav: [
        { text: 'Lectii', link: '/cpp/algoritmi/clasa-a-9a/notiuni-de-baza/expresii' },
        { text: 'Pseudocod', link: '/cpp/pseudocod/if' },
      ],
      sidebar: [
        {
          text: 'Clasa a IX-a',
          collapsed: false,
          items: [
            {
              text: 'Notiuni de baza',
              collapsed: false,
              items: [
                { text: 'Expresii', link: '/cpp/algoritmi/clasa-a-9a/notiuni-de-baza/expresii' },
                { text: 'Intervale matematice', link: '/cpp/algoritmi/clasa-a-9a/notiuni-de-baza/expresii-pentru-intervale' },
                { text: 'Expresii cu cifre', link: '/cpp/algoritmi/clasa-a-9a/notiuni-de-baza/expresii-cu-cifre' },
                { text: 'Primul program', link: '/cpp/algoritmi/clasa-a-9a/notiuni-de-baza/primul-program' },
                { text: 'Variabile', link: '/cpp/algoritmi/clasa-a-9a/notiuni-de-baza/variabile' },
                { text: 'Citire', link: '/cpp/algoritmi/clasa-a-9a/notiuni-de-baza/citire' },
                { text: 'Fisiere', link: '/cpp/algoritmi/clasa-a-9a/notiuni-de-baza/fisiere' },
                { text: 'Citirea si afisarea in C', link: '/cpp/algoritmi/clasa-a-9a/notiuni-de-baza/citirea-si-afisarea-in-c' },
                { text: 'Operatii aritmetice', link: '/cpp/algoritmi/clasa-a-9a/notiuni-de-baza/operatii-aritmetice' },
                { text: 'If', link: '/cpp/algoritmi/clasa-a-9a/notiuni-de-baza/if' },
                { text: 'While', link: '/cpp/algoritmi/clasa-a-9a/notiuni-de-baza/while' },
                { text: 'For', link: '/cpp/algoritmi/clasa-a-9a/notiuni-de-baza/for' },
                { text: 'Break', link: '/cpp/algoritmi/clasa-a-9a/notiuni-de-baza/break' },
                { text: 'Continue', link: '/cpp/algoritmi/clasa-a-9a/notiuni-de-baza/continue' },
                { text: 'Debug', link: '/cpp/algoritmi/clasa-a-9a/notiuni-de-baza/debug' },
              ],
            },
            {
              text: 'Algoritmi elementari',
              collapsed: false,
              items: [
                { text: 'Minime si maxime', link: '/cpp/algoritmi/clasa-a-9a/algoritmi-elementari/notiuni-de-baza/minime-si-maxime' },
                { text: 'Baze de numeratie', link: '/cpp/algoritmi/clasa-a-9a/algoritmi-elementari/notiuni-de-baza/baze-de-numeratie' },
                {
                  text: 'Cifrele unui numar',
                  collapsed: true,
                  items: [
                    { text: 'Oglindit', link: '/cpp/algoritmi/clasa-a-9a/algoritmi-elementari/cifrele-unui-numar/oglindit' },
                    { text: 'Palindrom', link: '/cpp/algoritmi/clasa-a-9a/algoritmi-elementari/cifrele-unui-numar/palindrom' },
                    { text: 'Prima cifra', link: '/cpp/algoritmi/clasa-a-9a/algoritmi-elementari/cifrele-unui-numar/prima-cifra' },
                    { text: 'Suma cifrelor', link: '/cpp/algoritmi/clasa-a-9a/algoritmi-elementari/cifrele-unui-numar/suma-cifrelor' },
                  ],
                },
                {
                  text: 'Citiri pana la final',
                  collapsed: true,
                  items: [
                    { text: 'Citire n nr ca perechi consecutive', link: '/cpp/algoritmi/clasa-a-9a/algoritmi-elementari/citiri-pana-la-final/citire-n-nr-ca-perechi-consecutive' },
                    { text: 'Citire pana la aparitia lui zero', link: '/cpp/algoritmi/clasa-a-9a/algoritmi-elementari/citiri-pana-la-final/citire-pana-la-aparitia-lui-zero' },
                    { text: 'Citire pana la finalul consolei', link: '/cpp/algoritmi/clasa-a-9a/algoritmi-elementari/citiri-pana-la-final/citire-pana-la-finalul-consolei' },
                    { text: 'Citire pana la finalul fisierului', link: '/cpp/algoritmi/clasa-a-9a/algoritmi-elementari/citiri-pana-la-final/citire-pana-la-finalul-fisierului' },
                    { text: 'Citire perechi pana la 0 0', link: '/cpp/algoritmi/clasa-a-9a/algoritmi-elementari/citiri-pana-la-final/citire-perechi-pana-la-0-0' },
                  ],
                },
                {
                  text: 'Divizibilitate',
                  collapsed: true,
                  items: [
                    { text: 'Determinarea divizorilor', link: '/cpp/algoritmi/clasa-a-9a/algoritmi-elementari/divizibilitate/determinarea-divizorilor' },
                    { text: 'CMMDC si CMMMC', link: '/cpp/algoritmi/clasa-a-9a/algoritmi-elementari/divizibilitate/cmmdc-si-cmmmc' },
                    { text: 'Descompunere in factori primi', link: '/cpp/algoritmi/clasa-a-9a/algoritmi-elementari/divizibilitate/descompunere-in-factori-primi' },
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
            { text: 'Functii', link: '/cpp/algoritmi/clasa-a-10a/functii' },
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
