import { FromCollection, ProgressStatus, Task, Tasks } from '@/hooks/useTask'
import { defineStore } from 'pinia'
import { useEventStore } from '@/store/useEventStore'

export type CustomTasks = {
    label: string
    items: Tasks
}

export const useTaskStore = defineStore('task_store', {
    state: () => ({
        tasks: [] as Tasks,
        custom: [] as CustomTasks[],
    }),
    getters: {
        getAll: (state) => state.tasks,
        getCustom: (state) => state.custom,
        getPinned: (state): Tasks => state.tasks.filter(e => e.progressStatus === 'pinned'),
        getProcessing: (state): Tasks => state.tasks.filter(e => e.progressStatus === 'processing'),
        getDone: (state): Tasks => state.tasks.filter(e => e.progressStatus === 'done'),
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
    },
    actions: {
        /** 
         * 向tasks数组添加元素
         */
        push(e: Tasks) {
            this.tasks.push(...e)
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
         * 在custom中创建一个集合，默认items为空数组
         */
        createCollection(label: string, items = [] as Tasks) {
            this.custom.push({
                label,
                items
            })
        },

        /**
         * 向custom添加元素
         */
        insertToCollection(label: string, items: Tasks) {
            this.custom.map(e => {
                if(e.label === label) {
                    e.items.push(...items)
                }
                return e
            })
        },
    },
    persist: true
})
