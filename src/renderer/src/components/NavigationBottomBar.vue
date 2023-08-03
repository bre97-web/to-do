<template>
    <md-navigation-bar :active-index="currentIndex()">
        <template v-for="e in routerList" :key="e.url">
            <md-navigation-tab v-if="e.showInSmallScreen" :label="e.label" @click="router.push(e.url)"></md-navigation-tab>
        </template>
    </md-navigation-bar>
</template>

<script setup lang="ts">
import { getRouterList, currentIndex } from '@/scripts/navigation'
import { useRouter } from 'vue-router';

const router = useRouter()

const routerList = getRouterList()
</script>

<style scoped></style>