<template>
    <div
        v-show="input.value.length != 0"
        class="border dark:border-none bg-transparent dark:bg-slate-800 rounded-md px-4 py-2 my-4"
    >
        <Header :input="input.value"></Header>

        <main>
            <Task title="" subtitle="">
                <template #>
                    <md-list class="tasks">
                        <div v-for="e in get" :key="e.index">
                            <md-list-item :headline="e.title" :supporttingText="e.subtitle">
                                <!-- <md-checkbox @click="tasks.moveTo(e, )" slot="start"></md-checkbox> -->

                                <div slot="end">
                                    <!-- <md-standard-icon-button @click="tasks.moveToFocus(e)">
                                        <md-icon class="material-icons">favorite</md-icon>
                                    </md-standard-icon-button> -->
                                    <md-standard-icon-button @click="push('/Edit', e)">
                                        <md-icon class="material-icons">edit</md-icon>
                                    </md-standard-icon-button>
                                    <!-- <md-standard-icon-button @click="tasks.removeBin(e)">
                                        <md-icon class="material-icons">delete_forever</md-icon>
                                    </md-standard-icon-button> -->
                                </div>
                            </md-list-item>
                            <md-divider></md-divider>
                        </div>
                    </md-list>
                </template>
            </Task>

            <CreatorInSearch v-if="get.length === 0" :input="input.value"></CreatorInSearch>
        </main>

        <Footer :get="get"></Footer>
    </div>
</template>

<script lang="tsx" setup>
import { computed, reactive } from 'vue'
import { useRouter } from 'vue-router'
import { Header } from './lib/Header'
import { Footer } from './lib/Footer'
import Task from '@/components/task/Task.vue'
import { useTasks } from '@/hooks/useTasks'
import { CreatorInSearch } from '@/components/search/lib/CreatorInSearch'
import { Search, SearchType } from '@/assets/js/search'
import { Items } from '@/hooks/useList'

/**
 * 由search.js提供搜索词，它应该转变为一个响应式对象
 * 使用时请带上.value
 */
var searchInput = Search()
const input = reactive<SearchType>(searchInput.get())

/**
 * 使用tasks并获取所有的元素
 */
const tasks = useTasks()
var get = computed<Items>(() => {
    var results: Items = new Array()
    var lists: Items = Array.from([
        ...tasks.get().taskList.get(), 
        ...tasks.get().focusList.get(),
        ...tasks.get().binList.get()
    ])

    /**
     * 现在所有的lists获取完毕，将所有的lists中的元素与input进行比较得出最终结果
     */
    lists.forEach(e => {
        if(e.title.toLowerCase().indexOf(input.value.toLowerCase()) !== -1) {
            results.push(e)
        }
    })

    return results
})

/**
 * 用于edit功能的路由
 */
const router = useRouter()
const push = (path: string, e: any) => router.push({
    path: path,
    query: {
        task: JSON.stringify(e) 
    }
})
</script>
