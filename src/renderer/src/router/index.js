import { createRouter, createWebHashHistory } from "vue-router"

import Home   from '@/views/Home.vue'
import HomePage from '@/views/MainBoardView/HomePage.vue'
import Info   from '../views/MainBoardView/MoreInformation.vue'
import Me     from '@/views/Me.vue'
import Helper from '@/views/Helper.vue'
import Editor from '@/views/Editor.vue'

const routes = [

    /**
     * 在App组件中显示主面板（Home组件）
     */
    {
        name: 'Home',
        path: '/',
        component: Home,
        redirect: '/home',
        children: [
            {
                name: HomePage,
                path: '/home',
                components: {
                    MainBoardView: HomePage
                },
                children: [
                    {
                        path: '/Edit',
                        name: Editor,
                        components: {
                            HomePageInnerBoardView: Editor
                        }
                    },
                    {
                        path: '/info',
                        name: Info,
                        components: {
                            HomePageInnerBoardView: Info
                        }
                    },
                ]
            },
            {
                name: 'Me',
                path: '/me',
                components: {
                    MainBoardView: Me
                },
                children: [
                    {
                        name: 'Helper',
                        path: '/helper',
                        components: {
                            MeInnerBoard: Helper,
                        }
                    },
                ],
            },
        ]
    },
]

const Router = createRouter({
    history: createWebHashHistory(),
    routes,
    linkExactActiveClass: 'active',
})

export default Router
