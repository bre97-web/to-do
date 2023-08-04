<template>
    <div class="flex flex-col md:flex-row gap-8 w-full">
        <div class="max-w-xs w-full">
            <slot name="desc"></slot>
        </div>
        <div class="w-full max-w-max space-y-4">
            <slot></slot>
        </div>
    </div>
</template>

<script setup lang="ts">

</script>

<style scoped>

</style>