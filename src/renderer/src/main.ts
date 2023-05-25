// Vue
import { createApp } from 'vue'
import App from '@/App.vue'

/**
 * Vue-Router
 */
import Router from '@/router/index'

/**
 * Tailwindcss
 */
import '@/assets/css/index.css'

/**
 * Google's Material Design
 */
import 'material-icons/iconfont/material-icons.css'
import '@/assets/css/material-web-style.css'
import "@fontsource/roboto/unicode.json"
import "@fontsource/noto-sans-sc/unicode.json"

/**
 * Pinia
 */
import { createPinia } from 'pinia'
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'

const pinia = createPinia()
pinia.use(piniaPluginPersistedstate)

const app = createApp(App)
 app.use(Router)
    .use(pinia)
    .mount('#app')

app.config.performance = true