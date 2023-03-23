
// Vue
import { createApp } from 'vue'
import App from './App.vue'

// Store
import Store from './store/index'

import Router from './router/index'

/**
 * Tailwindcss
 */
import './assets/index.css'

/**
 * Google's Material Design Icons
 */
import 'material-icons/iconfont/material-icons.css'

// Import Google's Material Design 3 Web Components
// Import Google's formatted js
/**
 * Please run:
 * npm run md
 */
import './assets/bundle'


const app = createApp(App)
app.use(Store).use(Router).mount('#app')