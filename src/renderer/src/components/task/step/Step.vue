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
                    v-for="(e, index) in copyRef"
                    :key="index"
                >
                    <md-list-item :headline="e.text">
                        <md-checkbox
                            :checked="e.done"
                            slot="start"
                            @click="() => e.done = !e.done"
                        ></md-checkbox>
                        <md-standard-icon-button
                            slot="end"
                            @click="() => copyRef.splice(index, 1)"
                        >
                            <md-icon class="material-icons">delete_outlined</md-icon>
                        </md-standard-icon-button>
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
