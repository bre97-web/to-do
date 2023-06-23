<template>
    <div class="bg-background mx-4 mt-4">
        <div class="p-4 w-full border bg-surface rounded-3xl">
            <Title></Title>

            <Tasks></Tasks>
        </div>
    </div>
</template>

<script setup lang="tsx">
import { useDate } from '@/hooks/useDate';
import { Item } from '@/hooks/useList/lib/useItem';
import { useTaskStore } from '@/store';
import '@material/web/elevation/elevation'
import '@material/web/icon/icon'
import { computed } from 'vue';

const store = useTaskStore()
const allTasks = computed(() => [...store.getNormal, ...store.getFocus])

const Title = () => (
    <header>
        <p class="text-xs">Today { useDate() }</p>
        <h1>{allTasks.value.length} todos</h1>
    </header>
)

const Tasks = () => (
    <ul class="surface rounded-3xl">
        {
            allTasks.value.length ? 
            allTasks.value.map(e => (<Task item={e}></Task>)) :
            (
                <div class="text-center m-4">
                    <md-icon class="text-8xl font-bold shake">waving_hand</md-icon>
                    <p class="opacity-75">You compeleted all todos</p>
                </div>
            )
        }
    </ul>
)
const Task = ({item}: {
    item: Item
}) => (
    <li class="elevation rounded-3xl p-4 text-onSurface surfaceContainer">
        <md-elevation></md-elevation>
        <header>
            <h1>{ item.title }</h1>
            <p class="text-xs">Created in { item.date }</p>
        </header>
    </li>
)
</script>

<style scoped>

</style>