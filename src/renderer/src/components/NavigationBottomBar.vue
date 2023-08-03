<template>
    <md-navigation-bar :active-index="currentIndex">
        <md-navigation-tab v-for="e in routerList" :key="e.url" :label="e.label" @click="router.push(e.url)">
        </md-navigation-tab>
    </md-navigation-bar>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const currentUrl = computed(() => router.currentRoute.value.path)
const currentIndex = computed(() => {
    for(let index in routerList) {
        if(routerList[index].url === currentUrl.value) {
            return index
        }
    }
    return 0
})
const routerList = [
    {
        url: '/home',
        label: 'Home'
    },
    {
        url: '/goals',
        label: 'Goals'
    },
    {
        url: '/group',
        label: 'Group'
    },
    {
        url: '/me',
        label: 'Profile'
    },
]
</script>

<style scoped></style>