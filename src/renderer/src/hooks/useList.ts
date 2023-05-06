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
interface Step {
    steps?: string[]
    
}
/**
 * Item的标识符，其中index的生成结果应该是唯一的
 */
interface Identifiable {
    index?: number,
    date?: string
}

type Item  = Title & Note & Tag & Identifiable & Step
type Items = Item[]

interface ListGet {
    get: () => Items,
    length?: () => number,
}
interface ListUpdate {
    push: (e: Item) => boolean,
    remove: (e: Item) => any,
    edit: (from: Item, to: Item) => any
}
type ListFunctionInterface = ListGet & ListUpdate


/**
 * 操作tasks请调用useInnerList()，useList会为每一个调用者创建一个局部对象
 */
function useList(localStorageName: string): ListFunctionInterface {
    type List = {
        value: Items
    }
    var tasks = reactive<List>(JSON.parse(localStorage.getItem(localStorageName) as string) || { value: []})

    tasks.value.forEach(element => {
        if (!element['tags']) {
            element['tags'] = ['']
        }
    
        if (!element['note']) {
            element['note'] = ''
        }

        if (!element['steps']) {
            element['steps'] = ['']
        }
    })

    /**
     * 为当前的局部reactive对象监听保存到localStorage
     * 保存在localStorage中，名为item（item由调用useInnerList的地方提供）
     */
    watch(tasks, () => {
        console.log('changed');
        
        localStorage.setItem(localStorageName, JSON.stringify(tasks))
    })

    const get = (): Items => tasks.value
    const length            = (): number => tasks.value.length
    const push = (e: Item): boolean => {
        if (tasks.value.indexOf(e) !== -1) {
            return false
        }
        
        tasks.value.push({
            ...e,
            date: e['date'] === undefined ? createDate() : e.date,
            index: e['index'] === undefined ? createIndex() : e.index,
        })
        return true
    }
    const remove = (e: Item): any => tasks.value = tasks.value.filter(el => e.index !== el.index)
    const edit = (from: Item, to: Item): any => {
        for(let e = 0; e < tasks.value.length; e ++) {
            if(tasks.value[e].index === from.index) {
                tasks.value[e] = {
                    ...to
                }
            }
        }
    }
    

    return {
        get,
        length,
        push,
        remove,
        edit
    }
}

export {
    useList
}

export type { Item, Items, Step, ListFunctionInterface }
