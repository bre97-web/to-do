<script>
export default {
    emits: ['setPage'],
    props: ['list', 'focus'],
    methods: {
        set(e) {
            this.$emit('setPage', e)
        }
    },
}
</script>

<template>
    <div class="flex gap-1 font-medium flex-row xl:flex-col">
        <button @click="set(e)" v-for="(e, index) in list" :key="index" class="rounded-md pr-5 mr-5 flex gap-4 place-content-start focus:ring-0 hover:bg-gray-50 dark:hover:bg-gray-800" :class="{'font-bold bg-gray-100 hover:bg-gray-100 dark:bg-gray-700 dark:hover:bg-gray-700 ':e === focus}">
            
            <!-- Focus color -->
            <div class="w-1 h-4 rounded-full bg-blue-500 dark:bg-blue-100 relative left-0 opacity-0" :class="{'opacity-100 left-1':e === focus}"></div>
            {{ e }}
        </button>
    </div>
</template>