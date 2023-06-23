<template>
    <div class="bg-background mx-4 mt-4">
        <ul class="space-y-8">
            <li>
                <Title :title="`Today ${useDate()}, you need to do`" :subtitle="`${targetDateTasks.length} current todos`"></Title>
                <NeedDoTasks></NeedDoTasks>
            </li>
            <li>
                <Title :title="`You need to do`" :subtitle="`${tasks.length} todos`"></Title>
                <AllTasks></AllTasks>
            </li>


        </ul>
    </div>
</template>

<script setup lang="tsx">
import { useDate } from '@/hooks/useDate';
import { Item, Items } from '@/hooks/useList/lib/useItem';
import { useTaskStore } from '@/store';
import '@material/web/elevation/elevation'
import '@material/web/icon/icon'
import { computed } from 'vue';

const store = useTaskStore()
const tasks = computed(() => [...store.getNormal, ...store.getFocus])
const targetDateTasks = computed(() => {
    const today = useDate()
    return tasks.value.filter(e => e.targetDate === today)
})

const Title = ({title, subtitle}: {
    title: string,
    subtitle: string
}) => (
    <header>
        <p class="text-xs">{ title }</p>
        <h1>{ subtitle }</h1>
    </header>
)


const Task = ({item}: {
    item: Item
}) => (
    <li class="elevation rounded-3xl p-4 text-onSurface surfaceContainer">
        <md-elevation></md-elevation>
        <header>
            <h1>{ item.title }</h1>
            <p class="text-xs">Created in { item.createdDate }</p>
        </header>
    </li>
)

const TasksList = ({element}: {
    element: Items
}) => (
    <div>
        <ul class="surface rounded-3xl space-y-2 xl:flex">
            {
                element.slice(0, 5).map(e => (<Task item={e}></Task>))
            }
        </ul>
        {
            element.length === 0 &&
            <div class="m-4 text-center">
                <md-icon class="text-secondary text-8xl font-bold shake">waving_hand</md-icon>
                <p class="text-secondary">You compeleted all todos</p>
            </div>
        }
    </div>
)

const AllTasks = () => (
    <TasksList element={tasks.value}></TasksList>
)
const NeedDoTasks = () => (
    <TasksList element={targetDateTasks.value}></TasksList>
)
</script>

<style scoped>
li {
    @apply p-4 w-full border bg-surface rounded-3xl;
}
</style>