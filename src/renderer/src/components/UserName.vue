<template>
    <subtitle1 class="text-center">{{ userStore.getName }}</subtitle1>
</template>

<script setup lang="ts">
import { useUserStore } from '@/store/useUserStore'

const userStore = useUserStore()
</script>

<style scoped>

</style>