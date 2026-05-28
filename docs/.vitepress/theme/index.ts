import DefaultTheme from 'vitepress/theme'
import BinSearchPlot from './components/BinSearchPlot.vue'

export default {
  extends: DefaultTheme,
  enhanceApp({ app }) {
    app.component('BinSearchPlot', BinSearchPlot)
  },
}
