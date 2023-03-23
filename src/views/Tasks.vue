<template>
    <div>
        <Task title="Today's tasks" subtitle="需要完成的任务清单">
            <template #>
                <li v-for="e in taskList.getValues()">
                    <h1>
                        {{ e.title }}
                    </h1>
                    <p>
                        {{ e.subtitle }}
                    </p>

                    <div class="flex flex-row gap-2 py-2 buttonGroup">
                        <md-standard-icon-button @click="taskList.remove(e)">
                            <i class="material-icons">delete_forever</i>
                        </md-standard-icon-button>
                    </div>
                </li>
            </template>
        </Task>

        <Task title="Recycle Bin" subtitle="完成的任务会在这里">
            <template #>
                <li v-for="e in binList.getValues()" class="line-through italic">
                    <h1>
                        {{ e.title }}
                    </h1>
                    <p>
                        {{ e.subtitle }}
                    </p>

                    <div class="flex flex-row gap-2 py-2 buttonGroup">
                        <md-standard-icon-button @click="binList.remove(e)">
                            <i class="material-icons">delete_forever</i>
                        </md-standard-icon-button>
                    </div>
                </li>
            </template>
        </Task>


        <Creator></Creator>
    </div>
</template>

<script setup>
import {
    reactive, ref, provide, inject
} from 'vue'
import Task from '../components/Task.vue'
import Creator from '../components/Creator.vue'

import useList from '../hooks/useList'
import useBin from  '../hooks/useBin'





const taskList = useList()
const binList  = useBin()
</script>

<style scoped>

</style>