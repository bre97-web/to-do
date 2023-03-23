import { createRouter, createWebHashHistory } from "vue-router"

const routes = [
    {
        path: '/',
        component: () => import('../views/home.vue'),
    },
    {
        path: '/menu',
        component: () => import('../views/menu.vue'),
    },
    {
        path: '/settings',
        component: () => import('../views/settings.vue'),
    },
    {
        path: '/create',
        component: () => import('../views/create.vue')
    },
    {
        path: '/search',
        component: () => import('../views/fullSearch.vue'),
    },
    {
        path: '/pin',
        component: () => import('../views/pin.vue'),
    },
    {
        path: '/done',
        component: () => import('../views/done.vue'),
    },
    {
        path: '/helper',
        component: () => import('../views/helper.vue'),
    },
    {
        path: '/edit',
        component: () => import('../views/edit.vue'),
        props($route) {
            return {
                task: JSON.parse($route.query.task),
            }
        }
    },
]

const Router = createRouter({
    history: createWebHashHistory(),
    routes,
    linkExactActiveClass: 'active',
})

export default Router