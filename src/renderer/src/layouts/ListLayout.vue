<template>
    <div class="w-full relative rounded-3xl overflow-clip border">
        <div class="flex px-4 py-2 items-center">
            <header class="w-2/3">
                <slot name="header"></slot>
            </header>
            <nav class="flex-grow flex items-start justify-end">
                <md-standard-icon-button @click="expand = expand === 'less' ? 'more' : 'less'">
                    <md-icon>{{ expand === 'less' ? 'expand_more' : 'expand_less' }}</md-icon>
                </md-standard-icon-button>
            </nav>
        </div>

        <div class="mt-4" :class="{'hidden': expand === 'less'}">
            <main class="mb-4 px-4 max-h-96 overflow-auto">
                <slot></slot>
            </main>
            <nav v-show="!props.noAction" class="bg-[var(--md-sys-color-surface)] flex items-center justify-end gap-2 px-4 py-2">
                <slot name="action"></slot>
            </nav>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const props = withDefaults(defineProps<{
    noAction?: boolean
}>(), {
    noAction: () => false
})

type Expand = 'more' | 'less'

const expand = ref<Expand>('less')
</script>

<style scoped>

</style>