// Vue
import { createApp } from 'vue'
import App from './App.vue'

/**
 * Vue-Router
 */
import Router from './router/index'

/**
 * Tailwindcss
 */
import './assets/index.css'

/**
 * Google's Material Design
 */
import 'material-symbols/outlined.css'
import '@fontsource/noto-sans'
import '@material/web/all'

/**
 * Pinia
 */
import { createPinia } from 'pinia'
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'

const pinia = createPinia()
pinia.use(piniaPluginPersistedstate)

const app = createApp(App)
app.use(pinia).use(Router)
app.mount('#app')
