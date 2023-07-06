<template>
    <div>
        <header>
            <h1>Theme</h1>
        </header>
        <main class="space-y-4 mt-8">
            <div>
                <h1>Dark mode</h1>
                <DarkSwitch></DarkSwitch>
                <p class="italic text-gray-500">深色模式将会禁用部分效果。</p>
            </div>

            <div>
                <h1>Primary color</h1>
                <ThemePicker></ThemePicker>
            </div>
        </main>
    </div>
</template>

<script setup lang="ts">
import DarkSwitch from '@/components/DarkSwitch.vue'
import ThemePicker from '@/components/ThemePicker.vue'

</script>

<style scoped>
main > div > p {
    @apply mt-2;
}
</style>
