<template>
    <div class="space-y-8">
        <main class="relative flex items-center justify-evenly flex-wrap gap-4">
            <Card
                class="ring-black dark:ring-white"
                :class="{ ring: currentIndex === 0 }"
                @click="setIndex(0)"
            >
                <template #header>
                    <div>
                        <img src="@/assets/img/pexels-susan-flores.jpg" />
                    </div>
                </template>
                <template #content>
                    <h1>Test</h1>
                    <p>Test</p>
                </template>
                <template #action>
                    <div class="action"></div>
                </template>
            </Card>

            <Card
                class="ring-black dark:ring-white"
                :class="{ ring: currentIndex === 1 }"
                @click="setIndex(1)"
            >
                <template #header>
                    <div>
                        <img src="@/assets/img/pexels-pixabay.jpg" alt="" />
                    </div>
                </template>
                <template #content>
                    <h1>Test</h1>
                    <p>Test</p>
                </template>
                <template #action>
                    <div class="action"></div>
                </template>
            </Card>
        </main>
    </div>
</template>

<script lang="ts" setup>
import { Goals } from '@/hooks/useGoal'
import Card from '@/views/chooseGoal/lib/Card.vue'

const props = defineProps<{
    currentIndex: number
    setCurrentIndex: (index: number) => any
    goalTemplates: Array<Goals>
}>()

const setIndex = (index: number) => props.setCurrentIndex(index)
</script>
