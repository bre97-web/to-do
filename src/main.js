
// Vue
import { createApp } from 'vue'
import App from './App.vue'

// Store
import store from './store/index'

// TailwindCSS
import './assets/index.css'

// Material Icons
import 'material-icons/iconfont/material-icons.css'

const vm = createApp(App)
vm.use(store).mount('#app')