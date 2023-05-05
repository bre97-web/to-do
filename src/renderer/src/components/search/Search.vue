<template>
    <div
        v-show="input.value.length != 0"
        class="border dark:border-none bg-transparent dark:bg-slate-700 rounded-md px-4 py-2 my-4"
    >
        <Header :input="input.value"></Header>

        <main>
            <Task title="" subtitle="">
                <template #>
                    <ul class="tasks">
                        <li v-for="e in get" :key="e.index">
                            <md-checkbox @click="tasks.moveToBin(e)"></md-checkbox>

                            <div class="desc">
                                <h1>{{ e.title }}</h1>
                                <p>{{ e.subtitle }}</p>
                            </div>

                            <div class="flex flex-row gap-2 py-2 buttonGroup">
                                <md-standard-icon-button @click="tasks.moveToFocus(e)">
                                    <md-icon class="material-icons">favorite</md-icon>
                                </md-standard-icon-button>
                                <md-standard-icon-button @click="push('/Edit', e)">
                                    <md-icon class="material-icons">edit</md-icon>
                                </md-standard-icon-button>
                                <md-standard-icon-button @click="tasks.removeBin(e)">
                                    <md-icon class="material-icons">delete_forever</md-icon>
                                </md-standard-icon-button>
                            </div>
                        </li>
                    </ul>
                </template>
            </Task>

            <CreatorInSearch v-if="get.length === 0" :input="input.value"></CreatorInSearch>
        </main>

        <Footer :get="get"></Footer>
    </div>
</template>

<script lang="ts" setup>
import { computed, reactive } from 'vue'
import { useRouter } from 'vue-router'
import Header from './Header.vue'
import Footer from './Footer.vue'
import Task from '@/components/task/Task.vue'
import useTasks from '@/hooks/useTasks'
import CreatorInSearch from '@/components/CreatorInSearch.vue'
import { Search, SearchType } from '@/assets/js/search'
import { Item } from '@/hooks/useList'

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
var get = computed<Item[]>(() => {
    var lists: any = new Array()
    var results: any = new Array()

    // get TASKS, al of tasks(focus, bin)
    for (let key in tasks.taskList.getValues()) {
        lists.push(tasks.taskList.getValues()[key])
    }
    for (let key in tasks.focusList.getValues()) {
        lists.push(tasks.focusList.getValues()[key])
    }
    for (let key in tasks.binList.getValues()) {
        lists.push(tasks.binList.getValues()[key])
    }

    /**
     * 现在所有的lists获取完毕，将所有的lists中的元素与input进行比较得出最终结果
     */
    for (let key = 0; key < lists.length; key ++) {
        if(lists[key].title.toLowerCase().indexOf(input.value.toLowerCase()) === -1) {
            continue
        }
        results.push(lists[key])
    }

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
