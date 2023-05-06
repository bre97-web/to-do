<template>
    <div>
        <header>
            <h1>Steps</h1>
            <div class="flex items-center justify-start">
                <md-outlined-text-field
                    label="Step"
                    :value="input"
                    @input="input = $event.target.value"
                ></md-outlined-text-field>
                <md-standard-icon-button @click="create">
                    <md-icon class="material-icons">add</md-icon>
                </md-standard-icon-button>
            </div>
        </header>

        <main>
            <md-list>
                <div
                    v-for="(e, index) in steps"
                    :key="index"
                >
                    <md-list-item :headline="e">
                    </md-list-item>
                    <md-divider></md-divider>
                </div>
            </md-list>
        </main>
    </div>
</template>

<script lang="ts" setup>
import { Item } from '@/hooks/useList';
import { useTasks } from '@/hooks/useTasks';
import { ref, toRef, watch } from 'vue';


const props = defineProps<{
    steps: string[],
    task: Item
}>()

const steps = toRef(props.task, 'steps')

const input = ref('')



const create = () => {

    steps.value?.push(input.value)

    useTasks().get().taskList.edit(props.task, {
        ...props.task,
        steps: [...props.steps],
    })
}

</script>
