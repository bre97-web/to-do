<template>
    <Loading v-if="!isLoaded" message="To-Do"></Loading>
    
    <!-- 首屏 -->
    <div v-else id="root" class="background overflow-x-hidden">
        <FirstLaunch></FirstLaunch>
        
        <!-- 启动后/重定向到/home -->
        <router-view v-slot="{ Component }">
            <component :is="Component"></component>
        </router-view>

        <Events></Events>
    </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import FirstLaunch from './components/FirstLaunch.vue'
import Loading from './components/Loading.vue'
import Events from '@/components/event/Events.vue'

/**
 * 在window.load时isLoaded变为true，延迟1秒
 */
const isLoaded = ref<boolean>(false)
window.addEventListener('load', () => {
    setTimeout(() => (isLoaded.value = true), 1000)
})
</script>
