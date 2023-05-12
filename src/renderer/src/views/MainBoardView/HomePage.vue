<template>
    <div>
        <Tabs></Tabs>
        <div class="px-4">
            <Search></Search>
            <Tasks></Tasks>
        </div>

        <router-view v-slot="{ Component }" name="HomePageInnerBoardView">
            <component :is="Component"></component>
        </router-view>
    </div>
</template>

<script lang="tsx" setup>
import Tasks from '@/components/task/Tasks.vue'
import Search from '@/components/search/Search.vue'
import Tabs from '@/components/tabs/Tabs'
</script>
