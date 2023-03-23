<template>
    <div>
        <Task title="To-Do" subtitle="Today's Tasks">
            <template #>
                <li v-for="e in list.getValues()">
                    <h1>
                        {{ e.title }}
                    </h1>
                    <p>
                        {{ e.subtitle }}
                    </p>
                </li>
            </template>
        </Task>
    </div>
</template>

<script setup>
import Task from '../components/Task.vue'
import useList from '../hooks/useList'

const list = useList()
</script>

<style scoped>

</style>