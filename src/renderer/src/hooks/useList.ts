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

interface Title {
    title: string,
    subtitle?: string
}
interface Note {
    note: string
}
interface Tag {
    tags: string[]
}
/**
 * Item的标识符，其中index的生成结果应该是唯一的
 */
interface Identifiable {
    index?: number,
    date?: string
}

type Item  = Title & Note & Tag & Identifiable 
type Items = Item[]
interface List {
    list: Items
}

/**
 * 使用moment().format('x')时间戳作为每个元素的index
 */
const createIndex = (): number => parseInt(moment().format('x'))

/**
 * 使用YYYY-MM-DD格式的日期作为每一个元素的日期
 * @returns 返回一个YYYY-MM-DD格式的日期
 */
const createDate = (): string => moment().format('YYYY-MM-DD')

/**
 * **这是一个公有的对象**TASKS，通过use.List()得到的方法而操作的对象一定是全局的TASKS
 */
var TASKS = reactive<List>(
    JSON.parse(localStorage.getItem('bre97-web-todo-tasks') as string) || {
        list: [
            {
                date: createDate(),
                index: createIndex(),
                title: '任何任务都没有被创建',
                subtitle: '移步到搜索框或者创建按钮进行创建',
                tag: ['welcome'],
                note: '这是备注示例'
            }
        ]
    }
)

/**
 * 挂载前检查每一个属性
 */
TASKS.list.forEach(element => {
    if (!element['tags']) {
        element['tags'] = ['']
    }

    if (!element['note']) {
        element['note'] = ''
    }
})

/**
 * 当全局对象TASKS状态变化时将TASKS保存到localStorage
 */
watch(TASKS, () => localStorage.setItem('bre97-web-todo-tasks', JSON.stringify(TASKS)))

/**
 * 在push添加元素时判断元素是否存在，如果元素存在则返回true
 */
const contain = (list: List, e: Item): boolean => {
    for (let key in list.list) {
        if (e.index === list.list[key].index) {
            return true
        }
    }

    return false
}

interface ListGet {
    get: () => List,
    getValues: () => Item[],
    length?: () => number,
}
interface ListUpdate {
    push: (e: Item) => boolean,
    remove: (e: Item) => any,
    edit: (e: Item) => any
}
type ListFunctionInterface = ListGet & ListUpdate


/**
 * 操作tasks请调用useInnerList()，useList会为每一个调用者创建一个局部对象
 */
function useInnerList(localStorageName: string): ListFunctionInterface {
    var tasks = reactive<List>(
        JSON.parse(localStorage.getItem(localStorageName) as string) || {
            list: []
        }
    )

    const get = (): List => tasks
    const getValues = (): Item[] => tasks.list
    const push = (e: Item): boolean => {
        if (contain(tasks, e)) {
            return false
        }
        tasks.list.push({
            ...e,
            date: e['date'] === undefined ? createDate() : e.date,
            index: e['index'] === undefined ? createIndex() : e.index,
        })

        return true
    }
    const remove = (e: Item): any => tasks.list = tasks.list.filter(element => e.index != element.index)
    const edit = (e: Item): any => {
        var targetIndex = e.index
        var index = null

        for (index = 0; index < TASKS.list.length; index ++) {
            if (targetIndex == tasks.list[index].index) {
                break
            }
        }

        TASKS.list[index] = e
    }

    /**
     * 为当前的局部reactive对象监听保存到localStorage
     * 保存在localStorage中，名为item（item由调用useInnerList的地方提供）
     */
    watch(tasks, () => localStorage.setItem(localStorageName, JSON.stringify(tasks)))

    return {
        get,
        getValues,
        push,
        remove,
        edit
    }
}

/**
 * 通过useList()得到的方法操作的全局对象TASKS，多个useList()创建的变量共享同一个全局变量TASKS
 * @returns Object
 */
function useList(): ListFunctionInterface {
    const get               = (): List => TASKS
    const getValues         = (): Items => TASKS.list
    const length            = (): number => TASKS.list.length
    const push              = (e: Item): boolean => {
        if (contain(TASKS, e)) {
            return false
        }
        TASKS.list.push({
            ...e,
            date: e['date'] === undefined ? createDate() : e.date,
            index: e['index'] === undefined ? createIndex() : e.index,
        })

        return true
    }
    const remove = (e: Item) => TASKS.list = TASKS.list.filter(element => e.index != element.index)
    const edit = (e: Item): any => {
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
        push,
        remove,
        edit,
    }
}

export {
    useList,
    useInnerList
}

export type { Item, Items, ListFunctionInterface }
