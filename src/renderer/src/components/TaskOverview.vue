<template>
    <div class="mx-4 mt-4 mb-12">
        <ul class="space-y-8">
            <li class="p-4 w-full border rounded-3xl">
                <Title
                    :title="`Today ${useDate()}, you need to do`"
                    :subtitle="`${targetDateTasks.length} current todos`"
                ></Title>
                <NeedDoTasks></NeedDoTasks>
            </li>
            <li class="p-4 w-full border rounded-3xl">
                <Title :title="`You need to do`" :subtitle="`${tasks.length} todos`"></Title>
                <AllTasks></AllTasks>
            </li>
        </ul>
    </div>
</template>

<script setup lang="tsx">
import { useDate } from '@/hooks/useDate'
import { Item, Items } from '@/hooks/useItem'
import { useTaskStore } from '@/store/useTaskStore'
import { computed } from 'vue'

const store = useTaskStore()
const tasks = computed(() => [...store.getNormal, ...store.getFocus])
const targetDateTasks = computed(() => {
    const today = useDate()
    return tasks.value.filter((e) => e.targetDate === today)
})

const Title = ({ title, subtitle }: { title: string; subtitle: string }) => (
    <header>
        <p class="text-xs">{title}</p>
        <h1 class="font-medium">{subtitle}</h1>
    </header>
)

const Task = ({ item }: { item: Item }) => (
    <li class="elevation p-4 rounded-3xl">
        <md-elevation></md-elevation>
        <header>
            <h1>{item.title}</h1>
            <p class="text-xs">Created in {item.createdDate}</p>
        </header>
    </li>
)

const TasksList = ({ element }: { element: Items }) => (
    <div>
        <ul class="rounded-3xl flex gap-2 flex-col xl:flex-row xl:items-start xl:justify-start w-full h-full">
            {element.slice(0, 5).map((e) => (
                <Task item={e}></Task>
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

const AllTasks = () => <TasksList element={tasks.value}></TasksList>
const NeedDoTasks = () => <TasksList element={targetDateTasks.value}></TasksList>
</script>
