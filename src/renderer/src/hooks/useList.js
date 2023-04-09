/**
 * useList.js
 * import {
 *     useList, useInnerList
 * }
 * useList提供所有的关于操作全局reactive对象TASKS，TASKS被watch时保存到本地存储localStorage。
 * useInnerList会为每一个变量创建一个只属于自己的局部reactive变量tasks，通过useInnerList得到的方法操作的是它的局部reactive对象。
 */

import { reactive, watch } from 'vue'
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
 * **这是一个公有的对象**TASKS，通过use.List()得到的方法而操作的对象一定是全局的TASKS
 */
var TASKS = reactive(
    JSON.parse(localStorage.getItem('bre97-web-todo-tasks')) || {
        list: [
            {
                date: createDate(),
                index: createIndex(),
                title: '任何任务都没有被创建',
                subtitle: '移步到搜索框或者创建按钮进行创建',
                tag: ['welcome']
            }
        ]
    }
)

/**
 * 当全局对象TASKS状态变化时将TASKS保存到localStorage
 */
watch(TASKS, () => localStorage.setItem('bre97-web-todo-tasks', JSON.stringify(TASKS)))

/**
 * 在push添加元素时判断元素是否存在，如果元素存在则返回true
 */
const contain = (list, e) => {
    for (let key in list.list) {
        if (e.index == list.list[key].index) {
            return true
        }
    }

    return false
}

/**
 * 操作tasks请调用useInnerList()，useList会为每一个调用者创建一个局部对象
 */
function useInnerList(item) {
    /**
     * item参数是必须提供的
     */
    if (item === '' || typeof item === 'undefined') {
        return undefined
    }

    var tasks = reactive(
        JSON.parse(localStorage.getItem(item)) || {
            list: []
        }
    )

    const get = () => tasks
    const getValues = () => tasks.list
    const push = (e) => {
        if (contain(tasks, e)) {
            return null
        }
        tasks.list.push({
            ...e,
            date: typeof e.date !== 'string' ? createDate() : e.date,
            index: typeof e.index !== 'string' ? createIndex() : e.index,
        })
    }
    const remove = (e) => (tasks.list = tasks.list.filter(element => e.index != element.index))

    /**
     * 为当前的局部reactive对象监听保存到localStorage
     * 保存在localStorage中，名为item（item由调用useInnerList的地方提供）
     */
    watch(tasks, () => localStorage.setItem(item, JSON.stringify(tasks)))

    return {
        get,
        getValues,
        push,
        remove,
    }
}

/**
 * 通过useList()得到的方法操作的全局对象TASKS，多个useList()创建的变量共享同一个全局变量TASKS
 * @returns Object
 */
function useList() {
    const get = () => TASKS
    const getValues = () => TASKS.list
    const length = () => TASKS.list.length
    const add = (e) => push(e)
    const put = (e) => push(e)
    const push = (e) => {
        if (contain(TASKS, e)) {
            return null
        }
        TASKS.list.push({
            ...e,
            date: typeof e.date !== 'string' ? createDate() : e.date,
            index: typeof e.index !== 'string' ? createIndex() : e.index,
        })
    }
    const remove = (e) => TASKS.list = TASKS.list.filter(element => e.index != element.index)
    const removeAll = () => TASKS.list = []
    const edit = (e) => {
        var targetIndex = e.index
        var index = null

        for (index = 0; index < TASKS.list.length; index ++) {
            if (targetIndex == TASKS.list[index].index) {
                break
            }
        }

        TASKS.list[index] = e
    }

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
    }
}

export {
    useList,
    useInnerList,
}