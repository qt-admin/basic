import '@unocss/reset/tailwind.css'
import 'virtual:uno.css'
import { createApp } from 'vue'
import { createPinia } from 'pinia'
import ElementPlus from 'element-plus'
import '@/styles/index.scss'
import * as ElementPlusIconsVue from '@element-plus/icons-vue'
import App from './App.vue'
import router from './router'
import { useGlobalDirectives } from '@/directives'

// 引入 MockJS，如不需要将下一行注释即可
import '@/utils/mock'

const app = createApp(App)
// 注册element-plus所有图标
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component)
}

useGlobalDirectives(app)

app.use(createPinia())
app.use(router)
app.use(ElementPlus)

app.mount('#app')
