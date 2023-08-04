<template>
    <div class="mx-4 mt-4 mb-12">
        <ul class="flex flex-col md:flex-row flex-wrap gap-2">
            <li class="p-4 border rounded-3xl">
                <Title
                    :title="`Today ${useDate()}, you need to do`"
                    :subtitle="`${targetDateTasks.length} current todos`"
                ></Title>
                <NeedDoTasks></NeedDoTasks>
            </li>
            <li class="p-4 border rounded-3xl">
                <Title :title="`You need to do`" :subtitle="`${store.getAll.length} todos`"></Title>
                <AllTasks></AllTasks>
            </li>
        </ul>
    </div>
</template>

<script setup lang="tsx">
import { useDate } from '@/hooks/useDate'
import { Task, Tasks } from '@/hooks/useTask'
import { useTaskStore } from '@/store/useTaskStore'
import { computed } from 'vue'

const store = useTaskStore()
const targetDateTasks = computed(() => {
    const today = useDate()
    return store.getAll.filter((e) => e.targetDate === today)
})

const Title = ({ title, subtitle }: { title: string; subtitle: string }) => (
    <header>
        <p class="text-xs">{title}</p>
        <h1 class="font-medium">{subtitle}</h1>
    </header>
)

const TaskItem = ({ item }: { item: Task }) => (
    <li class="p-4 rounded-3xl">
        <header>
            <h1>{item.title}</h1>
            <p class="text-xs">Created in {item.createdDate}</p>
        </header>
    </li>
)

const TasksList = ({ element }: { element: Tasks }) => (
    <div>
        <ul class="rounded-3xl flex gap-1 flex-col w-full h-full">
            {element.slice(0, 5).map((e) => (
                <TaskItem item={e}></TaskItem>
            ))}
        </ul>
        {element.length === 0 && (
            <div class="m-4 text-center">
                <md-icon class="text-8xl font-bold shake">waving_hand</md-icon>
                <p>You compeleted all todos</p>
            </div>
        )}
    </div>
)

const AllTasks = () => <TasksList element={store.getAll}></TasksList>
const NeedDoTasks = () => <TasksList element={targetDateTasks.value}></TasksList>
</script>
