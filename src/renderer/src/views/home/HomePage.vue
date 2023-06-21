<template>
    <div class="relative background">
        <div class="w-full sticky z-40 top-[0px]">
            <md-tabs>
                <md-tab @click="router.push('/home/overview')">Overview</md-tab>
                <md-tab @click="router.push('/home/focus')">Focus</md-tab>
                <md-tab @click="router.push('/home/recycle')">Recycle</md-tab>
            </md-tabs>
        </div>

        <Search></Search>

        <!-- Create button -->
        <nav class="fab">
            <md-fab
                label="Create"
                @click="dialog.open = true"
            >
                <md-icon slot="icon">create</md-icon>
            </md-fab>
            <Creator :dialog="dialog" :closeDialog="closeDialog"></Creator>
        </nav>

        <!-- ChipSet -->
        <div class="fixed bottom-24 z-30 backdrop-blur-md fab flex gap-2 mx-4">
            <md-filter-chip label="q1">1</md-filter-chip>
            <md-filter-chip label="q1">1</md-filter-chip>
        </div>
        
        <router-view v-slot="{ Component }" name="HomePageInnerBoardView">
            <component :is="Component"></component>
        </router-view>
    </div>
</template>

<script lang="ts" setup>
import Creator from '@/components/creator/Creator.vue'
import Search from '@/components/search/Search.vue'
import '@material/web/tabs/tab'
import '@material/web/tabs/tabs'
import '@material/web/fab/fab'
import '@material/web/icon/icon'
import '@material/web/chips/filter-chip'
import { reactive } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter()

/**
 * 控制fab按钮点击后显示的dialog窗口
 */
const dialog: any = reactive({
    open: false
})
const closeDialog = () => (dialog.open = false)
</script>
