<template>
    <nav class="fixed bottom-0 left-0 w-full z-50">
        <md-navigation-bar>
            <md-navigation-tab @click="push('/')" label="Overview"></md-navigation-tab>
            <md-navigation-tab @click="push('/menu')" label="Menu"></md-navigation-tab>
            <md-navigation-tab @click="push('/settings')" label="Settings"></md-navigation-tab>
        </md-navigation-bar>
    </nav>
</template>

<script setup>
import { useRouter } from 'vue-router'

const r = useRouter()

function push(path) {
    r.push({
        path: path
    })
}
</script>

<style scoped lang="css">
</style>