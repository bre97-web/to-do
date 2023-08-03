import { RouteRecordRaw, Router, createRouter, createWebHashHistory } from 'vue-router'

import Index from '@/views/index.vue'
import HomePage from '@/views/homePage.vue'
import Info from '@/views/moreInformation.vue'
import Me from '@/views/me.vue'
import Goals from '@/views/goals.vue'
import Dashboard from '@/views/dashboard.vue'
import Profile from '@/views/dashboard/profile.vue'
import System from '@/views/dashboard/system.vue'
import Theme from '@/views/dashboard/theme.vue'
import ShortcutMap from '@/views/dashboard/shortcutMap.vue'
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
                name: 'Me',
                path: '/me',
                components: {
                    MainView: Me
                }
            },
            /**
             * 分组
             */
            {
                name: 'Group',
                path: '/group',
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
    /**
     * 控制中心
     */
    {
        path: '/dashboard',
        component: Dashboard,
        redirect: '/dashboard/profile',
        children: [
            {
                path: '/dashboard/profile',
                components: {
                    DashboardView: Profile
                }
            },
            {
                path: '/dashboard/theme',
                components: {
                    DashboardView: Theme
                }
            },
            {
                path: '/dashboard/system',
                components: {
                    DashboardView: System
                }
            },
            {
                path: '/dashboard/shortcutMap',
                components: {
                    DashboardView: ShortcutMap
                }
            }
        ]
    },
]

const Router: Router = createRouter({
    history: createWebHashHistory(),
    routes,
    linkExactActiveClass: 'active'
})

export default Router
