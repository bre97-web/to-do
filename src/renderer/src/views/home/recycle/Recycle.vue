<template>
    <Task>
        <template #>
            <template v-if="store.getRecycle.length !== 0">
                <md-list>
                    <template
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
                                    <md-icon>delete_forever</md-icon>
                                </md-standard-icon-button>
                            </div>
                        </md-list-item>
                        <md-divider></md-divider>
                    </template>
                </md-list>
            </template>
            <template v-else >
                <div class="space-y-4 pt-24 text-center">
                    <md-icon class="scale-[4] text-gray-500">done_all</md-icon>
                    <p class="text-center italic">All done</p>
                </div>
            </template>
        </template>
    </Task>
</template>

<script setup lang="ts">
import Task from '@/components/task/Task.vue';
import '@material/web/icon/icon'
import { useTaskStore, TASKS_TYPE } from '@/store';


const store = useTaskStore()
</script>

<style scoped>

</style>