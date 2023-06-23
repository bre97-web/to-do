<template>
    <div class="flex flex-col">
        <div class="line">
            <b>Open Dashboard(Settings)</b>
            <p>Alt + s</p>
        </div>
        <div class="line">
            <b>Open Navigate</b>
            <p>Ctrl + k</p>
        </div>
        <div class="line">
            <b>Open Shortcut Map</b>
            <p>Alt + m</p>
        </div>
    </div>
</template>

<script setup lang="ts">
import '@material/web/divider/divider'
</script>

<style scoped>
    div.line {
        @apply grid grid-cols-2 border gap-2 px-4 py-2;
    }
</style>