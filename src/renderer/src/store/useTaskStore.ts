import { FromCollection, ProgressStatus, Task, Tasks } from '@/hooks/useTask'
import { defineStore } from 'pinia'
import { useEventStore } from '@/store/useEventStore'
import moment from 'moment'

export const useTaskStore = defineStore('task_store_eb3eb8', {
    state: () => ({
        tasks: [] as Tasks,
    }),
    getters: {
        getTasks: (state) => state.tasks.filter(e => e.type === 'task'),
        getGoals: (state) => state.tasks.filter(e => e.type === 'goal'),
        getCollections: (state) => [...new Set(state.tasks.filter(e => e.type === 'task').map(e => e.fromCollection))],
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
            if(e.goalSteps === undefined || e.goalSteps === null) return

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
            if(e.goalSteps === undefined || e.goalSteps === null) return
            e.goalSteps.currentIndex = e.goalSteps.maxIndex
            e.goalSteps.compelete = true
        },
        geuCurrentDate(e: Task): string {
            if(e.goalSteps === undefined || e.goalSteps === null) return moment().format('YYYY-MM-DD')

            return moment(e.createdDate, 'YYYY-MM-DD')
                .add((e.goalSteps.currentIndex + 1) * (e.goalSteps.schedule === 'daily' ? 1 : e.goalSteps.schedule === 'monthly' ? 30 : 7), 'd')
                .format('YYYY-MM-DD')
        },

        getTasksByCollection(collection: string) {
            return this.tasks.filter(e => e.fromCollection === collection)
        },
    },
    persist: true
})
