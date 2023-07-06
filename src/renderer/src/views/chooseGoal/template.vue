<template>
    <div class="space-y-8">
        <main class="relative flex items-center justify-evenly flex-wrap gap-4">
            <div
                class="ring-black dark:ring-white elevation focus surfaceContainer rounded-3xl w-48 md:w-96"
                :class="{ ring: currentIndex === 0 }" @click="setIndex(0)"
            >
                <md-elevation></md-elevation>
                <header class="overflow-clip rounded-3xl w-48 md:w-96 max-h-32 md:max-h-64">
                    <div>
                        <img src="@/assets/resources/img/pexels-susan-flores.jpg" />
                    </div>
                </header>
                <div class="px-4 py-2">
                    <h1>Test</h1>
                    <p>Test</p>
                    <div class="action"></div>
                </div>
            </div>

            <div
                class="ring-black dark:ring-white elevation focus surfaceContainer rounded-3xl w-48 md:w-96"
                :class="{ ring: currentIndex === 1 }" @click="setIndex(1)"
            >
                <md-focus-ring></md-focus-ring>
                <header class="overflow-clip rounded-3xl w-48 md:w-96 max-h-32 md:max-h-64">
                    <div>
                        <img src="@/assets/resources/img/pexels-pixabay.jpg" alt="" />
                    </div>
                </header>
                <div class="px-4 py-2">
                    <h1>Test</h1>
                    <p>Test</p>
                    <div class="action"></div>
                </div>
            </div>
        </main>
    </div>
</template>

<script lang="ts" setup>
import { Goals } from '@/hooks/useGoal'

const props = defineProps<{
    currentIndex: number
    setCurrentIndex: (index: number) => any
    goalTemplates: Array<Goals>
}>()

const setIndex = (index: number) => props.setCurrentIndex(index)
</script>
