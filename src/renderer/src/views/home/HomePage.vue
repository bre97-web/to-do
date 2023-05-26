<template>
    <div>
        <Teleport to="body">
            <div class="z-30 fixed top-[3.6rem] left-0 w-screen backdrop-blur-md">
                <div class="w-full md:max-w-md lg:max-w-lg xl:max-w-3xl 2xl:max-w-4xl mx-auto">
                    <div class="w-full">
                        <md-tabs>
                            <md-tab @click="router.push('/home/overview')">Overview</md-tab>
                            <md-tab @click="router.push('/home/focus')">Focus</md-tab>
                            <md-tab @click="router.push('/home/recycle')">Recycle</md-tab>
                        </md-tabs>
                    </div>
                </div>
            </div>
        </Teleport>

        <Search></Search>
        
        <router-view v-slot="{ Component }" name="HomePageInnerBoardView">
            <component :is="Component"></component>
        </router-view>
    </div>
</template>

<script lang="ts" setup>
import Search from '@/components/search/Search.vue'
import '@material/web/tabs/tab'
import '@material/web/tabs/tabs'
import { useRouter } from 'vue-router';

const router = useRouter()
</script>
