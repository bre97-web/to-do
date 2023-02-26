<script>
import now from './components/time.vue'
import about from './components/about.vue'
import header from './components/header.vue'
import PageTable from './components/pageTable.vue'

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
            
       }
    },
    computed: {
        ...mapState('TasksStore', {
            tasks: state => state.list
        }),
        ...mapGetters('TasksStore', ['getPinned', 'getDone', 'getDoing']),
        ...mapGetters('DarkStore', {'getDark':'get'})
    },
    watch: {
        tasks: {
            immediate: false,
            deep: true,
            handler() {
                this.SAVE()
            }
        },
        
    },
    methods: {        
        ...mapActions('TasksStore', ['add']),
        ...mapActions('DarkStore', {'setDark':'set'}),
        ...mapMutations('TasksStore', ['SAVE']),
        
        clearKeyWord() {
            this.keyWord = ''
        },
    },
    mounted() {

    },
    components: {
        now,
        about,
        Header: header,
        PageTable,
    },
}
</script>

<template>
    <div class="relative bg-white dark:bg-black" :class="{'dark': getDark}">
        
        <header>
            <Header></Header>
        </header>

        <main class="relative overflow-clip min-h-screen pt-16 flex flex-col xl:flex-row items-start xl:justify-between dark:bg-black dark:text-white">

            <!-- TableRouterButton -->
            <PageTable></PageTable>            
            
            <!-- Views -->
            <!-- Show content-->
            <div class="px-8 py-4 w-full">
                <Transition name="list">
                    <router-view></router-view>
                </Transition>
            </div>

            <!-- Questions -->
            <about></about>
        </main>

        <footer>
            
        </footer>

        <button @click="setDark(!getDark)" class="fixed w-24 px-4 py-2 rounded-full right-5 bottom-5 bg-black dark:bg-white text-white dark:text-black">
            <i class="material-icons">{{ getDark ? 'light' : 'brightness_2' }}</i>
            <p>{{ getDark ? 'Light' : 'Dark' }}</p>
        </button>

    </div>




</template>

<style lang="css">
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