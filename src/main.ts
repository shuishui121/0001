import { createApp } from 'vue'
import { createPinia } from 'pinia'
import './style.css'
import App from './App.vue'
import router from './router'
import i18n, { getLocale } from './i18n'

const app = createApp(App)
const pinia = createPinia()

document.documentElement.lang = getLocale()

app.use(pinia)
app.use(router)
app.use(i18n)

app.mount('#app')
