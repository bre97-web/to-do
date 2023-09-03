<template>
    <md-navigation-bar :active-index="currentIndex()">
        <md-navigation-tab
            v-for="e in routerList"
            v-show="e.showInSmallScreen"
            :key="e.url"
            :label="e.label"
            @click="router.push(e.url)"
        ></md-navigation-tab>
    </md-navigation-bar>
</template>

<script setup lang="ts">
import { getRouterList, currentIndex } from './navigation'
import { useRouter } from 'vue-router';

const router = useRouter()

const routerList = getRouterList()
</script>

<style scoped></style>@/components/navigation/navigation