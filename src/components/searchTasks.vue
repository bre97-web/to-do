<script>

export default {
    data() {
        return {
            
        }
    },
    props: {
        tasks: {
            required: true
        },
        keyWord: {
            required: true,
            type: String
        },
    },
    computed: {
        focusTasks() {
            return this.tasks.filter(p => p.text.indexOf(this.keyWord) !== -1)
        },
    },
    methods: {
        add() {
            this.$parent.add(this.keyWord)
        },
        remove(e) {
            this.$parent.remove(e)
        },
        done(e) {
            this.$parent.done(e)
        },
        undo(e) {
            this.$parent.undo(e)
        },
    },
}
</script>

<template>
    <ul v-if="keyWord !== ''" class="p-5 border rounded-xl shadow-sm flex flex-col gap-4 flex-wrap font-regular w-5/6 sm:rounded-xl lg:max-w-2xl mx-auto">    
        
        <p class="pt-2 pl-4 font-bold text-2xl">
            Search Tasks
        </p>

        <li v-for="e in focusTasks" :key="e.id" class="relative flex items-center gap-2 m-2 ml-5 text-left ">
            <input v-if="!e.done" type="radio" @click="done(e)" :name="e.id" value="1" class="flex-none w-5 h-5 border border-black">
            
            <p class="flex-grow font-medium" :class="{'line-through':e.done}">
                {{e.text}}
            </p>
            <div class="flex-none flex gap-2">
                <button @click="remove(e)" class="h-10 w-20 flex items-center justify-center rounded-full hover:bg-red-50 active:bg-red-500 active:text-white">Delete</button>
                <button v-if="e.done" @click="undo(e)" class="h-10 w-20 flex items-center justify-center rounded-full hover:bg-blue-50 active:bg-blue-500 focus:ring active:text-white">Undo</button>
            </div>
        </li>
        <li v-if="keyWord !== '' && tasks.length == 0 || focusTasks.length == 0" class="pt-4 pb-4 pl-4">No Result</li>
    </ul>
</template>