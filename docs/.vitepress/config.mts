import { defineConfig } from 'vitepress'
import { withMermaid } from 'vitepress-plugin-mermaid'
import { categories } from './structure'

export default withMermaid(
  defineConfig({
    title: 'Code helper',
    description: 'Algoritmi si structuri de date - C++',
    themeConfig: {
      search: {
        provider: 'local',
        options: {
          translations: {
            button: {
              buttonText: 'Cauta',
              buttonAriaLabel: 'Cauta',
            },
            modal: {
              displayDetails: 'Detalii',
              resetButtonTitle: 'Reset',
              backButtonTitle: 'Inchide',
              noResultsText: 'Niciun rezultat pentru',
              footer: {
                selectText: 'pentru a selecta',
                selectKeyAriaLabel: 'enter',
                navigateText: 'pentru a naviga',
                navigateUpKeyAriaLabel: 'sus',
                navigateDownKeyAriaLabel: 'jos',
                closeText: 'pentru a inchide',
                closeKeyAriaLabel: 'escape',
              },
            },
          },
        },
      },
      nav: [
        { text: 'Lectii', link: '/cpp/algoritmi/clasa-a-9a/notiuni-de-baza/expresii' },
        { text: 'Pseudocod', link: '/cpp/pseudocod/if' },
      ],
      sidebar: categories.map((c) => ({
        text: c.text,
        link: c.landing,
        collapsed: false,
        items: c.items,
      })),
    },
  })
)
