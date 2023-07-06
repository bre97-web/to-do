<template>
    <div class="space-y-4">
        <div class="w-64 h-64 rounded-full flex items-center justify-center border">
            <p class="text-8xl font-black">{{ userStore.getName[0] }}</p>
        </div>
        <h1 class="text-right text-gray-500">{{ userStore.getName }}</h1>
    </div>
</template>

<script setup lang="ts">
import { useUserStore } from '@/store/useUserStore'

const userStore = useUserStore()
</script>
