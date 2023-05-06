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
import { Item, Step } from '@/hooks/useList';
import { useTasks } from '@/hooks/useTasks';


const props = defineProps<{
    steps: string[],
    task: Item
}>()

const create = () => {
    var step: Step = {
        steps: [
            'The new step',
            ...props.task.steps
        ]
    }

    // useTasks().get().taskList.edit({
    //     ...props.task,
    //     steps: step.steps
    // })
    props.task.steps = ['Test', ...props.steps]
}

</script>
