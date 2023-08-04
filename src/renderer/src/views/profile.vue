<template>
    <PageLayout>
        <PageContentLayout>
            <ProfileCard></ProfileCard>
            
            <main class="mt-12 relative space-y-4">
                <div class="rounded-xl">
                    <ul class="flex flex-wrap gap-2">
                        <li class="hover:elevation relative bg-[var(--md-sys-color-surface-container-low)]">
                            <md-elevation></md-elevation>
                            <subtitle1 class="text-onSurface">Dashboard</subtitle1>
                            <md-text-button @click="router.push('/dashboard')">Open</md-text-button>
                        </li>
                    </ul>
                </div>
                
                <router-view v-slot="{ Component }" name="MeInnerBoard">
                    <component :is="Component"></component>
                </router-view>
            </main>
        </PageContentLayout>
    </PageLayout>
</template>

<script lang="ts" setup>
import { useRouter } from 'vue-router'
import ProfileCard from '@/components/ProfileCard.vue'
import PageLayout from '@/layouts/PageLayout.vue';
import PageContentLayout from '@/layouts/PageContentLayout.vue'

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