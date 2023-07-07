<template>
    <div class="rounded-full bg-[var(--md-sys-color-surface-container-high)] grid place-items-center">
        <p class="text-center font-black">{{ userStore.getName[0] }}</p>
    </div>
</template>

<script setup lang="ts">
import { useUserStore } from '@/store/useUserStore'

const userStore = useUserStore()
</script>
