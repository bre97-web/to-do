<template>
    <header class="topBar">
        <div class="px-4 py-2 flex flex-row items-center justify-between w-full gap-2">
            <!-- Web Title -->
            <h1>To-Do</h1>

            <!-- Search input -->
            <SearchInput :input="input" @setInput="setInput"></SearchInput>

            <!-- Settings and other buttons -->
            <Setting></Setting>

            <!-- Users avatar-->
            <Avatar></Avatar>
        </div>
    </header>
</template>

<script setup>
import SearchInput from '@/components/header/SearchInput.vue'
import Setting from '@/components/header/Setting.vue'
import Avatar from '@/components/header/Avatar.vue'

const props = defineProps({
    input: {
        type: String,
        default: ''
    }
})
const emits = defineEmits(['setInput'])
const setInput = (value) => emits('setInput', value)
</script>
