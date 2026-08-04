// Genereaza cate o pagina Playground pentru fiecare exemplu care are trace.
//
// Extensia .mts e obligatorie: package.json are "type": "commonjs", iar Vite
// decide ESM/CJS dupa extensie. Un fisier .paths.ts ar fi incarcat ca CommonJS
// si import-ul de mai jos ar crapa.

import { areHeap, numeExemple, titluri } from '../../../.vitepress/exemple'

export default {
  paths() {
    return numeExemple.map((exemplu) => ({
      params: {
        exemplu,
        titlu: titluri[exemplu] ?? exemplu,
        // params sunt siruri, deci trecem un "da"/"nu" pe care pagina il converteste.
        heap: areHeap(exemplu) ? 'da' : 'nu',
      },
    }))
  },
}
