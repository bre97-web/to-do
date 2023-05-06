<template>
    <div>
        <header>
            <h1>Steps</h1>
            <md-standard-icon-button @click="create">
                <md-icon class="material-icons">add</md-icon>
            </md-standard-icon-button>
        </header>

        <main>
            <ul>
                <li v-for="(e, index) in props.steps" :key="index">
                    {{ e }}
                </li>
            </ul>
        </main>
    </div>
</template>

<script lang="ts" setup>
import { Item } from '@/hooks/useList';


const props = defineProps<{
    steps: string[],
    task: Item
}>()

const create = () => {
    props.task.steps = ['Test', ...props.steps]
}

</script>
