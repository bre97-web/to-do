<template>
    <PageLayout>
        <nav class="p-2 mb-4 flex items-center gap-1 sticky top-0 backdrop-blur-md w-full z-30 border-b">
            <md-standard-icon-button @click="router.back">
                <md-icon>arrow_back</md-icon>
            </md-standard-icon-button>
            <p>{{ router.currentRoute.value.name }}</p>
        </nav>

        <div>
            <slot></slot>
        </div>
    </PageLayout>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router'
import PageLayout from './PageLayout.vue'

const router = useRouter()
</script>

<style scoped></style>