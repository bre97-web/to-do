import { RouteRecordRaw, Router, createRouter, createWebHashHistory } from 'vue-router'

import Index from '@/views/index.vue'
import HomePage from '@/views/homePage.vue'
import Info from '@/views/moreInformation.vue'
import Profile from '@/views/profile.vue'
import Goals from '@/views/goals.vue'
import Dashboard from '@/views/dashboard.vue'
import Group from '@/views/group.vue'
import StartupSetting from '@/views/startupSetting.vue'

const routes: RouteRecordRaw[] = [
    /**
     * 在App组件中显示主面板（Home组件）
     */
    {
        name: 'StartPosition',
        path: '/',
        component: Index,
        redirect: '/home',
        /**
         * 子元素显示在index组件的MainView
         */
        children: [
            /**
             *  首页
             */
            {
                name: 'HomePage',
                path: '/home',
                components: {
                    MainView: HomePage
                }
            },
            /**
             * 关于我
             */
            {
                name: 'Profile',
                path: '/profile',
                components: {
                    MainView: Profile
                }
            },
            /**
             * 分组
             */
            {
                name: 'Collections',
                path: '/collection',
                components: {
                    MainView: Group
                }
            },
            /**
             * Goals
             */
            {
                name: 'Goals',
                path: '/goals',
                components: {
                    MainView: Goals
                }
            },
            /**
             * 用于编辑Task的面板
             */
            {
                path: '/info',
                name: 'Info',
                components: {
                    MainView: Info
                }
            },
            /**
             * 控制中心
             */
            {
                path: '/dashboard',
                name: 'Dashboard',
                components: {
                    MainView: Dashboard
                },
            },
        ]
    },
    /**
     * OOBE阶段的设置面板
     */
    {
        name: 'startupSetting',
        path: '/startupSetting',
        component: StartupSetting
    },
]

const Router: Router = createRouter({
    history: createWebHashHistory(),
    routes,
    linkExactActiveClass: 'active'
})

export default Router
