<template>
    <teleport to='#app'>
        <md-dialog :open="props.dialog.open" fullscreen>
            <div slot="header">
                <h1>Create</h1>
            </div>

            <form class="flex flex-col gap-2 min-h-screen overflow-scroll pt-2">
                <lit-target-type :setType="(value: Type | null) => targetType = value"></lit-target-type>

                <!-- Task -->
                <template v-if="targetType === 'task'">
                    <md-filled-text-field :value="task.title" @input="task.title = $event.target.value" label="Title" />
                    <md-filled-text-field :value="task.subtitle" @input="task.subtitle = $event.target.value" label="Subtitle" />
                    <md-filled-text-field :value="task.tags.toString()" @input="task.tags = $event.target.value.split(',')" label="Tag" />
                    <md-filled-text-field :value="task.note" @input="task.note = $event.target.value" label="Note" />
                </template>

                <!-- Goal -->
                <template v-if="targetType === 'goal'">
                    <md-filled-text-field label="Title" :value="goal.title" @input="goal.title = $event.target.value"></md-filled-text-field>
                    <md-filled-text-field label="Description" :value="goal.description" @input="goal.description = $event.target.value"></md-filled-text-field>
                    <md-outlined-segmented-button-set label="Schedule">
                        <md-outlined-segmented-button @click="goalSchedule = 'daily'" label="Day"></md-outlined-segmented-button>
                        <md-outlined-segmented-button @click="goalSchedule = 'weekly'" label="Week"></md-outlined-segmented-button>
                        <md-outlined-segmented-button @click="goalSchedule = 'monthly'" label="Month"></md-outlined-segmented-button>
                    </md-outlined-segmented-button-set>
                    <md-filled-text-field label="Count" type="number" :value="goalCount" @input="goalCount = ($event.target.value as number)"></md-filled-text-field>
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
import { Item, Type } from '@/hooks/useList/lib/useItem'
import './lib/TargetType.ts'
import { reactive, ref } from 'vue'
import '@material/web/dialog/dialog'
import '@material/web/button/text-button'
import '@material/web/button/filled-button'
import '@material/web/textfield/filled-text-field'
import '@material/web/textfield/outlined-text-field'
import '@material/web/segmentedbutton/outlined-segmented-button'
import '@material/web/segmentedbuttonset/outlined-segmented-button-set'
import { TASKS_TYPE, useTaskStore } from '@/store'



const props = defineProps(['dialog', 'closeDialog'])

/**
 * 将要创建的目标类型
 */
const targetType = ref<Type | null>(null)

const task = reactive<Item>({
    title: '',
    subtitle: '',
    tags: [],
    note: '',
    steps: [{
        text: '',
        done: false
    }],
    type: 'task',
})
const goalSchedule = ref<Schedule>('daily')
const goalCount = ref<number>(1)
const goal = reactive<Goal>({
    title: '',
    description: '',
})

const store = useTaskStore()


/**
 * 将用户输入的信息推送到位于useList.js中的对象中，关闭对话框时清空输入数据
 */
const submit = () => {
    if(targetType.value === 'task') {
        store.push(task, TASKS_TYPE.NORMAL)
    } else if(targetType.value === 'goal') {
        let goals = Array<Goal>()
        for(let i = 0; i < goalCount.value; i ++) {
            goals.push(useGoal(goal))
        }
        getGlobalGoalsList().push(useGoals(goalSchedule.value, goals).get())
    }
    // clear()
    props.closeDialog()
}
const cancel = () => {
    props.closeDialog()
}

// const clear = () => {
//     task.title = ''
//     task.subtitle = ''
//     task.tags = ['']
//     task.note = ''
//     task.date = ''
//     task.steps = [{
//         text: '',
//         done: false
//     }]
//     targetType.value = null
//     goalSchedule.value = 'daily'
//     goalCount.value = 1
//     goal.title = ''
//     goal.description = ''
// }
</script>
