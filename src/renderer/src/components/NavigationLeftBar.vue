<template>
    <div class="max-h-screen overflow-auto max-w-min">
        <div class="px-2 my-4">
            <div class="flex flex-col items-start justify-start gap-2">
                <div
                    v-for="e in routerList"
                    :key="e.url"
                    class="rounded-full relative min-w-min max-w-max"
                    @click="router.push(e.url)"
                >
                    <md-ripple></md-ripple>
                    <div class="flex gap-2 items-center justify-center lg:justify-start w-14 h-14 lg:w-full lg:px-4">
                        <md-icon :class="{'icon-filled': router.currentRoute.value.path === e.url}">{{ e.icon }}</md-icon>
                        <p class="hidden lg:block" :class="{'font-bold': router.currentRoute.value.path == e.url}">{{ e.label }}</p>
                    </div>
                </div>
                <div class="block lg:hidden">
                    <CreatorFabButton></CreatorFabButton>
                </div>
                <div class="hidden lg:block">
                    <CreatorFabButton label="Create"></CreatorFabButton>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import CreatorFabButton from './CreatorFabButton.vue'
import { getRouterList } from '@/scripts/navigation'
import { useRouter } from 'vue-router';

const router = useRouter()

const routerList = getRouterList()
</script>

<style scoped></style>