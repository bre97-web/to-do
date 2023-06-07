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

                <md-outlined-segmented-button-set>
                    <md-outlined-segmented-button
                        v-for="(e, index) in theme.getThemeColor()"
                        :key="index"
                        :label="e.toUpperCase()"
                        @click="() => theme.set({
                            color: e
                        })"
                    >
                    </md-outlined-segmented-button>
                </md-outlined-segmented-button-set>
            </div>
        </main>
    </div>
</template>

<script setup lang="ts">
import DarkSwitch from '@/components/dark/DarkSwitch.vue'
import '@material/web/labs/segmentedbuttonset/outlined-segmented-button-set'
import '@material/web/labs/segmentedbutton/outlined-segmented-button'
import useTheme from '@/hooks/useTheme';

const theme = useTheme()
</script>

<style scoped>
main > div > p {
    @apply mt-2;
}
</style>
