<script>
import now from './components/time.vue'
import about from './components/about.vue'
import dark from './components/dark/dark.vue'

import { mapState, mapActions, mapMutations, mapGetters } from 'vuex'

console.log(`
///////////           ///////
    //               //     //
   //       //\\     //     //   //\\
  //        \\//    ///////      \\//

`);




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
       }
    },
    computed: {
        ...mapState('tasksStore', {
            tasks: state => state.list
        }),
        ...mapGetters('tasksStore', ['getPinned', 'getDone', 'getDoing']),
    },
    watch: {
        tasks: {
            immediate: false,
            deep: true,
            handler() {
                this.SAVE()
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
    },
    methods: {        
        ...mapActions('tasksStore', ['add']),
        ...mapMutations('tasksStore', ['SAVE']),
        
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

        push(to) {
            this.$router.push(to)
        },
    },
    mounted() {

    },
    components: {
        now,
        about,
        dark,
    },
}
</script>

<template>
    <div class="mt-16">
        
        <header class="fixed top-0 h-16 w-full z-20">
            <!-- TopBar on md -->
            <div class="bg-blue-500 h-full flex flex-wrap items-center justify-center gap-2  pl-5 pr-5">
                <div class="flex-grow flex items-center justify-center gap-2">
                    <input @keydown.enter="add(keyWord)"   class="max-w-lg w-full h-10 rounded-md outline-none shadow p-2 focus:ring dark:ring-white dark:bg-black dark:text-white" type="text" placeholder="Search or add a task" v-model="keyWord">
                    <button @click="add(keyWord)" type="normal" class="font-bold">Add</button>
                    <select v-model="sortType" class="hidden sm:block outline-none font-medium rounded-md border h-10 dark:bg-black dark:text-white dark:border-none">
                        <option value="1">Earliest</option>
                        <option value="2">Latest</option>
                    </select>
                </div>
        
                <dark class="hidden sm:block"></dark>
            </div>

        </header>

        <main class="min-h-screen flex flex-col xl:flex-row items-center justify-between dark:bg-gray-900 dark:text-white">
            <div class="xl:top-16 sticky flex flex-col gap-10 self-start w-5/6 max-w-3xl mx-auto xl:mx-0 xl:w-64 pt-10 xl:pl-5 xl:pr-5">
    
                <!-- Time -->
                <now></now>
    
                <!-- Nav Rail -->
                <div class="flex flex-wrap gap-1 font-medium flex-row xl:flex-col">


                    <button @click="setPageFocus('Overview');push({
                        path: '/',
                    })" class="rounded-md pr-5 mr-5 flex gap-4 place-content-start focus:ring-0 hover:bg-gray-50 dark:hover:bg-gray-800" :class="{'font-bold bg-gray-100 hover:bg-gray-100 dark:bg-gray-700 dark:hover:bg-gray-700 ':pageFocus === 'Overview'}">
                        <div class="w-1 h-4 rounded-full bg-blue-500 dark:bg-blue-100 relative left-0 opacity-0" :class="{'opacity-100 left-1':pageFocus === 'Overview'}"></div>
                        Overview
                    </button>

                    <button @click="setPageFocus('Pin');push({
                        path: '/pin',
                    })" class="rounded-md pr-5 mr-5 flex gap-4 place-content-start focus:ring-0 hover:bg-gray-50 dark:hover:bg-gray-800" :class="{'font-bold bg-gray-100 hover:bg-gray-100 dark:bg-gray-700 dark:hover:bg-gray-700 ':pageFocus === 'Pin'}">
                        <div class="w-1 h-4 rounded-full bg-blue-500 dark:bg-blue-100 relative left-0 opacity-0" :class="{'opacity-100 left-1':pageFocus === 'Pin'}"></div>
                        Pin
                    </button>

                    <button @click="setPageFocus('Done');push({
                        path: '/done',
                    })" class="rounded-md pr-5 mr-5 flex gap-4 place-content-start focus:ring-0 hover:bg-gray-50 dark:hover:bg-gray-800" :class="{'font-bold bg-gray-100 hover:bg-gray-100 dark:bg-gray-700 dark:hover:bg-gray-700 ':pageFocus === 'Done'}">
                        <div class="w-1 h-4 rounded-full bg-blue-500 dark:bg-blue-100 relative left-0 opacity-0" :class="{'opacity-100 left-1':pageFocus === 'Done'}"></div>
                        Done
                    </button>

                    <button @click="setPageFocus('Search');push({
                        name: 'search',
                    })" class="rounded-md pr-5 mr-5 flex gap-4 place-content-start focus:ring-0 hover:bg-gray-50 dark:hover:bg-gray-800" :class="{'font-bold bg-gray-100 hover:bg-gray-100 dark:bg-gray-700 dark:hover:bg-gray-700 ':pageFocus === 'Search'}">
                        <div class="w-1 h-4 rounded-full bg-blue-500 dark:bg-blue-100 relative left-0 opacity-0" :class="{'opacity-100 left-1':pageFocus === 'Search'}"></div>
                        Search
                    </button>

                    <button @click="setPageFocus('Help');push({
                        path: '/helper',
                    })" class="rounded-md pr-5 mr-5 flex gap-4 place-content-start focus:ring-0 hover:bg-gray-50 dark:hover:bg-gray-800" :class="{'font-bold bg-gray-100 hover:bg-gray-100 dark:bg-gray-700 dark:hover:bg-gray-700 ':pageFocus === 'Help'}">
                        <div class="w-1 h-4 rounded-full bg-blue-500 dark:bg-blue-100 relative left-0 opacity-0" :class="{'opacity-100 left-1':pageFocus === 'Help'}"></div>
                        Helper
                    </button>


                </div>

            </div>
    
    
    
            <!-- Pages -->
            <div class="relative flex-grow flex-shrink w-full h-full xl:max-w-3xl 2xl:max-w-4xl self-start">
                
                <Transition name="list">
                    <router-view :keyWord="keyWord"></router-view>
                </Transition>
            </div>

            <div class="xl:top-16 sticky self-start w-64 pt-10 hidden xl:block">
                <about></about>
            </div>
        </main>

        <footer>
            
        </footer>

    </div>




</template>

<style lang="css">
    ::-webkit-scrollbar {
        display: none;
    }

    .panel {
        @apply m-10 p-5 border rounded-xl flex flex-col items-start justify-center gap-4;
        @apply lg:max-w-4xl lg:mx-auto lg:w-full;
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