
import { useList } from '@/hooks/useList'
import type { Item, ListFunctionInterface } from '@/hooks/useList'
import { locale } from 'moment'

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
try {
    var taskList: ListFunctionInterface  = useList('bre97-web-todo-tasks')
    var binList: ListFunctionInterface   = useList('bre97-web-todo-bin')
    var focusList: ListFunctionInterface = useList('bre97-web-todo-focus')
} catch {
    console.log('Please check your Applications Local Storage, We have been delete your invaild local storage.');
    
    localStorage.clear()

    location.reload()
}

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