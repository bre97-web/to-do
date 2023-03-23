
import {
    reactive,
} from 'vue'


const TASKS = reactive(JSON.parse(localStorage.getItem('bin')) || {
    list: [
        {
            date: '1970-1-1',
            index: 0,
            title: '任何任务都没有被放入回收站',
            subtitle: '移步到删除按钮进行删除',
        }
    ],
})


export default function useBin() {

    const get = () => TASKS
    const getValues = () => TASKS.list
    const length = () => TASKS.list.length
    const add = (e) => push(e)
    const put = (e) => push(e)
    const push = (e) => {
        TASKS.list.push(e)
    }
    const remove = (e) => TASKS.list = TASKS.list.filter(element => e.index !== element.index)
    const edit = (e) => {
        var index = null

        for(index = 0; index < TASKS.list.length; index ++) {
            if(e.index == TASKS.list[index].index) {
                break
            }
        }

        TASKS.list[index] = e
    }
    const save = () => localStorage.setItem('bin', JSON.stringify(TASKS))

    return {
        get,
        getValues,
        length,
        add,
        put,
        push,
        remove,
        edit,
        save,
    }
}