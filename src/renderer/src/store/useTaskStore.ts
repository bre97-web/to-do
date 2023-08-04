import { Item, Items } from '@/hooks/useItem'
import { defineStore } from 'pinia'
import { useEventStore } from '@/store/useEventStore'

export enum TASKS_TYPE {
    FOCUS = 0,
    NORMAL,
    RECYCLE
}
export type CustomTasks = {
    label: string
    items: Items
}


export const useTaskStore = defineStore('task_store', {
    state: () => ({
        tasks: {
            focus: [] as Items,
            normal: [] as Items,
            recycle: [] as Items,
            custom: [] as CustomTasks[],
        }
    }),
    getters: {
        getAll: (state) => state.tasks,
        getCustom: (state) => state.tasks.custom,
        getFocus: (state): Items => state.tasks.focus,
        getNormal: (state): Items => state.tasks.normal,
        getRecycle: (state): Items => state.tasks.recycle
    },
    actions: {
        push(e: Item, to: TASKS_TYPE) {
            if (to === TASKS_TYPE.FOCUS) {
                this.tasks.focus.push(e)
            } else if (to === TASKS_TYPE.NORMAL) {
                this.tasks.normal.push(e)
            } else if (to === TASKS_TYPE.RECYCLE) {
                this.tasks.recycle.push(e)
            }
        },
        remove(e: Item, to: TASKS_TYPE) {
            const event = useEventStore()
            let rollBackFn = () => {}
            if (to === TASKS_TYPE.FOCUS) {
                rollBackFn = () => this.tasks.focus.push(e)
                this.tasks.focus = this.tasks.focus.filter((el) => el !== e)
            } else if (to === TASKS_TYPE.NORMAL) {
                rollBackFn = () => this.tasks.normal.push(e)
                this.tasks.normal = this.tasks.normal.filter((el) => el !== e)
            } else if (to === TASKS_TYPE.RECYCLE) {
                rollBackFn = () => this.tasks.recycle.push(e)
                this.tasks.recycle = this.tasks.recycle.filter((el) => el !== e)
            }
            event.set({
                name: 'The task is Deleted',
                isRollback: true,
                rollback: rollBackFn
            })
        },
        move(e: Item, from: TASKS_TYPE, to: TASKS_TYPE) {
            const event = useEventStore()
            let stepOne: () => any
            let stepTwo: () => any

            if (from === TASKS_TYPE.FOCUS) {
                stepOne = () => this.tasks.focus.push(e)
                this.tasks.focus = this.tasks.focus.filter((el) => e !== el)
            } else if (from === TASKS_TYPE.NORMAL) {
                stepOne = () => this.tasks.normal.push(e)
                this.tasks.normal = this.tasks.normal.filter((el) => e !== el)
            } else if (from === TASKS_TYPE.RECYCLE) {
                stepOne = () => this.tasks.recycle.push(e)
                this.tasks.recycle = this.tasks.recycle.filter((el) => e !== el)
            } else {
                return
            }
            if (to === TASKS_TYPE.FOCUS) {
                stepTwo = () => (this.tasks.focus = this.tasks.focus.filter((el) => e !== el))
                event.set({
                    name: 'Move to Focus',
                    isRollback: true,
                    rollback: () => {
                        stepOne()
                        stepTwo()
                    }
                })
                this.tasks.focus.push(e)
            } else if (to === TASKS_TYPE.NORMAL) {
                stepTwo = () => (this.tasks.normal = this.tasks.normal.filter((el) => e !== el))
                event.set({
                    name: 'Move to Overview',
                    isRollback: true,
                    rollback: () => {
                        stepOne()
                        stepTwo()
                    }
                })
                this.tasks.normal.push(e)
            } else if (to === TASKS_TYPE.RECYCLE) {
                stepTwo = () => (this.tasks.recycle = this.tasks.recycle.filter((el) => e !== el))
                event.set({
                    name: 'Move to Recycle',
                    isRollback: true,
                    rollback: () => {
                        stepOne()
                        stepTwo()
                    }
                })
                this.tasks.recycle.push(e)
            }
        },
        include(container: TASKS_TYPE, e: Item): boolean {
            if (container === TASKS_TYPE.FOCUS) {
                return this.tasks.focus.includes(e)
            } else if (container === TASKS_TYPE.NORMAL) {
                return this.tasks.normal.includes(e)
            } else if (container === TASKS_TYPE.RECYCLE) {
                return this.tasks.recycle.includes(e)
            }
            return false
        },
        /**
         * 在custom中创建一个集合，默认items为空数组
         */
        createCollection(label: string, items = [] as Items) {
            this.tasks.custom.push({
                label,
                items
            })
        },
        insertToCollection(label: string, items: Items) {
            this.tasks.custom.map(e => {
                if(e.label === label) {
                    e.items.push(...items)
                }
                return e
            })
        },
    },
    persist: true
})
