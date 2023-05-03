<template>
    <Loading v-if="!isLoaded" message="To-Do"></Loading>
    <div v-else id="root" class="bg-base overflow-x-hidden">
        <FirstLaunch></FirstLaunch>

        <router-view v-slot="{ Component }">
            <component :is="Component"></component>
        </router-view>

        <footer>
            <div class="p-8 flex flex-col md:flex-row gap-2 flex-wrap">
                <div>
                    <h1>To-Do</h1>
                    <h2>bre97-web</h2>
                </div>
            </div>
        </footer>
    </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import FirstLaunch from './components/FirstLaunch.vue'
import Loading from './components/Loading.vue'

/**
 * 在window.load时isLoaded变为true，延迟1秒
 */
const isLoaded = ref(false)
window.addEventListener('load', () => {
    setTimeout(() => (isLoaded.value = true), 1000)
})
</script>
