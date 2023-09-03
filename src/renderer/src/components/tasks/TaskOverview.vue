<template>
    <div class="mx-4 mt-4 mb-12">
        <ul class="flex flex-col md:flex-row flex-wrap gap-2">
            <li class="p-4 rounded-3xl bg-[var(--md-sys-color-surface-container-low)]">
                <TitleLarge>{{ `${targetDateTasks.length} target todos` }}</TitleLarge>
                <NeedDoTasks></NeedDoTasks>
            </li>
            <li class="p-4 rounded-3xl bg-[var(--md-sys-color-surface-container-low)]">
                <TitleLarge>{{ `${store.getTasks.length} todos` }}</TitleLarge>
                <AllTasks></AllTasks>
            </li>
        </ul>
    </div>
</template>

<script setup lang="tsx">
import { useDate } from '@/hooks/useDate'
import { Task, Tasks } from '@/hooks/useTask'
import { setShareItem } from '@/components/aside/taskProvider';
import { useTaskStore } from '@/store/useTaskStore'
import { computed } from 'vue'

const store = useTaskStore()
const targetDateTasks = computed(() => {
    const today = useDate()
    return [...store.getTasks.filter(e => e.progressStatus === 'pinned'), ...store.getTasks.filter(e => e.progressStatus === 'processing')].filter((e) => e.targetDate === today)
})

const TaskItem = ({ item }: { item: Task }) => (
    <li class="p-4 rounded-3xl relative" onClick={() => setShareItem(item)}>
        <md-ripple></md-ripple>
        <header>
            <p class="label-large">{item.title}</p>
            <p class="body-small">Created in {item.createdDate}</p>
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
                <p class="body-medium italic">You compeleted all todos</p>
            </div>
        )}
    </div>
)

const AllTasks = () => <TasksList element={[...store.getTasks.filter(e => e.progressStatus === 'pinned'), ...store.getTasks.filter(e => e.progressStatus === 'processing')]}></TasksList>
const NeedDoTasks = () => <TasksList element={targetDateTasks.value}></TasksList>
</script>
