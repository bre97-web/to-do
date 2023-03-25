<template>
    <div>
        <header class="text-right">
            <h2>
                {{ props.input }} is not found
            </h2>
        </header>

        <main class="flex justify-end">
            <div class="flex items-center gap-2">
                <md-tonal-button @click="add" label="Create"></md-tonal-button>
            </div>
        </main>
    </div>
</template>

<script setup>
 import useTasks from '../hooks/useTasks'

/**
 * 由父组件提供搜索词，它应该是一个响应式对象
 */
const props = defineProps(['input'])


/**
 * 创建TASKS元素
 */
const tasks = useTasks()
const add = () => {
    tasks.taskList.push({
        title: props.input,
        subtitle: '',
    })
}
</script>

<style scoped>

</style>