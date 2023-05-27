<template>
    <div class="mt-[3rem]">
        <div class="w-full">
            <md-tabs>
                <md-tab @click="router.push('/home/overview')">Overview</md-tab>
                <md-tab @click="router.push('/home/focus')">Focus</md-tab>
                <md-tab @click="router.push('/home/recycle')">Recycle</md-tab>
            </md-tabs>
        </div>

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
