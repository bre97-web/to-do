<script>
import moment from 'moment'

import DoingTasks from './doingTasks.vue'
import DoneTasks from './doneTasks.vue'
import SearchTasks from './searchTasks.vue'
import Dark from './dark.vue'

/**
 * 返回UNIX时间戳
 */
function id() {
    return moment().format('X')
}
function date() {
    return moment().format('YYYY-MM-DD')
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
         * 添加一个任务到tasks，传入arguments作为任务的信息，其余配置自动完成。
         * @param {Object} text
         */
        add(text) {
            if(text == null || text === '') {
                return
            }

            if(text == undefined) {
                console.log(12);
            }

            this.tasks.push({
                id: id(),
                text: text,
                date: date(),
                done:false,
                isModifying: false,
            })

            this.clearKeyWord()
        },
        
        remove(e) {
            setTimeout(() => this.tasks = this.tasks.filter((p) => p !== e), 500)
        },
        done(e) {
            setTimeout(() => e.done = true, 500)
        },
        undo(e) {
            setTimeout(() => e.done = false, 500)
        },
        /**
         * 修改e的值，数据来源于task
         * @param {Object} e 
         * @param {Object} task 
         */
        edit(e, task) {
            e.text = task.text
            e.date = task.date
            e.done = task.done
            
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
        dark: Dark,
    }
}

</script>

<template>


    <div class="noShadow mt-10 mb-20 flex flex-col items-center justify-center gap-10">
        <search :tasks="tasks" :keyWord="keyWord" @add="add" @remove="remove" @done="done" @undo="undo" @edit="edit"></search>

        <doing :tasks="tasks" @remove="remove" @done="done" @edit="edit"></doing>

        <done :tasks="tasks" @remove="remove" @undo="undo" @edit="edit"></done>




        <!-- TopBar on xl -->
        <div class="bar fixed top-0 pl-10 pr-10 hidden xl:flex">
            <div class="flex-grow flex items-center justify-center gap-2">
                <input @keydown.enter="add(this.keyWord)"   class="max-w-lg w-1/2 h-10 rounded-md outline-none border xl:border-none shadow xl:shadow-none hover:shadow-md active:shadow-xl focus:ring p-5" type="text" placeholder="Search or add a task" v-model="keyWord">
                <button @click="add(this.keyWord)" type="normal" class="font-bold">Add</button>
                <select v-model="sortType" class="outline-none font-medium rounded-md border w-18 h-10 hover:shadow-lg focus:ring">
                    <option value="1">Earliest</option>
                    <option value="2">Latest</option>
                </select>
            </div>

            <dark></dark>

        </div>
        <!-- BotBar on normal -->
        <div class="bar fixed bottom-0 xl:hidden">
            <input @keydown.enter="add(this.keyWord)"   class="max-w-lg outline-none w-1/2 h-10 rounded-md border xl:border-none shadow xl:shadow-none hover:shadow-md active:shadow-xl focus:ring p-5" type="text" placeholder="Search or add a task" v-model="keyWord">
            <button @click="add(this.keyWord)" type="normal" class="font-bold border xl:border-none">Add</button>
            <select v-model="sortType" class="outline-none font-medium rounded-md border w-18 h-10 hover:shadow-lg focus:ring">
                <option value="1">Earliest</option>
                <option value="2">Latest</option>
            </select>
        </div>
    </div>

</template>

<style lang="css">

    input {
        @apply bg-white rounded-md;
        @apply dark:bg-black;
    }
    select {
        @apply rounded-md border xl:border-none shadow xl:shadow-none hover:shadow-md active:shadow-xl focus:ring p-5;
        @apply dark:bg-black;

    }

    .bar {
        @apply xl:bg-blue-500 h-16 w-full z-20 mx-auto flex flex-wrap items-center justify-center gap-2;
    }
    .panel {
        @apply border rounded-xl flex flex-col gap-2 flex-wrap w-5/6 p-5 mb-10;
        @apply lg:max-w-3xl;
        @apply xl:border-none xl:w-full xl:p-0 xl:max-w-none xl:mb-16;
    }
    li {
        @apply xl:hover:shadow-md;
        @apply dark:border-gray-500;
    }

    button {
        @apply h-10 flex gap-2 items-center justify-center rounded-full p-5;
        @apply focus:ring;
        @apply dark:text-white dark:ring-white;
    }
    button[type=risk] {
        @apply hover:bg-red-50 active:bg-red-500 active:text-white p-5;
        @apply dark:hover:bg-red-900 dark:active:bg-red-500;
    }
    button[type=safe] {
        @apply hover:bg-green-50 active:bg-green-500 active:text-white p-5;
        @apply dark:hover:bg-green-900 dark:active:bg-green-500;
    }
    button[type=info] {
        @apply hover:bg-yellow-50 active:bg-yellow-500 p-5;
        @apply dark:hover:bg-yellow-900 dark:active:bg-yellow-500;
    }
    button[type=normal] {
        @apply rounded-md shadow hover:shadow-md active:shadow-xl p-5;
        @apply bg-white p-5;
        @apply dark:bg-black;
    }
</style>