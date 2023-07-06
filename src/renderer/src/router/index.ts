import { RouteRecordRaw, Router, createRouter, createWebHashHistory } from 'vue-router'

import Home from '@/views/Home.vue'
import HomePage from '@/views/home/HomePage.vue'
import Info from '@/views/home/lib/MoreInformation.vue'
import Me from '@/views/me/Me.vue'
import Helper from '@/views/me/lib/Helper.vue'
import ChooseGoal from '@/views/chooseGoal/ChooseGoal.vue'
import Template from '@/views/chooseGoal/lib/Template.vue'
import TemplateDesc from '@/views/chooseGoal/lib/TemplateDesc.vue'
import Goals from '@/views/goals/Goals.vue'
import Dashboard from '@/views/dashboard/Dashboard.vue'
import Profile from '@/views/dashboard/lib/Profile.vue'
import System from '@/views/dashboard/lib/System.vue'
import Theme from '@/views/dashboard/lib/Theme.vue'
import ShortcutMap from '@/views/dashboard/lib/ShortcutMap.vue'
import Group from '@/views/group/Group.vue'
import StartupSetting from '@/views/startup/StartupSetting.vue'

const routes: RouteRecordRaw[] = [
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
                name: 'HomePage',
                path: '/home',
                components: {
                    MainBoardView: HomePage
                }
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
                            MeInnerBoard: Helper
                        }
                    }
                ]
            },
            {
                name: 'Group',
                path: '/home/group',
                components: {
                    MainBoardView: Group
                }
            },
            {
                path: '/chooseGoal',
                name: 'ChooseGoal',
                components: {
                    MainBoardView: ChooseGoal
                },
                redirect: '/chooseGoal/goalTemplate',
                children: [
                    {
                        path: '/chooseGoal/goalTemplate',
                        name: 'Template',
                        components: {
                            ChooseGoalInnerViewBoard: Template
                        }
                    },
                    {
                        path: '/chooseGoal/templateDesc',
                        name: 'TemplateDesc',
                        components: {
                            ChooseGoalInnerViewBoard: TemplateDesc
                        }
                    }
                ]
            },
            {
                path: '/goals',
                name: 'Goals',
                components: {
                    MainBoardView: Goals
                }
            }
        ]
    },
    {
        path: '/dashboard',
        component: Dashboard,
        redirect: '/dashboard/profile',
        children: [
            {
                path: '/dashboard/profile',
                components: {
                    dashboardView: Profile
                }
            },
            {
                path: '/dashboard/theme',
                components: {
                    dashboardView: Theme
                }
            },
            {
                path: '/dashboard/system',
                components: {
                    dashboardView: System
                }
            },
            {
                path: '/dashboard/shortcutMap',
                components: {
                    dashboardView: ShortcutMap
                }
            }
        ]
    },
    {
        path: '/info',
        name: 'Info',
        component: Info
    },
    {
        name: 'startup',
        path: '/startup',
        component: StartupSetting
    }
]

const Router: Router = createRouter({
    history: createWebHashHistory(),
    routes,
    linkExactActiveClass: 'active'
})

export default Router
