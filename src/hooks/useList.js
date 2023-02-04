
import {
    reactive,
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


export default function useList() {

    const get = () => TASKS
    const getValues = () => TASKS.list
    const length = () => TASKS.list.length
    const add = () => push()
    const put = () => push()
    const push = (e) => {
        TASKS.list.push({
            ...e,
            date: createDate(),
            index: createIndex(),
        })
    }
    const remove = (e) => TASKS.list = TASKS.list.filter(element => e.index != element.index)
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

    return {
        get,
        getValues,
        length,
        add,
        put,
        push,
        remove,
        edit,
    }
}