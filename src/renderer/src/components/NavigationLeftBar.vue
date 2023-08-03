<template>
    <div class="max-h-screen overflow-auto max-w-min">
        <div class="p-2">
            <div class="flex flex-col items-center justify-start gap-2">
                <div
                    v-for="e in routerList"
                    :key="e.url"
                    class="rounded-full relative min-w-min max-w-max"
                    @click="router.push(e.url)"
                >
                    <md-ripple></md-ripple>
                    <div class="flex gap-2 items-center justify-center lg:justify-start w-14 h-14 lg:w-full lg:px-4">
                        <md-icon :class="{'icon-filled': currentUrl === e.url}">{{ e.icon }}</md-icon>
                        <p class="hidden lg:block" :class="{'font-bold': currentUrl == e.url}">{{ e.label }}</p>
                    </div>
                </div>
                <CreatorFabButton></CreatorFabButton>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useRouter } from 'vue-router'
import CreatorFabButton from './CreatorFabButton.vue';

const router = useRouter()
const currentUrl = computed(() => router.currentRoute.value.path)
const routerList = [
    {
        url: '/home',
        label: 'Home',
        icon: 'home'
    },
    {
        url: '/goals',
        label: 'Goals',
        icon: 'flag'
    },
    {
        url: '/group',
        label: 'Group',
        icon: 'workspaces'
    },
    {
        url: '/me',
        label: 'Profile',
        icon: 'person'
    },
]
</script>

<style scoped></style>