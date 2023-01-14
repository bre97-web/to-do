<script>
import moment from 'moment'

import DoingTasks from './doingTasks.vue'
import DoneTasks from './doneTasks.vue'
import SearchTasks from './searchTasks.vue'

/**
 * 返回UNIX时间戳
 */
function id() {
    return moment().format('X')
}

export default {
    data() {
        return {
            /**
             * 1: Earliest
             * 2: Latest
             */
            sortType: '1',
            
            keyWord: '',

            tasks: JSON.parse(localStorage.getItem('tasks')) || []
            
       }
    },
    computed: {
    },
    watch: {
        tasks: {
            immediate: false,
            deep: true,
            handler(v) {

                
                localStorage.setItem('tasks', JSON.stringify(v))
            }
        },
        sortType: {
            handler() {
                this.sort(this.tasks)
            }
        }
    },
    methods: {
        /**
         * 添加一个任务到tasks，传入text作为任务文本，其余配置自动完成。
         * @param {String} text
         */
        add(text) {
            if(text === null || text === '') {
                return
            }

            this.tasks.push({
                id: id(),
                text: text,
                done:false
            })

            this.clearKeyWord()
        },
        add() {
            if(this.keyWord === null || this.keyWord === '') {
                return
            }

            this.tasks.push({
                id: id(),
                text: this.keyWord,
                done:false
            })

            this.clearKeyWord()
        },
        remove(e) {
            this.tasks = this.tasks.filter((p) => p !== e)
        },
        done(e) {
            setTimeout(() => e.done = true, 500)
        },
        undo(e) {
            setTimeout(() => e.done = false, 500)
        },

        

        clearKeyWord() {
            this.keyWord = ''
        },
        sort(e) {
            if(this.sortType) {
                e.sort((a, b) => {
                    return this.sortType === '1' ? a.id - b.id : b.id - a.id
                })
            }

            return e
        },

    },
    components: {
        done: DoneTasks,
        doing: DoingTasks,
        search: SearchTasks,
    }
}

</script>

<template>


    <div class="mt-10 mb-20 flex flex-col items-center justify-center gap-10">
        <search :tasks="tasks" :keyWord="keyWord"></search>

        <doing :tasks="tasks"></doing>

        <done :tasks="tasks"></done>

        <div class="fixed bottom-5 w-full z-20">
            <div class="lg:max-w-4xl mx-auto flex flex-wrap items-center justify-center gap-2">
                <input @keydown.enter="add"   class="outline-none rounded-md border shadow-md bg-white w-1/2 h-10 focus:ring" type="text" placeholder="Search or add a task" v-model="keyWord">
                <button @click="add"          class="font-bold rounded-md border shadow-md bg-white w-14 h-10 hover:shadow-lg focus:ring active:bg-gray-100">Add</button>
                <select v-model="sortType" class="outline-none font-medium rounded-md border w-18 h-10 hover:shadow-lg focus:ring">
                    <option value="1">Earliest</option>
                    <option value="2">Latest</option>
                </select>
            </div>
        </div>
    </div>

</template>
