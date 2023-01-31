import { createStore } from "vuex"

import moment from 'moment'

/**
 * @returns 返回UNIX时间戳。
 * @see 被方法add调用，作为tasks.id。
 */
function id() {
    return moment().format('x')
}
/**
 * @returns 返回一个YYYY-MM-DD格式的日期。
 * @see 被方法add调用，作为tasks.date
 */
function date() {
    return moment().format('YYYY-MM-DD')
}

const Tasks = {
    namespaced: true,
    state: {
        list: JSON.parse(localStorage.getItem('tasks')) || [],
    },
    actions: {
        add(miniStore, keyWord) {
            if(keyWord == null || keyWord === '') {
                return
            }
            
            miniStore.commit('ADD', keyWord)
        },
        remove(miniStore, e) {
            var list = miniStore.state.list.filter((p) => p !== e)

            miniStore.commit('REMOVE', list)
        },
        done(miniStore, e) {
            var index = miniStore.state.list.indexOf(e)

            miniStore.commit('DONE', index)
        },
        undo(miniStore, e) {
            var index = miniStore.state.list.indexOf(e)

            miniStore.commit('UNDO', index)
        },
        /**
         * 修改e的值，数据来源于task。不会修改e.id。
         */
        edit(miniStore, {e, task}) {
            if(task.text == '' || task.text.length < 1) {
                return 
            }
            
            var index = miniStore.state.list.indexOf(e)

            miniStore.commit('EDIT', {
                index, 
                task
            })
        },
        pin(miniStore, e) {
            var index = miniStore.state.list.indexOf(e)
            
            miniStore.commit('PIN', index)

        },
        unpin(miniStore, e) {
            var index = miniStore.state.list.indexOf(e)
            
            miniStore.commit('UNPIN', index)
        },
    },
    mutations: {
        /**
         * **添加一个任务到list**，配置自动完成。
         */
        ADD(state, keyWord) {
            state.list.push({
                /**
                 * id根据当前系统时间的UNIX时间戳。
                 */
                id: id(),

                /**
                 * text来自用户从输入框中键入的keyWord。
                 * 截取到第一个句号、点号、逗号、感叹号、冒号、问号。
                 */
                text: keyWord.split(/[.。,，!！;:：?？]/)[0],

                /**
                 * notes来自用户从输入框中键入的完整的keyWord。
                 */
                notes: keyWord,

                /**
                 * date根据是同当前时间得到一个YYYY-MM-DD格式的日期。
                 */
                date: date(),

                /**
                 * 默认值为false。
                 */
                done:false,
                isModifying: false,
                pin: false,
            })
        },
        REMOVE(state, index) {
            state.list.splice(index, 1)
        },
        DONE(state, index) {
            state.list[index].done = true
        },
        UNDO(state, index) {
            state.list[index].done = false
        },
        PIN(state, index) {
            state.list[index].pin = true
        },
        UNPIN(state, index) {
            state.list[index].pin = false
        },
        EDIT(state, {index, task}) {
            state.list[index].id   = task.id
            state.list[index].text = task.text
            state.list[index].notes = task.notes
            state.list[index].date = task.date
            state.list[index].done = task.done
            state.list[index].pin  = task.pin
            state.list[index].isModifying = task.isModifying
        },
        SAVE(state) {
            localStorage.setItem('tasks', JSON.stringify(state.list))
        },
    },
}

export default Tasks