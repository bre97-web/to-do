<template>
    <div class="flex flex-col">
        <header>
            <h5>System</h5>
        </header>
        <main class="mt-8">
            <div class="line">
                <subtitle2>Open Dashboard(Settings)</subtitle2>
                <subtitle2>Alt + s</subtitle2>
            </div>
            <div class="line">
                <subtitle2>Open Navigate</subtitle2>
                <subtitle2>Ctrl + k</subtitle2>
            </div>
            <div class="line">
                <subtitle2>Open Shortcut Map</subtitle2>
                <subtitle2>Alt + m</subtitle2>
            </div>
        </main>
    </div>
</template>

<script setup lang="ts"></script>

<style scoped>
div.line {
    @apply grid grid-cols-2 border gap-2 px-4 py-2;
}
</style>
