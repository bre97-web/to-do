import { useIndex } from '@/hooks/useIndex'
import { Item, Items } from '@/hooks/useList/lib/useItem'
import moment from 'moment'
import { defineStore } from 'pinia'

enum TASKS_TYPE {
    FOCUS = 0,
    NORMAL,
    RECYCLE
}

/**
 * 使用moment().format('x')时间戳作为每个元素的index
 */
const createIndex = (): number => useIndex()

/**
 * 使用YYYY-MM-DD格式的日期作为每一个元素的日期
 * @returns 返回一个YYYY-MM-DD格式的日期
 */
const createDate = (): string => moment().format('YYYY-MM-DD')


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
            var obj = {
                ...e,
                date: e['date'] === undefined ? createDate() : e.date,
                index: e['index'] === undefined ? createIndex() : e.index,    
            }
            if (to === TASKS_TYPE.FOCUS) {
                this.tasks.focus.push(obj)
            } else if (to === TASKS_TYPE.NORMAL) {
                this.tasks.normal.push(obj)
            } else if (to === TASKS_TYPE.RECYCLE) {
                this.tasks.recycle.push(obj)
            }
        },
        remove(e: Item, to: TASKS_TYPE) {
            if (to === TASKS_TYPE.FOCUS) {
                this.tasks.focus = this.tasks.focus.filter(el => el !== e)
            } else if (to === TASKS_TYPE.NORMAL) {
                this.tasks.normal = this.tasks.normal.filter(el => el !== e)
            } else if (to === TASKS_TYPE.RECYCLE) {
                this.tasks.recycle = this.tasks.recycle.filter(el => el !== e)
            }
        },
        move(e: Item, from: TASKS_TYPE, to: TASKS_TYPE) {
            var fromE: Item
            if (from === TASKS_TYPE.FOCUS) {
                fromE = this.tasks.focus.filter(el => e === el)[0]
                this.tasks.focus = this.tasks.focus.filter(el => e !== el)
            } else if (from === TASKS_TYPE.NORMAL) {
                fromE = this.tasks.normal.filter(el => e === el)[0]
                this.tasks.normal = this.tasks.normal.filter(el => e !== el)
            } else if (from === TASKS_TYPE.RECYCLE) {
                fromE = this.tasks.recycle.filter(el => e === el)[0]
                this.tasks.recycle = this.tasks.recycle.filter(el => e !== el)
            } else {
                return
            }
            if (to === TASKS_TYPE.FOCUS) {
                this.tasks.focus.push(fromE)
            } else if (to === TASKS_TYPE.NORMAL) {
                this.tasks.normal.push(fromE)
            } else if (to === TASKS_TYPE.RECYCLE) {
                this.tasks.recycle.push(fromE)
            }
        }
    },
    persist: true,
})

export {
    useTaskStore,
    TASKS_TYPE
}