import { getGlobalEvents } from '@/hooks/lib/getGlobalEvents'
import { useEvent } from '@/hooks/useEvent'
import { Item, Items } from '@/hooks/useItem'
import { defineStore } from 'pinia'

enum TASKS_TYPE {
    FOCUS = 0,
    NORMAL,
    RECYCLE
}

const events = getGlobalEvents()

const useTaskStore = defineStore('task_store', {
    state: () => ({
        tasks: {
            focus: [] as Items,
            normal: [] as Items,
            recycle: [] as Items,
        }
    }),
    getters: {
        getAll: (state) => state.tasks,
        getFocus: (state): Items => state.tasks.focus,
        getNormal: (state): Items => state.tasks.normal,
        getRecycle: (state): Items => state.tasks.recycle,
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
            let rollBackFn
            if (to === TASKS_TYPE.FOCUS) {
                rollBackFn = () => this.tasks.focus.push(e)
                this.tasks.focus = this.tasks.focus.filter(el => el !== e)
            } else if (to === TASKS_TYPE.NORMAL) {
                rollBackFn = () => this.tasks.normal.push(e)
                this.tasks.normal = this.tasks.normal.filter(el => el !== e)
            } else if (to === TASKS_TYPE.RECYCLE) {
                rollBackFn = () => this.tasks.recycle.push(e)
                this.tasks.recycle = this.tasks.recycle.filter(el => el !== e)
            }
            events.get().push(useEvent('The task is Deleted', true, rollBackFn))
        },
        move(e: Item, from: TASKS_TYPE, to: TASKS_TYPE) {
            let stepOne: () => any
            let stepTwo: () => any

            if (from === TASKS_TYPE.FOCUS) {
                stepOne = () => this.tasks.focus.push(e)
                this.tasks.focus = this.tasks.focus.filter(el => e !== el)
            } else if (from === TASKS_TYPE.NORMAL) {
                stepOne = () => this.tasks.normal.push(e)
                this.tasks.normal = this.tasks.normal.filter(el => e !== el)
            } else if (from === TASKS_TYPE.RECYCLE) {
                stepOne = () => this.tasks.recycle.push(e)
                this.tasks.recycle = this.tasks.recycle.filter(el => e !== el)
            } else {
                return
            }
            if (to === TASKS_TYPE.FOCUS) {
                stepTwo = () => this.tasks.focus = this.tasks.focus.filter(el => e !== el)
                events.get().push(useEvent('Move to Focus', true, () => {
                    stepOne()
                    stepTwo()
                }))
                this.tasks.focus.push(e)
            } else if (to === TASKS_TYPE.NORMAL) {
                stepTwo = () => this.tasks.normal = this.tasks.normal.filter(el => e !== el)
                events.get().push(useEvent('Move to Overview', true, () => {
                    stepOne()
                    stepTwo()
                }))
                this.tasks.normal.push(e)
            } else if (to === TASKS_TYPE.RECYCLE) {
                stepTwo = () => this.tasks.recycle = this.tasks.recycle.filter(el => e !== el)
                events.get().push(useEvent('Move to Recycle', true, () => {
                    stepOne()
                    stepTwo()
                }))
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
    },
    persist: true,
})

export {
    useTaskStore,
    TASKS_TYPE
}