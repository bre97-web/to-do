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
 * 在push添加元素时判断元素是否存在，如果元素存在则返回true
 */
const contain = (list: List, e: Item): boolean => {
    for (let key in list.list) {
        if (e.index === list.list[key].index) {
            return true
        }
    }
    return false;
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
function useList(localStorageName: string): ListFunctionInterface {
    var tasks = reactive<List>(
        JSON.parse(localStorage.getItem(localStorageName) as string) || {
            list: []
        }
    )

    tasks.list.forEach(element => {
        if (!element['tags']) {
            element['tags'] = ['']
        }
    
        if (!element['note']) {
            element['note'] = ''
        }
    })

    const get = (): List => tasks
    const getValues = (): Item[] => tasks.list
    const length            = (): number => tasks.list.length
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

        for (index = 0; index < tasks.list.length; index ++) {
            if (targetIndex == tasks.list[index].index) {
                break
            }
        }

        tasks.list[index] = e
    }

    /**
     * 为当前的局部reactive对象监听保存到localStorage
     * 保存在localStorage中，名为item（item由调用useInnerList的地方提供）
     */
    watch(tasks, () => localStorage.setItem(localStorageName, JSON.stringify(tasks)))

    return {
        get,
        getValues,
        length,
        push,
        remove,
        edit
    }
}

export {
    useList
}

export type { Item, Items, ListFunctionInterface }
