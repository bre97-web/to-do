<template>
    <div class="bg-background pt-8 px-4">
        <ProfileCard></ProfileCard>

        <main class="mt-12 relative space-y-4">
            <div class="p-4 rounded-xl">
                <ul class="flex flex-wrap gap-2">
                    <li class="hover:elevation relative bg-[var(--md-sys-color-surface-container-low)]">
                        <md-elevation></md-elevation>
                        <h1 class="text-onSurface">Dashboard</h1>
                        <md-text-button @click="router.push('/dashboard')">
                            <p>Open</p>
                        </md-text-button>
                    </li>
                </ul>
            </div>

            <router-view v-slot="{ Component }" name="MeInnerBoard">
                <component :is="Component"></component>
            </router-view>
        </main>
    </div>
</template>

<script lang="ts" setup>
import { useRouter } from 'vue-router'
import ProfileCard from '@/components/ProfileCard.vue'

/**
 * 路由
 */
const router = useRouter()
</script>

<style scoped lang="css">
ul li {
    @apply rounded-md p-4 flex flex-col justify-center items-center;
}
</style>