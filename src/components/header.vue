<script>
import { mapState, mapActions, mapGetters } from 'vuex'

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
        }
    },
    computed: {
        ...mapGetters('TasksStore', ['get', 'getKeyWord']),
    },
    watch: {
        /**
         * 监测到sortType属性更改后立即**对tasks排序**。
         */
         sortType: {
            handler() {
                this.sort(this.get)
            }
        },
        keyWord: {
            handler(newValue) {
                this.setKeyWord(newValue)
            }
        }
    },
    methods: {
        ...mapActions('TasksStore', ['add', 'setKeyWord']),
        sort(e) {
            if(this.sortType) {
                e.sort((a, b) => {
                    return this.sortType === '1' ? a.id - b.id : b.id - a.id
                })
            }
        },
    }
}
</script>

<template>
    <!-- TopBar on md -->
    <nav class="z-40 border dark:border-0 backdrop-filter backdrop-blur-md dark:bg-black fixed flex top-0 left-0 py-2 px-4 w-full">
        <div class="w-full flex">
            <div class="w-full flex items-center justify-center gap-2">
                <input @keydown.enter="add(keyWord)"   class="border max-w-lg w-full px-4 py-2 bg-white bg-opacity-75 rounded-md outline-none dark:bg-black dark:text-white" type="text" placeholder="Search or add a task" v-model="keyWord">
                <button @click="add(keyWord)" class="font-bold border rounded-md px-4 py-2 bg-white dark:bg-black text-black dark:text-white">Add</button>
                <select v-model="sortType" class="hidden sm:block outline-none font-medium rounded-md border px-4 py-2 dark:bg-black dark:text-white">
                    <option value="1">Earliest</option>
                    <option value="2">Latest</option>
                </select>
            </div>
        </div>
    </nav>
</template>