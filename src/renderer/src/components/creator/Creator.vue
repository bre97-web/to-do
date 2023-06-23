<template>
    <teleport to='#app'>
        <md-dialog :open="props.dialog.open" fullscreen>
            <div slot="header">
                <h1>Create</h1>
            </div>

            <form class="flex flex-col gap-2 min-h-screen overflow-scroll pt-2">
                <lit-target-type :setType="(value: Type) => target.type.value = value"></lit-target-type>

                <!-- Task -->
                <template v-if="target.type.value === 'task'">
                    <md-filled-text-field v-model="target.task.title" label="Title" />
                    <md-filled-text-field v-model="target.task.subtitle" label="Subtitle" />
                    <md-filled-text-field :value="target.task.tags.toString()" @input="target.task.tags = $event.target.value.split(/[,，]/)" label="Tag" />
                    <md-filled-text-field v-model="target.task.note" label="Note" />
                    <md-filled-text-field v-model="target.task.targetDate" type="date" label="Target Date" />
                </template>

                <!-- Goal -->
                <template v-if="target.type.value === 'goal'">
                    <md-filled-text-field label="Title" v-model="target.goal.title"></md-filled-text-field>
                    <md-filled-text-field label="Description" v-model="target.goal.description"></md-filled-text-field>
                    <md-outlined-segmented-button-set label="Schedule" class="mx-1">
                        <md-outlined-segmented-button selected @click="target.goalConfig.goalSchedule = 'daily'" label="Day"></md-outlined-segmented-button>
                        <md-outlined-segmented-button @click="target.goalConfig.goalSchedule = 'weekly'" label="Week"></md-outlined-segmented-button>
                        <md-outlined-segmented-button @click="target.goalConfig.goalSchedule = 'monthly'" label="Month"></md-outlined-segmented-button>
                    </md-outlined-segmented-button-set>
                    <md-filled-text-field label="Times" type="number" value="1" @input="target.goalConfig.goalCount = $event.target.value"></md-filled-text-field>
                </template>
            </form>

            <footer slot="footer" class="space-x-2">
                <md-text-button @click="cancel">Cancel</md-text-button>
                <md-filled-button @click="submit">Apply</md-filled-button>
            </footer>
        </md-dialog>
    </teleport>
</template>

<script lang="ts" setup>
import { getGlobalGoalsList } from '@/hooks/useList/lib/getGlobalGoalsList'
import { Goal, Schedule, useGoal, useGoals } from '@/hooks/useList/lib/useGoal'
import { Type, useItem, Date, Tags } from '@/hooks/useList/lib/useItem'
import './lib/TargetType'
import '@material/web/dialog/dialog'
import '@material/web/button/text-button'
import '@material/web/button/filled-button'
import '@material/web/textfield/filled-text-field'
import '@material/web/textfield/outlined-text-field'
import '@material/web/labs/segmentedbutton/outlined-segmented-button'
import '@material/web/labs/segmentedbuttonset/outlined-segmented-button-set'
import { TASKS_TYPE, useTaskStore } from '@/store'
import { ref } from 'vue'

const props = defineProps(['dialog', 'closeDialog'])

// target的默认值，在clear函数中使用initTarget对象初始化target对象
const initTarget = {
    type: ref<Type>("task"),
    task: {
        title: '',
        subtitle: '',
        tags: [] as Tags,
        note: '',
        targetDate: '' as Date | null,
    },
    goalConfig: {
        goalSchedule: 'daily' as Schedule,
        goalCount: 1,
    },
    goal: {
        title: '',
        description: '',
    } as Goal,
}
const target = {
    // 将要创建的目标类型
    type: ref<Type>("task"),

    // 目标类型为task时，当需要使用store的push方法时请使用useItem方法创建Item作为参数
    task: {
        title: '',
        subtitle: '',
        tags: [] as Tags,
        note: '',
        targetDate: '' as Date | null,
    },

    // 目标类型为goal
    goal: {
        title: '',
        description: '',
    } as Goal,
    // goal相关的配置
    goalConfig: {
        goalSchedule: 'daily' as Schedule,
        goalCount: 1 as number,
    },

}

const store = useTaskStore()


/**
 * 将用户输入的信息推送到store中，关闭对话框时清空输入数据
 */
const submit = () => {
    if(target.type.value === 'task') {
        createTask()
    } else if(target.type.value === 'goal') {
        createGoal()
    }
    clear()
    props.closeDialog()
}
const createTask = () => store.push(useItem(target.task), TASKS_TYPE.NORMAL)
const createGoal = () => {
    let goals = Array<Goal>()
    for(let i = 0; i < target.goalConfig.goalCount; i ++) {
        goals.push(useGoal(target.goal))
    }
    getGlobalGoalsList().push(useGoals(target.goalConfig.goalSchedule, goals).get())
}
const cancel = () => {
    clear()
    props.closeDialog()
}

/**
 * 初始化target对象
 */
const clear = () => {
    Object.assign(target, initTarget)
}
</script>
