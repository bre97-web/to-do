<script>

// import Edit from './editTask.vue'

export default {
    props: {
        tasks: {
            required: true
        }
    },
    data() {
        return {
            isModifying: false,
        }
    },
    computed: {
        doTasks() {
            return this.tasks.filter(p => !p.done)
        },
    },
    methods: {
        done(e) {
            setTimeout(() => this.$emit('done', e), 500)
        },
        remove(e) {
            this.$emit('remove', e)
        },
        edit(e, text) {
            this.isModifying = false
            this.$emit('edit', e, text)
        },
    },
    components: {
        // edit: Edit,
    }

}
</script>

<template>
    <ul class="p-5 border rounded-xl flex flex-col gap-4 flex-wrap font-regular w-5/6 sm:rounded-xl lg:max-w-2xl mx-auto">    
        <p class="pt-2 pl-4 font-bold text-2xl">
            Today's Tasks
        </p>
        <li v-for="e in doTasks" :key="e.id" class="relative flex items-center gap-2 m-2 ml-5 text-left ">
            <input type="radio" @click="done(e)" :name="e.id" value="1" class="flex-none w-5 h-5 border border-black">
            <p class="flex-grow font-medium">
                {{e.text}}
            </p>
            <div class="flex-none flex gap-2 ">
                <!--REMOVE-->
                <button @click="remove(e)" class="w-14 h-10 sm:w-28 flex gap-2 items-center justify-center rounded-full hover:bg-red-50 focus:ring active:bg-red-500 active:text-white">
                    <i class="bi bi-archive"></i>
                    <p class="hidden sm:block">
                        Delete
                    </p>
                </button>
                <!-- <button @click="this.isModifying = true" class="w-14 h-10 flex gap-2 items-center justify-center rounded-full hover:bg-red-50 focus:ring active:bg-red-500 active:text-white">
                    <i class="bi bi-info-lg"></i>
                </button>
                <edit @apply="edit" :task="e" :modifying="isModifying" :class="{'hidden':!isModifying}"></edit> -->
            </div>
        </li>
        <li v-if="doTasks.length == 0" class="pt-4 pb-4 pl-4">All did it!</li>        <!-- <li v-else-if="keyWord !== '' && tasks.length == 0" class="pt-4 pb-4 pl-4">No Result</li> -->
    </ul>
</template>

