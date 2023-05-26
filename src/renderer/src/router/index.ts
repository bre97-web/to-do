import { RouteRecordRaw, Router, createRouter, createWebHashHistory } from "vue-router"

import Home   from '@/views/Home.vue'
import HomePage from '@/views/home/HomePage.vue'
import Info   from '@/views/home/info/MoreInformation.vue'
import Me     from '@/views/me/Me.vue'
import Helper from '@/views/me/helper/Helper.vue'
import ChooseGoal from '@/views/chooseGoal/ChooseGoal.vue'
import Template from "@/views/chooseGoal/goalTemplate/Template.vue"
import TemplateDesc from "@/views/chooseGoal/goalTemplate/goalTemplateDesc/TemplateDesc.vue"
import Goals from "@/views/goals/Goals.vue"
import Overview from '@/views/home/overview/Overview.vue'
import Recycle from '@/views/home/recycle/Recycle.vue'
import Focus from '@/views/home/focus/Focus.vue'
import Dashboard from '@/views/dashboard/Dashboard.vue'
import TestPage from '@/views/test/TestPage.vue'

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
                redirect: '/home/overview',
                components: {
                    MainBoardView: HomePage
                },
                children: [
                    {
                        path: '/home/overview',
                        name: 'Overview',
                        components: {
                            HomePageInnerBoardView: Overview
                        }
                    },
                    {
                        path: '/home/focus',
                        name: 'Focus',
                        components: {
                            HomePageInnerBoardView: Focus
                        }
                    },
                    {
                        path: '/home/recycle',
                        name: 'Recycle',
                        components: {
                            HomePageInnerBoardView: Recycle
                        }
                    },
                    {
                        path: '/info',
                        name: 'Info',
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
                        },
                    },
                    {
                        path: '/chooseGoal/templateDesc',
                        name: 'TemplateDesc',
                        components: {
                            ChooseGoalInnerViewBoard: TemplateDesc
                        },
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
    },
    {
        name: 'Test',
        path: '/test',
        component: TestPage,
    }
]

const Router:Router = createRouter({
    history: createWebHashHistory(),
    routes,
    linkExactActiveClass: 'active',
})

export default Router
