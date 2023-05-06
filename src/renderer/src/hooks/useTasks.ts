import { useList } from '@/hooks/useList'
import type { Item, ListFunctionInterface } from '@/hooks/useList'

// interface TaskOperate {
//     MoveTo: void,
//     Remove: void,
// }

/**
 * 初始化所有关于bin、focus、tasks的变量
 * 这将作为全局对象并provide
 */
const taskList: ListFunctionInterface  = useList('bre97-web-todo-tasks')
const binList: ListFunctionInterface   = useList('bre97-web-todo-bin')
const focusList: ListFunctionInterface = useList('bre97-web-todo-focus')

/**
 * 将元素e保存到bin，并将e从当前tasks中删除
 * @param {Object} e 需要被移动到Bin的元素
 */
const moveToBin = (e: Item) => {
    taskList.remove(e)
    focusList.remove(e)
    binList.push(e)
}
/**
 * 将元素e保存到tasks，并将e从当前bin中删除
 * @param {Object} e 需要被移动到Tasks的元素
 */
const moveToTasks = (e: Item) => {
    taskList.push(e)
    binList.remove(e)
    focusList.remove(e)
}
const moveToFocus = (e: Item) => {
    taskList.remove(e)
    focusList.push(e)
}
const removeTask  = (e: Item) => taskList.remove(e)
const removeFocus = (e: Item) => focusList.remove(e)
const removeBin   = (e: Item) => binList.remove(e)

/**
 * 共享至组件
 */
export default function useTasks() {
    return {
        taskList,
        focusList,
        binList,
        moveToBin,
        moveToFocus,
        moveToTasks,
        removeBin,
        removeFocus,
        removeTask
    }
}