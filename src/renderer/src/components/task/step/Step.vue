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

        </main>
    </div>
</template>

<script lang="ts" setup>
import { Item } from '@/hooks/useList';
import { useTasks } from '@/hooks/useTasks';
import { reactive, ref, watch } from 'vue';


const props = defineProps<{
    task: Item
}>()

const copyRef = reactive(props.task.steps)

const input = ref('')

const create = () => {
    copyRef.push({
        text: input.value,
        done: false
    })
}

watch(copyRef, () => {
    useTasks().get().taskList.edit(props.task, {
        ...props.task,
        steps: copyRef
    })
})
</script>
