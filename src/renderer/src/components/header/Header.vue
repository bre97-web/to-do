<template>
    <header class="topBar">
        <div class="px-4 py-2 flex flex-row items-center justify-between w-full gap-2">
            <!-- Web Title -->
            <Title></Title>

            <!-- Search input -->
            <SearchInput></SearchInput>

            <!-- Settings and other buttons -->
            <Setting></Setting>

            <!-- Users avatar-->
            <Avatar></Avatar>
        </div>
    </header>
</template>

<script lang="tsx" setup>
import Setting from '@/components/header/Setting.vue'
import Avatar from '@/components/header/Avatar'
import { reactive } from 'vue'

interface Props {
    input: string
}
const props = withDefaults(defineProps<Props>(), {
    input: ''
})
const emits = defineEmits(['setInput'])

const info = reactive(JSON.parse(localStorage.getItem('bre97-web-todo-personal-info') as string) || {
    name: 'Click me to edit your info',
})

/**
 * Component
 */
const Title = () => (
    <div class="flex flex-col flex-none">
        <h1 class="text-base">To-Do</h1>
        <p class="text-xs">Preview</p>
    </div>    
)
const SearchInput = () => (
    <div class="relative w-full flex items-center justify-center">
        <md-icon class="material-icons relative left-10 text-base">search</md-icon>
        <input
            value={props.input}
            type="text"
            placeholder="Search"
            onInput={(e) => emits('setInput', (e.target as HTMLInputElement).value)}
        />
    </div>
)
</script>
