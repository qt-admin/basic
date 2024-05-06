import type { App } from 'vue'
import { scrollbar } from 'qt-vue-tools/directives'

const useGlobalDirectives = (app: App): void => {
  // scrollbar.install(app)
  app.directive('scrollbar', scrollbar)
}

export {
  useGlobalDirectives
}
