<template>
    <Loading v-if="!isLoaded" message="To-Do"></Loading>
    
    <!-- 首屏 -->
    <div v-else id="root" class="background overflow-x-hidden overflow-y-auto relative h-screen">
        <FirstLaunch></FirstLaunch>
        
        <ninja-keys
            @selected=""
            @change=""
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

/**
 * Hotkeys
 */
 const hotkeys = [
    {
        id: "Open Search",
        title: "Search",
        hotkey: "cmd+k",
        mdIcon: "home",
        handler: () => {
            console.log(1)
        }
    }
]

/**
 * 在window.load时isLoaded变为true，延迟1秒
 */
const isLoaded = ref<boolean>(false)
window.addEventListener('load', () => {
    setTimeout(() => (isLoaded.value = true), 1000)
})
</script>
