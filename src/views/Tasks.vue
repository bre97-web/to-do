<template>
    <div>

        <Task title="Focus" subtitle="使用固定按钮将任务钉至此处">
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

        <Task title="Today's tasks" subtitle="需要完成的任务清单">
            <template #>
                <li v-for="e in tasks.taskList.getValues()" :key="e.index">

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

        <Task title="Recycle Bin" subtitle="完成的任务会在这里">
            <template #>
                <li v-for="e in tasks.binList.getValues()" class="line-through italic" :key="e.index">
                    <div class="desc">
                        <h1>
                            {{ e.title }}
                        </h1>
                        <p>
                            {{ e.subtitle }}
                        </p>
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


        <Creator></Creator>
    </div>
</template>

<script setup>
import { useRouter } from 'vue-router';
import Task from '@/components/Task.vue'
import Creator from '@/components/Creator.vue'
import useTasks from '@/hooks/useTasks'

const router = useRouter()
const push = (path, e) => router.push({
    path: path,
    query: {
        task: JSON.stringify(e) 
    }
})


const tasks = useTasks()



</script>

<style scoped>

</style>