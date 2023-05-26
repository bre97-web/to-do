<template>
    <Task
        style="grid-row:3;"
        :class="{ 'opacity-25': store.getRecycle.length === 0 }"
        title="Recycle Bin"
        subtitle="完成的任务会在这里"
    >
        <template #>
            <md-list>
                <div
                    v-for="e in store.getRecycle"
                    :key="e['index']"
                    class="relative"
                >
                    <md-list-item
                        class="line-through italic"
                        :headline="e.title"
                        :supportingText="e.subtitle"
                    >
                        <md-checkbox checked @click="store.move(e, TASKS_TYPE.RECYCLE, TASKS_TYPE.NORMAL)" slot="start"></md-checkbox>
                        <div slot="end">
                            <md-standard-icon-button @click="store.remove(e, TASKS_TYPE.RECYCLE)">
                                <md-icon class="material-icons">delete_forever</md-icon>
                            </md-standard-icon-button>
                        </div>
                    </md-list-item>
                    <md-divider></md-divider>
                </div>
            </md-list>
        </template>
    </Task>
</template>

<script setup lang="ts">
import Task from '@/components/task/Task.vue';
import { useTaskStore, TASKS_TYPE } from '@/store';


const store = useTaskStore()
</script>

<style scoped>

</style>