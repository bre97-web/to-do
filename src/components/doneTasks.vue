<script>

export default {
    props: {
        tasks: {
            required: true,
        }
    },
    computed: {
        doneTasks() {
            var e = this.tasks.filter(p => p.done)
            return e
        },
    },
    methods: {
        undo(e) {
            this.$parent.undo(e)
        },
        remove(e) {
            this.$parent.remove(e)
        }
    }
}
</script>

<template>
    <ul v-if="doneTasks.length != 0" class="p-5  border rounded-xl flex flex-col gap-4 flex-wrap font-regular w-5/6 sm:rounded-xl lg:max-w-2xl mx-auto">    
        <p class="pl-4 font-bold text-2xl">
            Is Done Events
        </p>
        <li if="doneTasks.length != 0" v-for="e in doneTasks" :key="e.id" class="relative flex items-center m-2 ml-5 text-left">
            <p class="line-through flex-grow">{{e.text}}</p>
            <div class="flex-none flex gap-2">
                <button @click="remove(e)" class="h-10 w-20 flex items-center justify-center rounded-full hover:bg-red-50 active:bg-red-500 active:text-white">Delete</button>
                <button @click="undo(e)" class="h-10 w-20 flex items-center justify-center rounded-full hover:bg-blue-50 active:bg-blue-500 focus:ring active:text-white">Undo</button>
            </div>
        </li>
    </ul>
</template>
