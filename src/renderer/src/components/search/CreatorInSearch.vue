<template>
    <div>
        <header class="text-right">
            <h1>{{ props.input }} is not found</h1>
        </header>

        <main class="flex justify-end">
            <div class="flex items-center gap-2">
                <md-tonal-button @click="add">Create</md-tonal-button>
            </div>
        </main>
    </div>
</template>

<script lang="ts" setup>
import { useTasks } from '@/hooks/useTasks'

/**
 * 由父组件提供搜索词，它应该是一个响应式对象
 */
const props = defineProps<{
    input: string
}>()

/**
 * 创建TASKS元素
 */
const tasks = useTasks()
const add = () => {
    console.log(props.input);
    
    tasks.get().taskList.push({
        title: props.input,
        subtitle: '',
        tags: [],
        note: '',
        steps: [{
            text: '',
            done: false
        }]
    })
}
</script>
