<template>
    <div class="flex flex-col">

        <Task :class="tasksStyle.focusList" title="Focus" subtitle="使用固定按钮将任务钉至此处">
            <template #>
                <li v-for="e in tasks.focusList.getValues()" :key="e.index">

                    <md-checkbox @click="tasks.moveToBin(e)"></md-checkbox>

                    <div class="desc">
                        <h1>
                            {{ e.title }}
                        </h1>
                        <p>
                            {{ e.subtitle }}
                        </p>
                    </div>

                    <div class="flex flex-row gap-2 py-2 buttonGroup">
                        <md-standard-icon-button @click="tasks.moveToTasks(e)">
                            <i class="material-icons">favorite</i>
                        </md-standard-icon-button>
                    </div>
                </li>
            </template>
        </Task>

        <Task
            :class="{ 'opacity-25': tasks.taskList.getValues().length === 0 }"
            title="Today's tasks"
            subtitle="需要完成的任务清单"
        >
            <template #>
                <li v-for="e in tasks.taskList.getValues()" :key="e.index">

                    <md-checkbox @click="tasks.moveToBin(e)"></md-checkbox>

                    <div class="desc">
                        <h1>{{ e.title }}</h1>
                        <p>{{ e.subtitle }}</p>

                        <ul
                            v-if="e.tag.length !== 0 && e.tag[0] !== ''"
                            class="hidden lg:flex flex-row items-center justify-start mt-1 gap-2"
                        >
                            <li
                                v-for="(tag, index) in e.tag"
                                :key="index"
                                class="border rounded-full py-1 px-2"
                            >
                                {{ tag }}
                            </li>
                        </ul>
                    </div>

                    <div class="flex flex-row gap-2 py-2 buttonGroup">
                        <md-standard-icon-button @click="tasks.moveToFocus(e)">
                            <i class="material-icons">favorite_outlined</i>
                        </md-standard-icon-button>
                        <md-standard-icon-button @click="push('/Edit', e)">
                            <i class="material-icons">edit</i>
                        </md-standard-icon-button>
                    </div>

                    
                </li>

            </template>
        </Task>

        <Task
            style="grid-row:3;"
            :class="{ 'opacity-25': tasks.binList.getValues().length === 0 }"
            title="Recycle Bin"
            subtitle="完成的任务会在这里"
        >
            <template #>
                <li
                    v-for="e in tasks.binList.getValues()"
                    :key="e.index"
                    class="line-through italic"
                >
                    <div class="desc">
                        <h1>{{ e.title }}</h1>
                        <p>{{ e.subtitle }}</p>
                    </div>

                    <div class="flex flex-row gap-2 py-2 buttonGroup">
                        <md-standard-icon-button @click="tasks.removeBin(e)">
                            <i class="material-icons">delete_forever</i>
                        </md-standard-icon-button>
                        <md-standard-icon-button @click="tasks.moveToTasks(e)">
                            <i class="material-icons">undo</i>
                        </md-standard-icon-button>
                    </div>
                </li>
            </template>
        </Task>
    </div>
</template>

<script setup>
import { watch, reactive } from 'vue'
import { useRouter } from 'vue-router';
import Task from '@/components/Task.vue'
import useTasks from '@/hooks/useTasks'

const router = useRouter()
const push = (path, e) => router.push({
    path: path,
    query: {
        task: JSON.stringify(e) 
    }
})


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
watch(() => tasks.focusList.getValues().length, (v) => {
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
