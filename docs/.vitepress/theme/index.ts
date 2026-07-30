import DefaultTheme from 'vitepress/theme'
import type { Theme } from 'vitepress'
import ClassIndex from './ClassIndex.vue'
import LeeVisual from './LeeVisual.vue'

export default {
  extends: DefaultTheme,
  enhanceApp({ app }) {
    app.component('ClassIndex', ClassIndex)
    app.component('LeeVisual', LeeVisual)
  },
} satisfies Theme
