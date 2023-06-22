<template>
    <Task>
        <template #>
            <template v-if="props.itemsFilted.size !== 0 || props.items.length !== 0">
                <md-list>
                    <template
                        v-if="props.itemsFilted.size !== 0"
                        v-for="el in props.itemsFilted.values()"
                        class="relative"
                    >
                        <template v-for="e in el">
                            <md-list-item
                                :headline="e.title"
                                :supportingText="e.subtitle"
                            >
                                <!-- 完成按钮 -->
                                <md-checkbox @click="store.move(e, TASKS_TYPE.NORMAL, TASKS_TYPE.RECYCLE)" slot="start"></md-checkbox>
                                
                                <!-- Buttons -->
                                <div slot="end">
                                    <md-standard-icon-button @click="store.move(e, TASKS_TYPE.NORMAL, TASKS_TYPE.FOCUS)">
                                        <md-icon>favorite</md-icon>
                                    </md-standard-icon-button>
                                    <md-standard-icon-button @click="router.push({
                                        path: '/info', 
                                        query: {
                                            task: JSON.stringify(e),
                                        }
                                    })">
                                        <md-icon>more</md-icon>
                                    </md-standard-icon-button>
                                </div>
                            </md-list-item>
                            
                            <md-divider></md-divider>
                        </template>
                    </template>
                    <template v-else>
                        <template v-for="e in props.items">
                            <md-list-item
                                :headline="e.title"
                                :supportingText="e.subtitle"
                            >
                                <!-- 完成按钮, 应该注意当前e在哪个容器中 -->
                                <template v-if="store.include(TASKS_TYPE.NORMAL, e)">
                                    <md-checkbox @click="store.move(e, TASKS_TYPE.NORMAL, TASKS_TYPE.RECYCLE)" slot="start"></md-checkbox>
                                </template>
                                <template v-else-if="store.include(TASKS_TYPE.FOCUS, e)">
                                    <md-checkbox @click="store.move(e, TASKS_TYPE.FOCUS, TASKS_TYPE.RECYCLE)" slot="start"></md-checkbox>
                                </template>
                                <template v-else>
                                    <md-checkbox checked @click="store.move(e, TASKS_TYPE.RECYCLE, TASKS_TYPE.NORMAL)" slot="start"></md-checkbox>
                                </template>
                                
                                <!-- Buttons -->
                                <div slot="end">
                                    <template v-if="store.include(TASKS_TYPE.NORMAL, e)">
                                        <md-standard-icon-button @click="store.move(e, TASKS_TYPE.NORMAL, TASKS_TYPE.FOCUS)">
                                            <md-icon>favorite</md-icon>
                                        </md-standard-icon-button>
                                    </template>
                                    <template v-else-if="store.include(TASKS_TYPE.FOCUS, e)">
                                        <md-standard-icon-button @click="store.move(e, TASKS_TYPE.FOCUS, TASKS_TYPE.NORMAL)">
                                            <md-icon>favorite</md-icon>
                                        </md-standard-icon-button>
                                    </template>

                                    <template v-if="store.include(TASKS_TYPE.RECYCLE, e)">
                                        <md-standard-icon-button @click="store.remove(e, TASKS_TYPE.RECYCLE)">
                                            <md-icon>delete_forever</md-icon>
                                        </md-standard-icon-button>
                                    </template>
                                    <template v-else>
                                        <md-standard-icon-button @click="router.push({
                                            path: '/info', 
                                            query: {
                                                task: JSON.stringify(e),
                                            }
                                        })">
                                            <md-icon>more</md-icon>
                                        </md-standard-icon-button>
                                    </template>
                                </div>
                            </md-list-item>
                            
                            <md-divider></md-divider>
                        </template>
                    </template>
                </md-list>
            </template>
            <template v-else>
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
import { Item } from '@/hooks/useList/lib/useItem';
import { TASKS_TYPE, useTaskStore } from '@/store';
import { useRouter } from 'vue-router';
const props = defineProps<{
    itemsFilted: Map<string, Item[]>,
    items: Item[],
}>()

const router = useRouter()

const store = useTaskStore()
</script>

<style scoped>

</style>