import { useList } from '@/hooks/useList'
import type { Item, ListFunctionInterface } from '@/hooks/useList'

interface TaskOperate {
    get: () => {
        taskList: ListFunctionInterface,
        binList: ListFunctionInterface,
        focusList: ListFunctionInterface
    },
    moveTo: (e: Item, from:ListFunctionInterface, to:ListFunctionInterface) => void,
    removeFrom: (e: Item, from: ListFunctionInterface) => void,
}

/**
 * 初始化所有关于bin、focus、tasks的变量
 */
const taskList: ListFunctionInterface  = useList('bre97-web-todo-tasks')
const binList: ListFunctionInterface   = useList('bre97-web-todo-bin')
const focusList: ListFunctionInterface = useList('bre97-web-todo-focus')

function useTasks(): TaskOperate {
    const get = () => ({
        taskList,
        binList,
        focusList
    })
    const moveTo = (e: Item, from:ListFunctionInterface, to:ListFunctionInterface): void => {
        from.remove(e)
        to.push(e)
    }
    const removeFrom = (e: Item, from: ListFunctionInterface): void => {
        from.remove(e)
    }

    return {
        get,
        moveTo,
        removeFrom
    }
}

export {
    useTasks
}