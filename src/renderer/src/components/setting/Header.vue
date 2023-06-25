<template>
    <header class="topBar bg-background">
        <div class="px-2 md:px-4 py-1 flex flex-row items-center justify-between w-full">
            <!-- Web Title -->
            <Title></Title>

            <!-- Search input -->
            <SearchInput></SearchInput>

            <div class="flex-none">
                <router-link to="/me">
                    <Avatar></Avatar>
                </router-link>
            </div>
        </div>
    </header>
</template>

<script lang="tsx" setup>
import { useUserStore } from '@/store/useUserStore'

interface Props {
    input: string
}
const props = withDefaults(defineProps<Props>(), {
    input: ''
})
const emits = defineEmits(['set-input'])

const Title = () => (
    <div class="flex flex-col flex-none">
        <h1 class="text-base text-onBackground">To-Do</h1>
        <p class="text-xs text-onBackground">Preview</p>
    </div>
)
const SearchInput = () => (
    <div class="relative w-full max-w-md flex items-center justify-center bg-surface">
        <input
            value={props.input}
            type="search"
            placeholder="Search"
            onInput={(e) => emits('set-input', (e.target as HTMLInputElement).value)}
        />
    </div>
)

const userStore = useUserStore()
const Avatar = () => (
    <div class="flex-none rounded-full overflow-clip border w-10 h-10 flex items-center justify-center">
        <h1>{userStore.getName[0]}</h1>
    </div>
)
</script>
