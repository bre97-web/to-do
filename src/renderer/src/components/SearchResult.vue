<template>
    <div v-show="hasInput" class="px-4 py-2">
        <header class="flex flex-row items-end justify-start gap-2">
            <h1 class="text-onBackground">Search</h1>
            <h1 class="text-onBackground underline underline-offset-1">
                <mark>{{ searchStore.getKeyword }}</mark>
            </h1>
        </header>

        <main>
            <!-- 关键字搜索相关设置 -->
            <div>
                <!-- 匹配项 -->
                <ul class="flex flex-col gap-1">
                    <template v-for="(e, index) in searchJson">
                        <li
                            v-if="e.keyword.includes(searchStore.getKeyword)"
                            :key="index"
                            class="surfaceContainerHigh px-4 py-2 rounded-md surface"
                            @click="router.push(e.path)"
                        >
                            <md-elevation></md-elevation>
                            <h1 class="text-onBackground">
                                {{ e.title }}
                            </h1>
                        </li>
                    </template>
                </ul>
            </div>

            <template v-if="getTasks.length !== 0">
                <Task>
                    <md-list class="tasks">
                        <div v-for="e in getTasks" :key="e.index">
                            <md-list-item :headline="e.title" :supportting-text="e.subtitle">
                                <div slot="end">
                                    <md-standard-icon-button @click="push('/info', e)">
                                        <md-icon>more</md-icon>
                                    </md-standard-icon-button>
                                </div>
                            </md-list-item>
                            <md-divider></md-divider>
                        </div>
                    </md-list>
                </Task>
            </template>
            <template v-else>
                <p class="text-right font-bold text-onBackground">
                    {{ searchStore.getKeyword }} is not found
                </p>
                <div class="flex justify-end items-center gap-2">
                    <md-tonal-button @click="add">Create</md-tonal-button>
                </div>
            </template>
        </main>

        <footer>
            <p class="text-right text-onBackground">Accumulate {{ getTasks.length }} results</p>
        </footer>
    </div>
</template>

<script lang="tsx" setup>
import { computed } from 'vue'
import { useRouter } from 'vue-router'
import Task from '@/components/Task.vue'
import { Items, useItem } from '@/hooks/useItem'
import { useTaskStore, TASKS_TYPE } from '@/store/useTaskStore'
import searchTemplate from '@/assets/resources/json/searchTarget.json'
import { useSearchStore } from '@/store/useSearchStore'

/**
 * searchStore.getKeyword是此组件的关键，组件依赖此属性值来搜索结果
 * 搜索的目标是taskStore和searchJson
 */
const searchStore = useSearchStore()
const taskStore = useTaskStore()
/**
 * searchJson来自本地的searchTarget.json
 * 它提供了一套预制的搜索模板
 */
const searchJson = searchTemplate

/**
 * template需要在searchStore.getKeyword的情况下显示DOM
 * 此计算属性在keyword不为空的情况下返回真
 */
const hasInput = computed(() => searchStore.getKeyword.length !== 0)

/**
 * 获取所有的Task元素
 */
const getTasks = computed<Items>(() => {
    var results: Items = []
    var lists: Items = [
        ...taskStore.tasks.focus,
        ...taskStore.tasks.normal,
        ...taskStore.tasks.recycle
    ]

    /**
     * 现在所有的lists获取完毕，将所有的lists中的元素与input进行比较得出最终结果
     */
    lists.forEach((e) => {
        if (e.title.toLowerCase().includes(searchStore.getKeyword.toLowerCase())) {
            results.push(e)
        }
    })

    return results
})
const add = (): any => {
    taskStore.push(
        useItem({
            title: searchStore.getKeyword
        }),
        TASKS_TYPE.NORMAL
    )
}

/**
 * 用于edit功能的路由
 */
const router = useRouter()
const push = (path: string, e: any) =>
    router.push({
        path: path,
        query: {
            task: JSON.stringify(e)
        }
    })
</script>
