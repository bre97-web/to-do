<template>
    <div class="flex flex-col">

        <Task :class="tasksStyle.focusList" title="Focus" subtitle="使用固定按钮将任务钉至此处">
            <template #>
                <md-list>
                    <div
                        v-for="e in tasks.focusList.getValues()"
                        :key="e['index']"
                        class="relative"
                    >
                        <md-list-item
                            :headline="e.title"
                            :supportingText="e.subtitle"
                        >
                            <md-checkbox @click="tasks.moveToBin(e)" slot="start"></md-checkbox>

                            <div class="buttonGroup" slot="end">
                                <md-standard-icon-button @click="tasks.moveToTasks(e)">
                                    <md-icon class="material-icons">favorite</md-icon>
                                </md-standard-icon-button>
                            </div>
                        </md-list-item>

                        <!-- Tags -->
                        <ul
                            v-if="e.tag && e.tag.length !== 0 && e.tag[0] !== ''"
                            class="relative bottom-0 px-4 py-2"
                        >
                            <li
                                v-for="(tag, index) in e.tag"
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
            :class="{ 'opacity-25': tasks.taskList.getValues().length === 0 }"
            title="Today's tasks"
            subtitle="需要完成的任务清单"
        >
            <template #>
                <md-list>
                    <div 
                        v-for="e in tasks.taskList.getValues()"
                        :key="e['index']"
                        class="relative"
                    >
                        <md-list-item
                            :headline="e.title"
                            :supportingText="e.subtitle"
                        >
                            <!-- 完成按钮 -->
                            <md-checkbox @click="tasks.moveToBin(e)" slot="start"></md-checkbox>
                            
                            <!-- Buttons -->
                            <div slot="end">
                                <md-standard-icon-button @click="tasks.moveToFocus(e)">
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
                            v-if="e.tag && e.tag.length !== 0 && e.tag[0] !== ''"
                            class="relative bottom-0 px-4 py-2"
                        >
                            <li
                                v-for="(tag, index) in e.tag"
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
            :class="{ 'opacity-25': tasks.binList.getValues().length === 0 }"
            title="Recycle Bin"
            subtitle="完成的任务会在这里"
        >
            <template #>
                <md-list>
                    <div
                        v-for="e in tasks.binList.getValues()"
                        :key="e['index']"
                        class="relative"
                    >
                        <md-list-item
                            class="line-through italic"
                            :headline="e.title"
                            :supportingText="e.subtitle"
                        >
                            <md-checkbox checked @click="tasks.moveToTasks(e)" slot="start"></md-checkbox>
                            <div slot="end">
                                <md-standard-icon-button @click="tasks.removeBin(e)">
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
import { watch, reactive } from 'vue'
import { useRouter } from 'vue-router'
import Task from '@/components/task/Task.vue'
import useTasks from '@/hooks/useTasks'
import { Item } from '@/hooks/useList'

const router = useRouter()
const push = (path: string, e: Item) => {
    router.push({
        path: path,
        query: {
            task: JSON.stringify(e)
        }
    })
}


const tasks = useTasks()
var tasksStyle = reactive({
    focusList: {
        'opacity-0': true,
        hidden: true
    }
})

/**
 * 仅针对focusList的样式
 * 监测tasks中tasks.focusList的长度，当长度为0时设定定时器，延迟使样式成立
 */
watch(() => tasks.focusList.getValues().length, (v: any) => {
    if (v === 0) {
        tasksStyle.focusList['opacity-0'] = true
        setTimeout(() => {
            tasksStyle.focusList['hidden'] = true
        }, 500)
    } else {
        tasksStyle.focusList['hidden'] = false
        setTimeout(() => {
            tasksStyle.focusList['opacity-0'] = false
        }, 300)
    }
}, {
    immediate: true
})
</script>
