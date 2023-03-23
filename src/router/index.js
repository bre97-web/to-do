import { createRouter, createWebHashHistory } from "vue-router"

const routes = [
    {
        path: '/',
        component: () => import('../views/Tasks.vue'),
    },
]

const Router = createRouter({
    history: createWebHashHistory(),
    routes,
    linkExactActiveClass: 'active',
})

export default Router