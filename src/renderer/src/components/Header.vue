<template>
    <header class="z-10 border-b dark:border-none w-screen max-h-16 bg-background">
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
import SearchInput from '@/components/SearchInput.vue'

const Title = () => (
    <div class="flex flex-col flex-none">
        <h1 class="text-base font-black text-onBackground">To-Do</h1>
        <p class="text-xs text-onBackground">Preview</p>
    </div>
)

const userStore = useUserStore()
const Avatar = () => (
    <div class="flex-none rounded-full overflow-clip border w-10 h-10 flex items-center justify-center">
        <h1>{userStore.getName[0]}</h1>
    </div>
)
</script>
