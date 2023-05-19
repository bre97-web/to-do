import { RouteRecordRaw, Router, createRouter, createWebHashHistory } from "vue-router"

import Home   from '@/views/Home.vue'
import HomePage from '@/views/home/HomePage.vue'
import Info   from '@/views/home/info/MoreInformation.vue'
import Me     from '@/views/home/me/Me.vue'
import Helper from '@/views/home/me/helper/Helper.vue'
import Editor from '@/views/home/edit/Editor.vue'
import ChooseGoal from '@/views/home/chooseGoal/ChooseGoal.vue'
import Template from "@/views/home/chooseGoal/goalTemplate/Template.vue"
import TemplateDesc from "@/views/home/chooseGoal/goalTemplate/goalTemplateDesc/TemplateDesc.vue"
import Goals from "@/components/goal/Goals.vue"

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
                components: {
                    MainBoardView: HomePage
                },
                children: [
                    {
                        path: '/Edit',
                        name: 'Editor',
                        components: {
                            HomePageInnerBoardView: Editor
                        }
                    },
                    {
                        path: '/info',
                        name: 'Info',
                        components: {
                            HomePageInnerBoardView: Info
                        }
                    },
                    {
                        path: '/chooseGoal',
                        name: 'ChooseGoal',
                        components: {
                            HomePageInnerBoardView: ChooseGoal
                        },
                        redirect: '/chooseGoal/goalTemplate',
                        children: [
                            {
                                path: '/chooseGoal/goalTemplate',
                                name: 'Template',
                                components: {
                                    ChooseGoalViewBoard: Template
                                },
                            },
                            {
                                path: '/chooseGoal/templateDesc',
                                name: 'TemplateDesc',
                                components: {
                                    ChooseGoalViewBoard: TemplateDesc
                                },
                            }
                        ]
                    }
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
                path: '/goals',
                name: 'Goals',
                components: {
                    MainBoardView: Goals
                }
            }
        ]
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
