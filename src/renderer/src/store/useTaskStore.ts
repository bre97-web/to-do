import { FromCollection, ProgressStatus, Task, Tasks } from '@/hooks/useTask'
import { defineStore } from 'pinia'
import { useEventStore } from '@/store/useEventStore'
import moment from 'moment'

export const useTaskStore = defineStore('task_store_eb3fe8', {
    state: () => ({
        tasks: [] as Tasks,
    }),
    getters: {
        getAll: (state) => state.tasks,
        getTasks: (state) => state.tasks.filter(e => e.type === 'task'),
        getTasksIncludingGoals: (state) => state.tasks.filter(e => e.type === 'goal'),
        getPinned: (state): Tasks => state.tasks.filter(e => e.type === 'task' && e.progressStatus === 'pinned'),
        getProcessing: (state): Tasks => state.tasks.filter(e => e.type === 'task' && e.progressStatus === 'processing'),
        getDone: (state): Tasks => state.tasks.filter(e => e.type === 'task' && e.progressStatus === 'done'),
        getAllTags: (state) => {
            if(state.tasks.length === 0) return []
            return state.tasks.map(e => e.tags)?.reduce((prev, next) => [...prev, ...next])
        },
        getProcessingTags: (state) => {
            if(state.tasks.filter(e => e.progressStatus === 'processing').length === 0) return []
            return state.tasks.filter(e => e.progressStatus === 'processing').map(e => e.tags).reduce((prev, next) => [...prev, ...next])
        },
        getPinnedTags: (state) => {
            if(state.tasks.filter(e => e.progressStatus === 'pinned').length === 0) return []
            return state.tasks.filter(e => e.progressStatus === 'pinned').map(e => e.tags).reduce((prev, next) => [...prev, ...next])
        },
        getDoneTags: (state) => {
            if(state.tasks.filter(e => e.progressStatus === 'done').length === 0) return []
            return state.tasks.filter(e => e.progressStatus === 'done').map(e => e.tags).reduce((prev, next) => [...prev, ...next])
        },
        getAllLabels: (state) => {
        },
    },
    actions: {
        /** 
         * 向tasks数组添加元素
         */
        push(e: Task) {
            this.tasks.push(e)
        },

        /**
         * 从tasks数组移除元素
         */
        remove(e: Task) {
            const event = useEventStore()
            let rollBackFn = () => {}
            rollBackFn = () => this.tasks.push(e)
            this.tasks = this.tasks.filter(el => el !== e)
            event.set({
                name: 'The task is Deleted',
                isRollback: true,
                rollback: rollBackFn
            })
        },

        /**
         * 设置任意Task类型的元素的处理状态
         */
        setProgressStatus(e: Task, status: ProgressStatus) {
            e.progressStatus = status
        },

        /**
         * 设置fromCollection属性值
         */
        setFromCollection(e: Task, fromCollection: FromCollection) {
            e.fromCollection = fromCollection
        },

        /**
         * 将指定e元素的goalSteps的当前进度加一
         */
        nextGoal(e: Task) {
            if(e.goalSteps === undefined) return

            const event = useEventStore()
            const backup = JSON.parse(JSON.stringify(e))
            const rollBackFn = () => {
                if (this.tasks.includes(e)) {
                    this.tasks[this.tasks.indexOf(e)] = backup
                }
            }

            if (e.goalSteps.currentIndex >= e.goalSteps.maxIndex) {
                e.goalSteps.compelete = true
            } else {
                if (e.goalSteps.maxIndex !== 0) {
                    e.goalSteps.currentIndex++
                }
            }

            event.set({
                name: 'Next the goal',
                isRollback: true,
                rollback: rollBackFn
            })
        },
        setCompelete(e: Task) {
            if(e.goalSteps === undefined) return
            e.goalSteps.currentIndex = e.goalSteps.maxIndex
            e.goalSteps.compelete = true
        },
        geuCurrentDate(e: Task): string {
            return e.goalSteps !== undefined ? moment(e.createdDate, 'YYYY-MM-DD')
                .add((e.goalSteps.currentIndex + 1) * (e.goalSteps.schedule === 'daily' ? 1 : e.goalSteps.schedule === 'monthly' ? 30 : 7), 'd')
                .format('YYYY-MM-DD')
                :
                moment().format('YYYY-MM-DD')
        }
    },
    persist: true
})
