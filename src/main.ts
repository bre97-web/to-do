// Vue
import { createApp } from 'vue'
import App from './App.vue'

/**
 * Vue-Router
 */
import { globalRouter } from './router/index'

/**
 * Tailwindcss
 */
import './styles/scrollbar.css'
import './styles/tailwind.css'

/**
 * Google's Material Design
 */
import '@fontsource/noto-sans'
import '@material/web/all'
import 'material-symbols/outlined.css'

/**
 * Services
 */
import { MaterialThemeConfigurationService, MaterialThemeConfigurationServiceSymbol } from './services/material-theme-configuration.service'
import { MediaQueryService, MediaQueryServiceSymbol } from './services/media-query.service'
import { NavigationService, NavigationServiceSymbol } from './services/navigation.service'
import { TodoListService, TodoListServiceSymbol } from './services/todo-list.service'
import { TodoTabsService, TodoTabsServiceSymbol } from './services/todo-tabs.service'

const app = createApp(App)
app
    .use(globalRouter)
    .provide(TodoListServiceSymbol, new TodoListService(TodoListService.loadChanges()))
    .provide(TodoTabsServiceSymbol, new TodoTabsService(TodoTabsService.loadChanges()))
    .provide(MaterialThemeConfigurationServiceSymbol, new MaterialThemeConfigurationService(MaterialThemeConfigurationService.loadChanges()))
    .provide(NavigationServiceSymbol, new NavigationService())
    .provide(MediaQueryServiceSymbol, new MediaQueryService())
    .mount('#app')
