import { createRouter, createWebHashHistory } from "vue-router"

import Tasks  from '@/views/Tasks.vue'
import Me     from '@/views/Me.vue'
import Helper from '@/views/Helper.vue'
import Editor from '@/views/Editor.vue'

const routes = [
    {
        name: 'Tasks',
        path: '/',
        component: Tasks
    },
    {
        name: 'Me',
        path: '/me',
        component: Me,
        children: [
            {
                name: 'Helper',
                path: '/helper',
                components: {
                    Me: Helper,
                }
            },
        ],
    },
    {
        path: '/Edit',
        component: Editor,
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