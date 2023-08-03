<template>
    <Task>
        <template v-if="props.items.length !== 0">
            <md-list>
                <template v-for="e in props.items">
                    <md-list-item v-if="props.itemsFilted.length === 0 || tagIncludes(props.itemsFilted, e)" :key="e.index" :headline="e.title" :supporting-text="e.subtitle">
                        <!-- 完成按钮, 应该注意当前e在哪个容器中 -->
                        <template v-if="store.include(TASKS_TYPE.NORMAL, e)">
                            <md-checkbox
                                slot="start"
                                @click="store.move(e, TASKS_TYPE.NORMAL, TASKS_TYPE.RECYCLE)"
                            ></md-checkbox>
                        </template>
                        <template v-else-if="store.include(TASKS_TYPE.FOCUS, e)">
                            <md-checkbox
                                slot="start"
                                @click="store.move(e, TASKS_TYPE.FOCUS, TASKS_TYPE.RECYCLE)"
                            ></md-checkbox>
                        </template>
                        <template v-else>
                            <md-checkbox
                                slot="start"
                                checked
                                @click="store.move(e, TASKS_TYPE.RECYCLE, TASKS_TYPE.NORMAL)"
                            ></md-checkbox>
                        </template>

                        <!-- Buttons -->
                        <div slot="end">
                            <template v-if="store.include(TASKS_TYPE.NORMAL, e)">
                                <md-standard-icon-button
                                    @click="store.move(e, TASKS_TYPE.NORMAL, TASKS_TYPE.FOCUS)"
                                >
                                    <md-icon>favorite</md-icon>
                                </md-standard-icon-button>
                            </template>
                            <template v-else-if="store.include(TASKS_TYPE.FOCUS, e)">
                                <md-standard-icon-button
                                    @click="store.move(e, TASKS_TYPE.FOCUS, TASKS_TYPE.NORMAL)"
                                >
                                    <md-icon>favorite</md-icon>
                                </md-standard-icon-button>
                            </template>

                            <template v-if="store.include(TASKS_TYPE.RECYCLE, e)">
                                <md-standard-icon-button
                                    @click="store.remove(e, TASKS_TYPE.RECYCLE)"
                                >
                                    <md-icon>delete_forever</md-icon>
                                </md-standard-icon-button>
                            </template>
                            <template v-else>
                                <md-standard-icon-button
                                    @click="
                                        router.push({
                                            path: '/info',
                                            query: {
                                                task: JSON.stringify(e)
                                            }
                                        })
                                    "
                                >
                                    <md-icon>more</md-icon>
                                </md-standard-icon-button>
                            </template>
                        </div>
                        
                    </md-list-item>
                </template>
            </md-list>
        </template>
        <template v-else>
            <AllDone></AllDone>
        </template>
    </Task>
</template>

<script setup lang="ts">
import Task from '@/components/Task.vue'
import { Item } from '@/hooks/useItem'
import { TASKS_TYPE, useTaskStore } from '@/store/useTaskStore'
import { useRouter } from 'vue-router'
import AllDone from './AllDone.vue'

const props = defineProps<{
    itemsFilted: string[]
    items: Item[]
}>()

const router = useRouter()

const store = useTaskStore()

const tagIncludes = (container: string[], e: Item): boolean => {
    for (let i = 0; i < container.length; i++) {
        for (let j = 0; j < e.tags.length; j++) {
            if (container[i] === e.tags[j]) {
                return true
            }
        }
    }
    return false
}
</script>

<style scoped></style>
