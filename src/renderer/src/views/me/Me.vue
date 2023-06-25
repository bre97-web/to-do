<template>
    <div class="bg-background pt-8 px-4">
        <Profile></Profile>

        <main class="mt-12 relative space-y-4">
            <div class="p-4 rounded-xl">
                <ul class="group">
                    <li class="elevation surfaceContainer">
                        <md-elevation></md-elevation>
                        <h1 class="text-onSurface">Helper</h1>
                        <md-text-button @click="router.push('/helper')">Look</md-text-button>
                    </li>
                    <li class="elevation surfaceContainer">
                        <md-elevation></md-elevation>
                        <h1 class="text-onSurface">Dashboard</h1>
                        <md-text-button @click="router.push('/dashboard')"
                            ><p>Open</p></md-text-button
                        >
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
import Profile from '@/components/personal/Profile.vue'
import '@material/web/button/text-button'
import '@material/web/elevation/elevation'

/**
 * 路由
 */
const router = useRouter()
</script>
