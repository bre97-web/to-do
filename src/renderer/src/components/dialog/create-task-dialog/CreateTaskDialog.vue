<template>
    <teleport to="#app">
        <md-dialog id="creatorDialog" modeless draggable transition="grow">
            <p slot="header">Create</p>

            <FlexColLayout class="gap-2">
                <lit-target-type :type="target.type" :setType="(value: Type) => target.type = value"></lit-target-type>

                <!-- Task -->
                <template v-if="target.type === 'task'">
                    <md-filled-text-field v-model="target.task.title" label="Title" />
                    <md-filled-text-field v-model="target.task.subtitle" label="Subtitle" />
                    <lit-select-target-collection :collections="taskStore.getCollections" :setCurrentCollection="(e: FromCollection) => target.task.fromCollection = e"></lit-select-target-collection>
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
                <template v-if="target.type === 'goal'">
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
            </FlexColLayout>

            <md-text-button slot="footer" @click="cancel">Cancel</md-text-button>
            <md-filled-button slot="footer" @click="submit">Apply</md-filled-button>
        </md-dialog>
    </teleport>
</template>

<script lang="ts" setup>
import { Goal, Schedule, useGoal, useGoals } from '@/hooks/useTask'
import './lib/TargetType'
import './lib/SelectTargetCollection'
import { useTaskStore } from '@/store/useTaskStore'
import { onMounted, reactive } from 'vue'
import { Tags, Type, Date, FromCollection, useTask } from '@/hooks/useTask'
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

var target = reactive({
    // 将要创建的目标类型
    type: 'task' as Type,

    // 目标类型为task时，当需要使用store的push方法时请使用useItem方法创建Item作为参数
    task: {
        title: '',
        subtitle: '',
        tags: [] as Tags,
        note: '',
        targetDate: '' as Date | null,
        fromCollection: 'processing' as FromCollection
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
        isGroup: false,
    },
})

const taskStore = useTaskStore()

/**
 * 向taskStore插入新的数据
 */
const createTask = () => {
    taskStore.push(useTask(target.task))
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

    taskStore.push(useGoals({
        goalList: goalsList,
        schedule: target.goalConfig.goalSchedule
    }))
}


/**
 * 初始化target对象
 * 同时关闭dialog中的所有switch
 */
const clear = () => {
    if(document.querySelector('#creatorDialog md-switch')) {
        (document.querySelector('#creatorDialog md-switch') as HTMLElement & {selected: boolean}).selected = false;
    }
    Object.assign(target, {
        type: 'task',
        task: {
            title: '',
            subtitle: '',
            tags: [] as Tags,
            note: '',
            targetDate: '' as Date | null,
            fromCollection: 'processing' as FromCollection
        },
        goal: {
            title: '',
            description: ''
        },
        goalConfig: {
            goalSchedule: 'daily' as Schedule,
            goalCount: 1 as number
        },
        collectionConfig: {
            label: '',
            isGroup: false,
        },
    })
}
const cancel = () => {
    clear();
    (creatorDialog as MDDialog).open = false
}
const submit = () => {
    if (target.type === 'task') {
        createTask()
    } else if (target.type === 'goal') {
        createGoal()
    }
    clear();
    (creatorDialog as MDDialog).open = false
}
</script>
