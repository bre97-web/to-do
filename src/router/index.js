import { createRouter, createWebHashHistory } from "vue-router"

const routes = [
    {
        path: '/',
        component: () => import('../views/Tasks.vue'),
    },
    {
        path: '/Edit',
        component: () => import('../views/Editor.vue'),
        props: r => ({
            task: r.query.task
        })
    },
]

const Router = createRouter({
    history: createWebHashHistory(),
    routes,
    linkExactActiveClass: 'active',
})

export default Router