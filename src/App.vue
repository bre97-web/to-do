<script>
import overview from './components/overview.vue'
import now from './components/time.vue'
import about from './components/about.vue'
import dark from './components/dark.vue'
import navRail from './components/navRail.vue'
import doneTasks from './components/doneTasks.vue'
import searchTasks from './components/searchTasks.vue'
import pinTasks from './components/pinTasks.vue'
import helper from './components/helper.vue'

import moment from 'moment'
import PubSub from 'pubsub-js'


console.log(`
///////////           ///////
    //               //     //
   //       //\\     //     //   //\\
  //        \\//    ///////      \\//

`);


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

export default {
    data() {
        return {
            /**
             * 1: Earliest
             * 2: Latest
             */
            sortType: '1',
            
            /**
             * 用于搜索和添加功能。创建task时依赖keyWord的值。
             */
            keyWord: '',

            /**
             * tasks保存了任务，其位于localStorage的tasks。
             */
            tasks: JSON.parse(localStorage.getItem('tasks')) || [],
            
            /**
             * pageList是页面上的侧栏名称。
             */
            pageList: [
                "Overview",
                "Pin",
                "Done",
                "Search",
                "Help",
            ],
            /**
             * pageFocus是页面当前展示的页面名称。
             */
            pageFocus: 'Overview',
            /**
             * 用于页面中的动画切换效果。位于Transition名为page。
             */
            isTablePage: true,
       }
    },
    watch: {
        tasks: {
            immediate: false,
            deep: true,
            handler(v) {
                localStorage.setItem('tasks', JSON.stringify(v))
            }
        },
        /**
         * 监测到sortType属性更改后立即**对tasks排序**。
         */
        sortType: {
            handler() {
                this.sort(this.tasks)
            }
        },

        /**
         * 监测pageFocus的更改，当pageFocus发生变化时将isTablePage设为false，定时器0.24s之后将isTablePage设为true。
         */
        pageFocus: {
            handler() {
                this.isTablePage = false
                // 设为0.24s防止页面切换时闪烁
                setTimeout(() => this.isTablePage = true, 240)
            }
        }
    },
    methods: {
        /**
         * **添加一个任务到tasks**，配置自动完成。
         */
        add() {
            if(this.keyWord == null || this.keyWord === '') {
                return
            }

            this.tasks.push({
                id: id(),
                text: this.keyWord,
                date: date(),
                done:false,
                isModifying: false,
                pin: false,
            })

            this.clearKeyWord()
        },
        
        remove(_, e) {
            this.tasks = this.tasks.filter((p) => p !== e)
        },
        done(_, e) {
            e.done = true
        },
        undo(_, e) {
            e.done = false
        },
        /**
         * 修改e的值，数据来源于task。不会修改e.id。
         */
        edit(_, {e,task}) {
            var index = this.tasks.indexOf(e)

            //this.tasks[index].id   = task.id
            this.tasks[index].text = task.text
            this.tasks[index].date = task.date
            this.tasks[index].done = task.done
            this.tasks[index].pin  = task.pin
            this.tasks[index].isModifying = task.isModifying
        },
        pin(_, e) {
            e.pin = true
        },
        unpin(_, e) {
            e.pin = false
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
        },

        setPageFocus(v) {
            this.pageFocus = v
        },

    },
    mounted() {

        /**
         * 添加关于操作tasks的订阅。
         */
        this.addPubId = PubSub.subscribe('add', this.add)
        this.donePubId = PubSub.subscribe('done', this.done)
        this.undoPubId = PubSub.subscribe('undo', this.undo)
        this.removePubId = PubSub.subscribe('remove', this.remove)
        this.editPubId = PubSub.subscribe('edit', this.edit)
        this.pinPubId = PubSub.subscribe('pin', this.pin)
        this.unpinPubId = PubSub.subscribe('unpin', this.unpin)
    },
    beforeDestroy() {

        /**
         * 销毁关于tasks的订阅。
         */
        PubSub.unsubscribe(this.addPubId)
        PubSub.unsubscribe(this.donePubId)
        PubSub.unsubscribe(this.undoPubId)
        PubSub.unsubscribe(this.removePubId)
        PubSub.unsubscribe(this.editPubId)
        PubSub.unsubscribe(this.pinPubId)
        PubSub.unsubscribe(this.undoPubId)
    },
    components: {
        overview,
        now,
        about,
        dark,
        navRail,
        doneTasks,
        searchTasks,
        pinTasks,
        helper,
    },
}
</script>

<template>
    <div class="mt-16">
        
        <header class="fixed top-0 h-16 w-full z-20">
            <!-- TopBar on md -->
            <div class="bg-blue-500 h-full flex flex-wrap items-center justify-center gap-2  pl-5 pr-5">
                <div class="flex-grow flex items-center justify-center gap-2">
                    <input @keydown.enter="add()"   class="max-w-lg w-full h-10 rounded-md outline-none shadow p-2 focus:ring dark:ring-white dark:bg-black dark:text-white" type="text" placeholder="Search or add a task" v-model="keyWord">
                    <button @click="add()" type="normal" class="font-bold">Add</button>
                    <select v-model="sortType" class="hidden sm:block outline-none font-medium rounded-md border h-10 dark:bg-black dark:text-white dark:border-none">
                        <option value="1">Earliest</option>
                        <option value="2">Latest</option>
                    </select>
                </div>
        
                <dark class="hidden sm:block"></dark>
            </div>

        </header>

        <body class="min-h-screen flex flex-col xl:flex-row items-center justify-between dark:bg-gray-900 dark:text-white">
            <div class="xl:top-16 sticky flex flex-col gap-10 self-start w-5/6 max-w-3xl mx-auto xl:mx-0 xl:w-64 pt-10 xl:pl-5 xl:pr-5">
    
                <!-- Time -->
                <now></now>
    
                <!-- Nav Rail -->
                <navRail @setPage="setPageFocus" :list="pageList" :focus="pageFocus"></navRail>

            </div>
    
    
    
            <!-- Pages -->
            <Transition name="page" appear>
                <div v-show="isTablePage" class="relative flex-grow flex-shrink w-full h-full xl:max-w-3xl 2xl:max-w-4xl self-start">
                    
                    <!-- Overview page is Default, it is controlled by navRail -->
                    <overview v-if="'Overview' === pageFocus" :tasks="tasks" :keyWord="keyWord"></overview>
                    
                    <pinTasks v-else-if="'Pin' === pageFocus" :forceVisible="true" :tasks="tasks"></pinTasks>
        
                    <doneTasks v-else-if="'Done' === pageFocus" :forceVisible="true" :tasks="tasks"></doneTasks>
                    
                    <searchTasks v-else-if="'Search' === pageFocus" :forceVisible="true" :tasks="tasks" :keyWord="keyWord"></searchTasks>
        
                    <helper v-else-if="'Help' === pageFocus"></helper>
                </div>
            </Transition>

            <div class="xl:top-16 sticky self-start w-64 pt-10 hidden xl:block">
                <about></about>
            </div>
        </body>

        <footer>
            
        </footer>

    </div>




</template>

<style lang="css">
    ::-webkit-scrollbar {
        display: none;
    }

    .panel {
        @apply mt-10 mb-20 m-10 p-5 border rounded-xl flex flex-col items-start justify-center gap-4;
        @apply md:max-w-3xl md:mx-auto;
        @apply lg:max-w-4xl;
        @apply xl:border-none xl:w-full xl:p-0 xl:max-w-none;
    }
    .panel ul {
        @apply w-full;
    }

    li {
        @apply md:hover:shadow-md;
        @apply dark:border-gray-500;
    }

    button {
        @apply h-10 flex gap-2 items-center justify-center rounded-full p-5;
        @apply focus:ring;
        @apply dark:text-white dark:ring-white;
    }
    button[type=risk] {
        @apply hover:bg-red-100 active:bg-red-500 active:text-white p-5;
        @apply dark:hover:bg-red-900 dark:active:bg-red-500;
    }
    button[type=safe] {
        @apply hover:bg-green-100 active:bg-green-500 active:text-white p-5;
        @apply dark:hover:bg-green-900 dark:active:bg-green-500;
    }
    button[type=info] {
        @apply hover:bg-yellow-100 active:bg-yellow-500 p-5;
        @apply dark:hover:bg-yellow-900 dark:active:bg-yellow-500;
    }
    button[type=love] {
        @apply hover:bg-red-100 dark:hover:bg-gray-800 p-5 text-red-500;
    }
    button[type=medium] {
        @apply hover:bg-gray-100 dark:hover:bg-gray-800 p-5;
    }
    button[type=normal] {
        @apply rounded-md shadow hover:shadow-md active:shadow-xl p-5;
        @apply bg-white p-5;
        @apply dark:bg-black;
    }

    .sticky {
        position: static;
    }
    @media (min-width:1280px) {
        .sticky {
            position: sticky;
        }
    }


    /**
        用于本文件的页面切换效果。
    */
    .page-leave-active {
        animation: table 0.25s;
    }
    @keyframes table {
        from {
            opacity: 0;
            left: 20px;
        } to {
            opacity: 1;
            left: 0px;
        }
    }


    /**
        用于几个Tasks的Transition标签的动画效果。
    */
    .list-enter-active,
    .list-leave-active {
        transition: all 0.5s ease;
    }
    .list-enter-from,
    .list-leave-to {
        opacity: 0;
        transform: translateX(10px);
    }
</style>