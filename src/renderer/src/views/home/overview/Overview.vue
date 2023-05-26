<template>
    <Task
        :class="{ 'opacity-25': store.getNormal.length === 0 }"
        title="Today's tasks"
        subtitle="需要完成的任务清单"
    >
        <template #>
            <md-list>
                <div 
                    v-for="e in store.getNormal"
                    :key="e['index']"
                    class="relative"
                >
                    <md-list-item
                        :headline="e.title"
                        :supportingText="e.subtitle"
                    >
                        <!-- 完成按钮 -->
                        <md-checkbox @click="store.move(e, TASKS_TYPE.NORMAL, TASKS_TYPE.RECYCLE)" slot="start"></md-checkbox>
                        
                        <!-- Buttons -->
                        <div slot="end">
                            <md-standard-icon-button @click="store.move(e, TASKS_TYPE.NORMAL, TASKS_TYPE.FOCUS)">
                                <md-icon class="material-icons">favorite_outlined</md-icon>
                            </md-standard-icon-button>
                            <md-standard-icon-button @click="push('/info', e)">
                                <md-icon class="material-icons">more</md-icon>
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