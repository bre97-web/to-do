<template>
    <BodyLarge class="text-center">{{ userStore.getName }}</BodyLarge>
</template>

<script setup lang="ts">
import { useUserStore } from '@/store/useUserStore'

const userStore = useUserStore()
</script>

<style scoped></style>
