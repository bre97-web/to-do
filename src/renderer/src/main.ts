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
 * Google's Material Design Icons
 */
import 'material-icons/iconfont/material-icons.css'

/**
 * Material Web CSS
 */
import '@/assets/css/material-web-style.css'

// Import Google's Material Design 3 Web Components
// Import Google's formatted js
/**
 * Please run:
 * npm run md
 */
import '@/assets/js/out/bundle'

const app = createApp(App)
 app.use(Router)
    .mount('#app')

app.config.performance = true