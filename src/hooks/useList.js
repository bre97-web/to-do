
import {
    ref, reactive, onBeforeUpdate, watch, onBeforeMount
} from 'vue'
import moment from "moment"

/**
 * 使用moment().format('x')时间戳作为每个元素的index
 */
const createIndex = () => moment().format('x')

/**
 * 使用YYYY-MM-DD格式的日期作为每一个元素的日期
 * @returns 返回一个YYYY-MM-DD格式的日期
 */
const createDate = () => moment().format('YYYY-MM-DD')





/**
 * **这是一个公有的对象**TASKS，通过use.List()得到的方法而操作的对象一定是TASKS。
 */
const TASKS = reactive(JSON.parse(localStorage.getItem('tasks')) || {
    list: [
        {
            date: createDate(),
            index: createIndex(),
            title: '任何任务都没有被创建',
            subtitle: '移步到搜索框或者创建按钮进行创建',
        }
    ],
})

/**
 * 操作tasks请调用useInnerList()
 */
function useInnerList(item) {

    if(item == '' || typeof item == 'undefined') {
        return undefined
    }

    var tasks = reactive(JSON.parse(localStorage.getItem(item)) || {
        list: []
    })

    
    const get = () => tasks
    const getValues = () => tasks.list
    const push = (e) => {
        tasks.list.push({
            ...e,
            date: createDate(),
            index: createIndex(),
        })
    }
    const remove = (e) => tasks.list = tasks.list.filter(element => e.index != element.index)
    /**
     * 请不要在这里中设置watch
     */
    const save = () => localStorage.setItem(item, JSON.stringify(tasks))

    watch(tasks, () => save())

    return {
        get,
        getValues,
        push,
        remove,
        save
    }
}


function useList() {
    const get = () => TASKS
    const getValues = () => TASKS.list
    const length = () => TASKS.list.length
    const add = (e) => push(e)
    const put = (e) => push(e)
    const push = (e) => {
        TASKS.list.push({
            ...e,
            date: createDate(),
            index: createIndex(),
        })
    }
    const remove = (e) => TASKS.list = TASKS.list.filter(element => e.index != element.index)
    const removeAll = () => TASKS.list = []
    const edit = (e) => {
        var targetIndex = e.index
        var index = null

        for(index = 0; index < TASKS.list.length; index ++) {
            if(targetIndex == TASKS.list[index].index) {
                break
            }
        }

        TASKS.list[index] = e
    }
    const save = () => localStorage.setItem('tasks', JSON.stringify(TASKS))

    return {
        get,
        getValues,
        length,
        add,
        put,
        push,
        remove,
        removeAll,
        edit,
        save,
    }
}

export {
    useList,
    useInnerList,
}