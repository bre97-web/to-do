<template>
    <div class="relative w-full max-w-md flex items-center justify-center bg-surface">
        <input
            v-model="searchStore.keyword"
            class="text-primary"
            type="search"
            placeholder="Search"
        />
    </div>
</template>

<script setup lang="ts">
import { useSearchStore } from '@/store/useSearchStore'

const searchStore = useSearchStore()
</script>

<style scoped></style>
