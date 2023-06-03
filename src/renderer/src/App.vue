<template>
    <Loading v-if="!isLoaded" message="To-Do"></Loading>
    
    <!-- 首屏 -->
    <div v-else id="root" class="background overflow-x-hidden overflow-y-auto relative h-screen">
        <FirstLaunch></FirstLaunch>
        
        <ninja-keys
            class="z-50"
            placeholder="placeholder"
            :data="hotkeys"
        ></ninja-keys>

        <!-- 启动后/重定向到/home -->
        <router-view v-slot="{ Component }">
            <component :is="Component"></component>
        </router-view>

        <Events></Events>
    </div>
</template>

<script lang="ts" setup>
import "ninja-keys"
import { ref } from 'vue'
import FirstLaunch from './components/FirstLaunch.vue'
import Loading from './components/Loading.vue'
import Events from '@/components/event/Events.vue'
import { useRouter } from "vue-router"
import useTheme from '@/hooks/useTheme'


const router = useRouter()

/**
 * Hotkeys
 */
 const hotkeys = [
    {
        id: "Shortcut Map",
        title: "Shortcut Map",
        hotkey: "alt+m",
        mdIcon: "map",
        handler: () => {
            router.push('/dashboard')
        },
    },
    {
        id: "Settings",
        title: "Dashboard",
        hotkey: "alt+s",
        mdIcon: "setting",
        handler: () => {
            router.push('/dashboard')
        },
    },
    {
        id: "Theme",
        title: "Settings",
        mdIcon: "setting",
        children: [
            {
                id: "Dark",
                title: "Dark",
                mdIcon: "dark",
                handler: () => {
                    useTheme().set({
                        isDark: true
                    })
                },
            },
            {
                id: "Light",
                title: "Light",
                mdIcon: "light",
                handler: () => {
                    useTheme().set({
                        isDark: false
                    })
                },
            },
        ]
    },
    
]

/**
 * 在window.load时isLoaded变为true，延迟1秒
 */
const isLoaded = ref<boolean>(false)
window.addEventListener('load', () => {
    setTimeout(() => (isLoaded.value = true), 1000)
})
</script>
