<template>
    <div class="relative w-full">
        <div class="relative flex flex-col md:flex-row h-screen">
            <div class="relative border w-full md:max-w-xs h-auto md:h-screen p-2 md:p-8">
                <nav class="flex justify-end md:absolute md:bottom-4">
                    <md-text-button @click="router.push('/me')">
                        back
                        <md-icon slot="icon">arrow_back</md-icon>
                    </md-text-button>
                </nav>
                
                <div class="hidden md:flex gap-2 items-center justify-start mb-8">
                    <span class="material-symbols-outlined">dashboard</span>
                    <h1 class="text-2xl">Dashboard</h1>
                </div>
                
                <div class="flex flex-row md:flex-col gap-1">
                    <md-text-button @click="router.push('/dashboard/profile')">Account</md-text-button>
                    <md-text-button @click="router.push('/dashboard/theme')">Theme</md-text-button>
                    <md-text-button @click="router.push('/dashboard/system')">System</md-text-button>
                    <md-text-button @click="router.push('/dashboard/shortcutMap')">Shortcut Map</md-text-button>
                </div>
            </div>

            <main class="relative flex flex-col p-2 md:p-8">
                <router-view v-slot="{ Component }" name="dashboardView">
                    <component :is="Component"></component>
                </router-view>
            </main>
        </div>
    </div>
</template>

<script setup lang="ts">
import '@material/web/button/text-button'
import '@material/web/icon/icon'
import { useRouter } from 'vue-router';

const router = useRouter()
</script>