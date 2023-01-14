<script>
export default {
    props: {
        tasks: {
            required: true
        }
    },
    computed: {
        doTasks() {
            return this.tasks.filter(p => !p.done)
        },
    },
    methods: {
        done(e) {
            setTimeout(() => e.done = true, 500)
        },
        remove(e) {
            this.$parent.remove(e)
        }
    },

}
</script>

<template>
    <ul class="p-5 border rounded-xl shadow-sm flex flex-col gap-4 flex-wrap font-regular w-5/6 sm:rounded-xl lg:max-w-2xl mx-auto">    
        <p class="pt-2 pl-4 font-bold text-2xl">
            Today's Tasks
        </p>
        <li v-for="e in doTasks" :key="e.id" class="relative flex items-center gap-2 m-2 ml-5 text-left ">
            <input type="radio" @click="done(e)" :name="e.id" value="1" class="flex-none w-5 h-5 border border-black">
            <p class="flex-grow font-medium">
                {{e.text}}
            </p>
            <div class="flex-none flex gap-2 ">
                <button @click="remove(e)" class="h-10 w-20 flex items-center justify-center rounded-full hover:bg-red-50 active:bg-red-500 active:text-white">Delete</button>
            </div>
        </li>
        <li v-if="doTasks.length == 0" class="pt-4 pb-4 pl-4">All did it!</li>        <!-- <li v-else-if="keyWord !== '' && tasks.length == 0" class="pt-4 pb-4 pl-4">No Result</li> -->
    </ul>
</template>