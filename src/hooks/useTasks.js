import { 
    useList, useInnerList
} from '@/hooks/useList'

/**
 * 初始化所有关于bin、focus、tasks的变量
 * 这将作为全局对象并provide
 */
const taskList  = useList()
const binList   = useInnerList('bre97-web-todo-bin')
const focusList = useInnerList('bre97-web-todo-focus')



/**
 * 将元素e保存到bin，并将e从当前tasks中删除
 * @param {Object} e 需要被移动到Bin的元素
 */
const moveToBin = (e) => {
    taskList.remove(e)
    focusList.remove(e)
    binList.push(e)
}
/**
 * 将元素e保存到tasks，并将e从当前bin中删除
 * @param {Object} e 需要被移动到Tasks的元素
 */
const moveToTasks = (e) => {
    taskList.push(e)
    binList.remove(e)
    focusList.remove(e)
}
const moveToFocus = (e) => {
    taskList.remove(e)
    focusList.push(e)
}
const removeTask  = (e) => taskList.remove(e)
const removeFocus = (e) => focusList.remove(e)
const removeBin   = (e) => binList.remove(e)


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