<template>
    <div>
        <Search :input="input"></Search>
        <Tasks></Tasks>

        <router-view v-slot="{ Component }" name="HomePageInnerBoardView">
            <component :is="Component"></component>
        </router-view>
    </div>
</template>

<script setup>
import { ref } from 'vue'
import Tasks from '@/components/task/Tasks.vue'
import Search from '@/views/Search.vue'

const props = defineProps({
    input: {
        type: String,
        default: null
    }
})
const input = ref('')
</script>
