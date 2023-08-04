<template>
    <div>
        <header>
            <h5>Theme</h5>
        </header>
        <main class="space-y-4 mt-8">
            <div>
                <subtitle1>Dark mode</subtitle1>
                <overline class="italic text-gray-500">深色模式将会禁用部分效果。</overline>
                <DarkSwitch></DarkSwitch>
            </div>

            <div>
                <subtitle1>Primary color</subtitle1>
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
