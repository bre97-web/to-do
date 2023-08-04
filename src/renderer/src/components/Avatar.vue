<template>
    <div class="rounded-full bg-[var(--md-sys-color-surface-container-high)] grid place-items-center">
        <h1 class="text-center font-black">{{ userStore.getName[0] }}</h1>
    </div>
</template>

<script setup lang="ts">
import { useUserStore } from '@/store/useUserStore'

const userStore = useUserStore()
</script>
