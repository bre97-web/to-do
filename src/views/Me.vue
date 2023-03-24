<template>
    <div>
        <header>
            <div class="flex flex-col">
                <p>Hello</p>
                <h1 @click="open" class="underline underline-offset-1 hover:underline-offset-4">{{ info.name }}</h1>
            </div>
        </header>

        <main class="mt-12">
            <div>
                <header>
                    <h1>Tasks</h1>
                </header>
                <main class="py-2">
                    <ul>
                        <li class="list">
                            待办
                            {{ tasks.taskList.getValues().length }}
                            <div class="list-inner-page">
                                <ul class="tasks">
                                    <li v-for="e in tasks.taskList.getValues()">{{ e.title }}</li>
                                </ul>
                            </div>
                        </li>

                        <li class="list">
                            已完成
                            {{ tasks.binList.getValues().length }}
                            <div class="list-inner-page">
                                <ul class="tasks">
                                    <li v-for="e in tasks.binList.getValues()">{{ e.title }}</li>
                                </ul>
                            </div>
                        </li>

                        <li class="list">
                            固定
                            {{ tasks.focusList.getValues().length }}
                            <div v-if="tasks.focusList.getValues().length != 0" class="list-inner-page">
                                <ul class="tasks">
                                    <li v-for="e in tasks.focusList.getValues()">{{ e.title }}</li>
                                </ul>
                            </div>
                        </li>
                    </ul>
                </main>
            </div>
        </main>

        <md-dialog :open="dialogOpen">
            <div slot="header">
                <h1>Rename</h1>
            </div>

            <div class="flex flex-col gap-2">
                <md-filled-text-field :value="info.name" @input="info.name = $event.target.value" label="Name"></md-filled-text-field>
            </div>

            <md-text-button @click="cancel" label="Cancel" slot="footer"></md-text-button>
            <md-filled-button @click="submit" label="OK" slot="footer"></md-filled-button>
        </md-dialog>
    </div>
</template>

<script setup>
import {
    ref, reactive
} from 'vue'
import useTasks from '../hooks/useTasks'


name = 'Me'


/**
 * 关于打开与关闭dialog的操作和业务逻辑
 */
var dialogOpen = ref(false)
const info = reactive(JSON.parse(localStorage.getItem('personal-info')) || {
    name: 'Click me to rename',
})
const submit = () => {
    localStorage.setItem('personal-info', JSON.stringify(info))
    close()
}
const cancel = () => {
    info.name = JSON.parse(localStorage.getItem('personal-info')).name
    close()
}
const open = () => dialogOpen.value = true
const close = () => dialogOpen.value = false


/**
 * 用于获取所有的任务
 */
const tasks = useTasks()


</script>

<style scoped>
    ul {
        @apply flex flex-row flex-wrap gap-2 font-bold;
    }
    ul li.list {
        @apply bg-blue-500 dark:bg-sky-900 text-white rounded-md p-4 relative;
    }
    ul li.list .list-inner-page {
        @apply z-40 hidden px-4 py-2 absolute left-16 bg-white dark:bg-gray-700 text-black dark:text-white shadow rounded-md;
    }
    ul li.list .list-inner-page:hover,
    ul li.list:hover .list-inner-page {
        @apply block;
    }
</style>