<template>
    <teleport to="#app">
        <md-dialog id="creatorDialog" modeless draggable transition="grow">
            <p slot="header">Create</p>

            <FlexColLayout class="gap-2">
                <lit-target-type :setType="(value: Type) => target.type.value = value"></lit-target-type>

                <!-- Task -->
                <template v-if="target.type.value === 'task'">
                    <md-filled-text-field v-model="target.task.title" label="Title" />
                    <md-filled-text-field v-model="target.task.subtitle" label="Subtitle" />
                    <label>
                        <BodyLarge>Collection</BodyLarge>
                        <md-switch unselected @click="target.collectionConfig.isGroup.value = $event.target.selected"></md-switch>
                    </label>
                    <lit-select-target-collection v-show="target.collectionConfig.isGroup.value" :collections="tasks.getAllLabels" :setCurrentCollection="(e: FromCollection) => target.task.fromCollection = e"></lit-select-target-collection>
                    <ExpandLayout>
                        <FlexColLayout class="gap-2">
                            <md-filled-text-field
                                :value="target.task.tags.toString()"
                                label="Tag"
                                @input="target.task.tags = $event.target.value.split(/[,，]/)"
                            />
                            <md-filled-text-field v-model="target.task.note" label="Note" />
                            <md-filled-text-field
                                v-model="target.task.targetDate"
                                type="date"
                                label="Target Date"
                            />
                        </FlexColLayout>
                    </ExpandLayout>

                </template>

                <!-- Goal -->
                <template v-if="target.type.value === 'goal'">
                    <md-filled-text-field
                        v-model="target.goal.title"
                        label="Title"
                    ></md-filled-text-field>
                    <md-filled-text-field
                        v-model="target.goal.description"
                        label="Description"
                    ></md-filled-text-field>
                    <md-outlined-segmented-button-set label="Schedule" class="mx-1">
                        <md-outlined-segmented-button
                            selected
                            label="Day"
                            @click="target.goalConfig.goalSchedule = 'daily'"
                        ></md-outlined-segmented-button>
                        <md-outlined-segmented-button
                            label="Week"
                            @click="target.goalConfig.goalSchedule = 'weekly'"
                        ></md-outlined-segmented-button>
                        <md-outlined-segmented-button
                            label="Month"
                            @click="target.goalConfig.goalSchedule = 'monthly'"
                        ></md-outlined-segmented-button>
                    </md-outlined-segmented-button-set>
                    <md-filled-text-field
                        label="Times"
                        type="number"
                        value="1"
                        @input="target.goalConfig.goalCount = $event.target.value"
                    ></md-filled-text-field>
                </template>

                <!-- Collection -->
                <template v-if="target.type.value === 'collection'">
                    <md-filled-text-field
                        v-model="target.collectionConfig.label"
                        label="Collection Name"
                    ></md-filled-text-field>
                </template>
            </FlexColLayout>

            <md-text-button slot="footer" @click="cancel">Cancel</md-text-button>
            <md-filled-button slot="footer" @click="submit">Apply</md-filled-button>
        </md-dialog>
    </teleport>
</template>

<script lang="ts" setup>
import { Goal, Schedule, useGoal, useGoals } from '@/hooks/useGoal'
import './lib/TargetType'
import './lib/SelectTargetCollection'
import { useTaskStore } from '@/store/useTaskStore'
import { useGoalStore } from '@/store/useGoalStore.ts'
import { onMounted, ref } from 'vue'
import { Tags, Type, Date, FromCollection, useTask, useCollection } from '@/hooks/useTask'
import ExpandLayout from '@/layouts/ExpandLayout.vue'
import FlexColLayout from '@/layouts/FlexColLayout.vue'
import { MDDialog } from '@/types/MDDialog'

/**
 * 此组件内的dialog使用id选择器共享#creatorDialog
 */
var creatorDialog: null | MDDialog
onMounted(() => {
    creatorDialog = document.querySelector('#creatorDialog')
})

const tasks = useTaskStore()

type TargetType = Type
// target的默认值，在clear函数中使用initTarget对象初始化target对象
const initTarget = {
    type: ref<TargetType>('task'),
    task: {
        title: '',
        subtitle: '',
        tags: [] as Tags,
        note: '',
        targetDate: '' as Date | null,
        fromCollection: '' as FromCollection,
    },
    goalConfig: {
        goalSchedule: 'daily' as Schedule,
        goalCount: 1
    },
    goal: {
        title: '',
        description: ''
    },
    collectionConfig: {
        label: '',
        isGroup: ref(false),
    },
}
const target = {
    // 将要创建的目标类型
    type: ref<TargetType>('task'),

    // 目标类型为task时，当需要使用store的push方法时请使用useItem方法创建Item作为参数
    task: {
        title: '',
        subtitle: '',
        tags: [] as Tags,
        note: '',
        targetDate: '' as Date | null,
        fromCollection: '' as FromCollection
    },

    // 目标类型为goal
    goal: {
        title: '',
        description: ''
    },
    // goal相关的配置
    goalConfig: {
        goalSchedule: 'daily' as Schedule,
        goalCount: 1 as number
    },

    // 目标类型为collection
    collectionConfig: {
        label: '',
        isGroup: ref<boolean>(false),
    },
}

const taskStore = useTaskStore()
const goalStore = useGoalStore()

const createTask = () => {
    if(target.collectionConfig.isGroup && target.task.fromCollection !== '') {
        taskStore.insertToCollection(target.task.fromCollection, [useCollection(target.task)])
    }
    taskStore.push([useTask(target.task)])
}
const createGoal = () => {
    let goalsList: Goal[] = []
    for (let i = 0; i < target.goalConfig.goalCount; i++) {
        goalsList.push(
            useGoal({
                title: target.goal.title,
                description: target.goal.description
            })
        )
    }
    let goals = useGoals({
        goalList: goalsList,
        schedule: target.goalConfig.goalSchedule
    })

    goalStore.push(goals)
}
const createCollection = () => {
    taskStore.createCollection(target.collectionConfig.label)
}


/**
 * 初始化target对象
 */
const clear = () => {
    Object.assign(target, initTarget)
}
const cancel = () => {
    clear();
    (creatorDialog as MDDialog).open = false
}
const submit = () => {
    if (target.type.value === 'task') {
        createTask()
    } else if (target.type.value === 'goal') {
        createGoal()
    } else if (target.type.value === 'collection') {
        createCollection()
    }
    clear();
    (creatorDialog as MDDialog).open = false
}
</script>
@/types/MDDialog