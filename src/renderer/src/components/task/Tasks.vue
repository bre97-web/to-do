<template>
    <div class="flex flex-col">

        <Task title="Focus" subtitle="使用固定按钮将任务钉至此处">
            <template #>
                <md-list>
                    <div
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
                    </div>
                </md-list>
            </template>
        </Task>

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
                                <md-standard-icon-button @click="push('/Edit', e)">
                                    <md-icon class="material-icons">edit</md-icon>
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
    </div>
</template>

<script lang="ts" setup>
import { useRouter } from 'vue-router'
import Task from '@/components/task/Task.vue'
import { Item } from '@/hooks/useList/lib/useItem'
import '@material/web/divider/divider'
import '@material/web/iconbutton/standard-icon-button'
import '@material/web/list/list'
import '@material/web/list/list-item'
import { TASKS_TYPE, useTaskStore } from '@/store'

/**
 * Store
 */
const store = useTaskStore()

const router = useRouter()
const push = (path: string, e: Item) => {
    router.push({
        path: path,
        query: {
            task: JSON.stringify(e)
        }
    })
}
</script>
