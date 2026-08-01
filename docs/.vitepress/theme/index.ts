import DefaultTheme from 'vitepress/theme'
import type { Theme } from 'vitepress'
import ClassIndex from './ClassIndex.vue'
import LeeVisual from './LeeVisual.vue'
import DreptunghiVisual from './DreptunghiVisual.vue'

export default {
  extends: DefaultTheme,
  enhanceApp({ app }) {
    app.component('ClassIndex', ClassIndex)
    app.component('LeeVisual', LeeVisual)
    app.component('DreptunghiVisual', DreptunghiVisual)
  },
} satisfies Theme
