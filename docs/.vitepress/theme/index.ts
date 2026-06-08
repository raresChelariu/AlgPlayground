import DefaultTheme from 'vitepress/theme'
import type { Theme } from 'vitepress'
import ClassIndex from './ClassIndex.vue'

export default {
  extends: DefaultTheme,
  enhanceApp({ app }) {
    app.component('ClassIndex', ClassIndex)
  },
} satisfies Theme
