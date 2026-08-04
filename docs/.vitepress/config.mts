import { defineConfig } from 'vitepress'
import { withMermaid } from 'vitepress-plugin-mermaid'
import { categories } from './structure'
import { butonRuleaza } from './butonRuleaza'

export default withMermaid(
  defineConfig({
    title: 'Code helper',
    description: 'Algoritmi si structuri de date - C++',
    // Trebuie sa stea INAUNTRU, nu peste rezultatul lui withMermaid: acesta
    // compune (...a) => { pluginMermaid(...a); configUtilizator(...a) }, deci al
    // nostru ruleaza al doilea si vede blocul de cod deja randat complet.
    markdown: {
      config: butonRuleaza,
    },
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
        { text: 'Pseudocod', link: '/cpp/pseudocod/elemente-de-baza' },
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
