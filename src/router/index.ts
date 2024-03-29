import { RouteRecordRaw, Router, createRouter, createWebHashHistory } from 'vue-router'

import Index from '../pages/index.vue'
import Settings from '../pages/settings.vue'

const routes: RouteRecordRaw[] = [
    {
        path: '/',
        component: Index
    },
    {
        path: '/settings',
        component: Settings
    }
]

const Router: Router = createRouter({
    history: createWebHashHistory(),
    routes,
    linkExactActiveClass: 'active'
})

export default Router
