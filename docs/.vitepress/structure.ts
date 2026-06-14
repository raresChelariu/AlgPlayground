// Sursa unica de continut: alimenteaza si sidebar-ul (config.mts) si paginile-index
// per clasa (ClassIndex.vue). Adaugarea unei lectii se face o singura data, aici.

export interface TreeItem {
  text: string
  link?: string
  collapsed?: boolean
  items?: TreeItem[]
}

export interface Category {
  id: string // identificator scurt folosit de paginile-index (ex. 'clasa-a-9a')
  text: string // titlul afisat in sidebar si pe pagina-index
  landing: string // ruta paginii-index (ex. '/cpp/algoritmi/clasa-a-9a/')
  items: TreeItem[] // sectiunile si lectiile clasei
}

export const categories: Category[] = [
  {
    id: 'clasa-a-9a',
    text: 'Clasa a IX-a',
    landing: '/cpp/algoritmi/clasa-a-9a/',
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
          { text: 'Verificarea unor proprietati', link: '/cpp/algoritmi/clasa-a-9a/algoritmi-elementari/verificarea-unor-proprietati' },
          { text: 'Secvente', link: '/cpp/algoritmi/clasa-a-9a/algoritmi-elementari/secvente' },
        ],
      },
      {
        text: 'Vectori',
        collapsed: false,
        items: [
          { text: 'Vector', link: '/cpp/algoritmi/clasa-a-9a/vectori/vector' },
          { text: 'Parcurgerea vectorilor', link: '/cpp/algoritmi/clasa-a-9a/vectori/parcurgerea-vectorilor' },
          { text: 'Stergeri si inserari', link: '/cpp/algoritmi/clasa-a-9a/vectori/stergere-si-inserare' },
          { text: 'Cautare binara', link: '/cpp/algoritmi/clasa-a-9a/vectori/cautare-binara' },
        ],
      },
      {
        text: 'Matrici',
        collapsed: false,
        items: [
          { text: 'Parcurgere matrici', link: '/cpp/algoritmi/clasa-a-9a/matrici/parcurgere-matrici' },
          { text: 'Operatii cu linii si coloane', link: '/cpp/algoritmi/clasa-a-9a/matrici/operatii-linii-coloane' },
          { text: 'Chenarul matricei', link: '/cpp/algoritmi/clasa-a-9a/matrici/chenarul-matricei' },
          { text: 'Vecini in matrice', link: '/cpp/algoritmi/clasa-a-9a/matrici/vecini-in-matrice' },
        ],
      },
    ],
  },
  {
    id: 'clasa-a-10a',
    text: 'Clasa a X-a',
    landing: '/cpp/algoritmi/clasa-a-10a/',
    items: [
      {
        text: 'Functii',
        collapsed: false,
        items: [
          { text: 'Functii', link: '/cpp/algoritmi/clasa-a-10a/functii' },
          { text: 'Functii cu tablouri', link: '/cpp/algoritmi/clasa-a-10a/functii-tablouri' },
        ],
      },
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
      {
        text: 'Structuri de date',
        collapsed: false,
        items: [
          { text: 'Stiva', link: '/cpp/algoritmi/clasa-a-10a/stiva' },
        ],
      },
    ],
  },
  {
    id: 'pseudocod',
    text: 'Pseudocod',
    landing: '/cpp/pseudocod/',
    items: [
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
]
