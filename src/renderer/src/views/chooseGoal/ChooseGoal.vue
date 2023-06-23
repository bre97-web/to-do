<template>
    <div class="fixedWindow bg-background top-0 left-0 w-screen h-screen">
        <div class="relative h-screen md:h-full md:max-w-2xl lg:max-w-4xl mx-auto p-4 md:pt-12">
            <header>
                <h1>Goals</h1>
                <p></p>
            </header>

            <main class="overflow-y-scroll p-2 h-4/5 md:max-h-screen my-8">
                <router-view v-slot="{ Component }" name="ChooseGoalInnerViewBoard">
                    <component :is="Component" :currentIndex="currentIndex" :setCurrentIndex="setCurrentIndex" :goalTemplates="goalTemplates"></component>
                </router-view>
            </main>

            <!-- Back to /home -->
            <nav class="absolute bottom-4 right-4 flex justify-end items-center gap-2">
                <md-text-button 
                    @click="() => {
                        router.push('/goals')
                    }"
                >Close</md-text-button>
                <md-text-button :disabled="router.currentRoute.value.path === '/chooseGoal/goalTemplate'"  @click="last">Previous</md-text-button>
                <md-tonal-button v-if="router.currentRoute.value.path === '/chooseGoal/goalTemplate'" :disabled="currentIndex === -1" @click="next">Next</md-tonal-button>
                <md-tonal-button v-else :disabled="currentIndex === -1" @click="create">Done</md-tonal-button>
            </nav>
        </div>
    </div>
</template>

<script lang="ts" setup>
import { useRouter } from 'vue-router'
import { useGoal, useGoals } from '@/hooks/useList/lib/useGoal'
import { ref } from 'vue'
import template from '@/views/chooseGoal/goalTemplate/lib/template.json'

import '@material/web/button/text-button'
import '@material/web/button/tonal-button'


const goalTemplates = template

const router = useRouter()

/**
 * currentIndex是当前选择的Goal模板索引
 * 默认为-1（没有选择）
 */
const currentIndex = ref(-1)
const setCurrentIndex = (index: number) => currentIndex.value = index
/**
 * 根据currentIndex值作为goalTemplates的索引，路由到选择的goal模板的详细信息界面
 */
const next = () => {
    if(currentIndex.value === -1) {
        return undefined
    }
    router.push({
        path: '/chooseGoal/templateDesc',
        query: {
            value: JSON.stringify({
                title: '模板',
                goal: goalTemplates[currentIndex.value]
            })
        }
    })
}
/**
 * 用于上一步按钮
 */
const last = () => router.back()
/**
 * 将选择的goal模板保存到全局BLOBAL_GOALS中
 */
const create = () => {
    var goals = useGoals()

    goalTemplates[currentIndex.value].forEach(e => goals.push(useGoal(e)))

    getGlobalGoalsList().push(goals.get())

    router.push('/goals')
}
</script>
