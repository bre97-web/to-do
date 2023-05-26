<template>
    <Task>
        <template #>
            <template v-if="store.getFocus.length !== 0">
                <md-list>
                    <template
                        v-for="e in store.getFocus"
                        :key="e['index']"
                        class="relative"
                    >
                        <md-list-item
                            :headline="e.title"
                            :supportingText="e.subtitle"
                        >
                            <md-checkbox @click="store.move(e, TASKS_TYPE.FOCUS, TASKS_TYPE.RECYCLE)" slot="start"></md-checkbox>

                            <div class="buttonGroup" slot="end">
                                <md-standard-icon-button @click="store.move(e, TASKS_TYPE.FOCUS, TASKS_TYPE.NORMAL)">
                                    <md-icon class="material-icons">favorite</md-icon>
                                </md-standard-icon-button>
                            </div>
                        </md-list-item>

                        <!-- Tags -->
                        <ul
                            v-if="e.tags && e.tags.length !== 0 && e.tags[0] !== ''"
                            class="relative bottom-0 px-4 py-2"
                        >
                            <li
                                v-for="(tag, index) in e.tags"
                                :key="index"
                            >
                                <p>{{ tag }}</p>
                            </li>
                        </ul>
                        <md-divider></md-divider>
                    </template>
                </md-list>
            </template>
            <template v-else >
                <div class="space-y-4 pt-24 text-center">
                    <span class="material-symbols-outlined scale-[4] text-gray-500">done_all</span>
                    <p class="text-center italic">All done</p>
                </div>
            </template>
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