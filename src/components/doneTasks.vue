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
            this.$emit('undo', e)
        },
        remove(e) {
            this.$emit('remove', e)
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
                <button @click="remove(e)" class="w-14 h-10 sm:w-28 flex gap-2 items-center justify-center rounded-full hover:bg-red-50 focus:ring active:bg-red-500 active:text-white">
                    <i class="bi bi-archive"></i>
                    <p class="hidden sm:block">
                        Delete
                    </p>
                </button>
                <button @click="undo(e)" class="w-14 h-10 sm:w-28 flex gap-2 items-center justify-center rounded-full hover:bg-blue-50 focus:ring active:bg-blue-500 active:text-white">
                    <i class="bi bi-layer-forward"></i>
                    <p class="hidden sm:block">
                        Undo
                    </p>
                </button>
            </div>
        </li>
    </ul>
</template>
