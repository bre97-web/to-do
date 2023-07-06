<template>
    <div class="relative w-full max-w-md flex items-center justify-center bg-surface">
        <input
            v-model="searchStore.keyword"
            class="text-primary bg-[var(--md-sys-color-surface-container-high)] max-w-xs md:max-w-md lg:max-w-lg xl:max-w-xl 2xl:max-w-2xl w-full mx-2 outline-none rounded-lg focus:ring pl-4 py-2"
            type="search"
            placeholder="Search"
        />
    </div>
</template>

<script setup lang="ts">
import { useSearchStore } from '@/store/useSearchStore'

const searchStore = useSearchStore()
</script>
