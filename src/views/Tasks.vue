<template>
    <div>

        <Task title="Focus" subtitle="使用固定按钮将任务钉至此处">
            <template #>
                <li v-for="e in focusList.getTasks().getValues()" :key="e.index">

                    <md-checkbox @click="moveToBin(e)"></md-checkbox>

                    <div class="desc">
                        <h1>
                            {{ e.title }}
                        </h1>
                        <p>
                            {{ e.subtitle }}
                        </p>
                    </div>

                    <div class="flex flex-row gap-2 py-2 buttonGroup">
                        <md-standard-icon-button @click="moveToTasks(e)">
                            <i class="material-icons">favorite</i>
                        </md-standard-icon-button>
                    </div>
                </li>
            </template>
        </Task>

        <Task title="Today's tasks" subtitle="需要完成的任务清单">
            <template #>
                <li v-for="e in taskList.getValues()" :key="e.index">

                    <md-checkbox @click="moveToBin(e)"></md-checkbox>

                    <div class="desc">
                        <h1>
                            {{ e.title }}
                        </h1>
                        <p>
                            {{ e.subtitle }}
                        </p>
                    </div>

                    <div class="flex flex-row gap-2 py-2 buttonGroup">
                        <md-standard-icon-button @click="moveToFocus(e)">
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
                <li v-for="e in binList.getTasks().getValues()" class="line-through italic" :key="e.index">
                    <div class="desc">
                        <h1>
                            {{ e.title }}
                        </h1>
                        <p>
                            {{ e.subtitle }}
                        </p>
                    </div>

                    <div class="flex flex-row gap-2 py-2 buttonGroup">
                        <md-standard-icon-button @click="binList.getTasks().remove(e)">
                            <i class="material-icons">delete_forever</i>
                        </md-standard-icon-button>
                        <md-standard-icon-button @click="moveToTasks(e)">
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
import {
    reactive, ref, provide, inject, onMounted, onBeforeMount, 
} from 'vue'
import { useRouter } from 'vue-router';
import Task from '../components/Task.vue'
import Creator from '../components/Creator.vue'
import useList from '../hooks/useList'


const router = useRouter()

const push = (path, e) => router.push({
    path: path,
    query: {
        task: JSON.stringify(e) 
    }
})


const taskList = useList()
const binList  = useList()
const focusList = useList()


/**
 * 将元素e保存到bin，并将e从当前tasks中删除
 * @param {Object} e 需要被移动到Bin的元素
 */
const moveToBin = (e) => {
    setTimeout(() => {
        taskList.remove(e)
    }, 500);
    binList.getTasks().push(e)
}
/**
 * 将元素e保存到tasks，并将e从当前bin中删除
 * @param {Object} e 需要被移动到Tasks的元素
 */
const moveToTasks = (e) => {
    taskList.push(e)
    binList.getTasks().remove(e)
    focusList.getTasks().remove(e)
}

const moveToPin = (e) => {}
const moveToFocus = (e) => {
    setTimeout(() => {
        taskList.remove(e)
    }, 500);
    focusList.getTasks().push(e)
}

/**
 * 当Vue即将挂载前获取所有还未初始化的useList()实例变量的局部成员tasks
 */
onBeforeMount(() => {
    binList.getTasks().init('bin')
    focusList.getTasks().init('focus')
})

</script>

<style scoped>

</style>