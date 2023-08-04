<template>
    <div class="py-1 pl-4 pr-2 flex relative rounded-md">
        <md-ripple></md-ripple>
        <main class="w-2/3">
            <slot></slot>
        </main>
        <nav class="flex items-center justify-end flex-grow">
            <slot name="action"></slot>
        </nav>
    </div>
</template>

<script setup lang="ts">

</script>

<style scoped>
</style>