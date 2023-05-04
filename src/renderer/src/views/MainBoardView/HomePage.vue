<template>
    <div>
        <Search></Search>
        <Tasks></Tasks>

        <router-view v-slot="{ Component }" name="HomePageInnerBoardView">
            <component :is="Component"></component>
        </router-view>
    </div>
</template>

<script lang="ts" setup>
import Tasks from '@/components/task/Tasks.vue'
import Search from '@/components/search/Search.vue'
</script>
