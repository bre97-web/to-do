import { createRouter, createWebHashHistory } from "vue-router"

const routes = [
    {
        name: 'Tasks',
        path: '/',
        component: () => import('../views/Tasks.vue'),
        meta: {
            keepAlive: true,
        }
    },
    {
        name: 'Me',
        path: '/me',
        component: () => import('../views/Me.vue'),
        meta: {
            keepAlive: true,
        }
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