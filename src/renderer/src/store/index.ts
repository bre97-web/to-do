import { Item, Items } from '@/hooks/useList/lib/useItem'
import { defineStore } from 'pinia'

interface TasksInterface {
    focus: Items
    normal: Items
    recycle: Items
}

enum TASKS_TYPE {
    FOCUS = 0,
    NORMAL,
    RECYCLE
}

const useTaskStore = defineStore('task_store', {
    state: () => ({
        tasks: {
            focus: [],
            normal: [{
                title: '1',
                subtitle: '',
                tags: [],
                steps: [{
                text: '',
                done: false
                }],
                note: '',
                type: 'task'
                },
                {
                    title: '2',
                    subtitle: '',
                    tags: [],
                    steps: [{
                    text: '',
                    done: false
                    }],
                    note: '',
                    type: 'task'
                    },
                    {
                        title: '3',
                        subtitle: '',
                        tags: [],
                        steps: [{
                        text: '',
                        done: false
                        }],
                        note: '',
                        type: 'task'
                        }],
            recycle: []
        } as TasksInterface
    }),
    getters: {
        getAll: (state) => state.tasks,
        getFocus: (state) => state.tasks.focus,
        getNormal: (state) => state.tasks.normal,
        getRecycle: (state) => state.tasks.recycle,
    },
    actions: {
        push(e: Item, to: TASKS_TYPE) {
            if(to === TASKS_TYPE.FOCUS) {
                this.tasks.focus.push(e)
            } else if(to === TASKS_TYPE.NORMAL) {
                this.tasks.normal.push(e)
            } else if(to === TASKS_TYPE.RECYCLE) {
                this.tasks.recycle.push(e)
            }
        },
        remove(e: Item, to: TASKS_TYPE) {
            if(to === TASKS_TYPE.FOCUS) {
                this.tasks.focus = this.tasks.focus.filter(el => el !== e)
            } else if(to === TASKS_TYPE.NORMAL) {
                this.tasks.normal = this.tasks.normal.filter(el => el !== e)
            } else if(to === TASKS_TYPE.RECYCLE) {
                this.tasks.recycle = this.tasks.recycle.filter(el => el !== e)
            }
        },
        move(e: Item, from: TASKS_TYPE, to: TASKS_TYPE) {
            var fromE: Item
            if(from === TASKS_TYPE.FOCUS) {
                fromE = this.tasks.focus.filter(el => e === el)[0]
                this.tasks.focus = this.tasks.focus.filter(el => e !== el)
            } else if(from === TASKS_TYPE.NORMAL) {
                fromE = this.tasks.normal.filter(el => e === el)[0]
                this.tasks.normal = this.tasks.normal.filter(el => e !== el)
            } else if(from === TASKS_TYPE.RECYCLE) {
                fromE = this.tasks.recycle.filter(el => e === el)[0]
                this.tasks.recycle = this.tasks.recycle.filter(el => e !== el)
            } else {
                return 
            }
            if(to === TASKS_TYPE.FOCUS) {
                this.tasks.focus.push(fromE)
            } else if(to === TASKS_TYPE.NORMAL) {
                this.tasks.normal.push(fromE)
            } else if(to === TASKS_TYPE.RECYCLE) {
                this.tasks.recycle.push(fromE)
            }
        }
    }
})

export {
    useTaskStore,
    TASKS_TYPE
}

export type {
    TasksInterface,
}