<template>
    <div class="relative bg-background">
        <Header></Header>

        <main class="main border-x dark:border-none relative">
            <Sidebar></Sidebar>
            <router-view v-slot="{ Component }" name="MainView">
                <component :is="Component"></component>
            </router-view>
        </main>

        <!-- Bottom Navigation -->
        <nav class="fixed bottom-0 lg:bottom-4 w-full">
            <div class="lg:rounded-3xl lg:mx-auto lg:max-w-lg overflow-clip">
                <NavigationBar></NavigationBar>
            </div>
        </nav>
    </div>
</template>

<script lang="tsx" setup>
import Header from '@/components/Header.vue'
import Sidebar from '@/components/Sidebar.vue'
import NavigationBar from '@/components/NavigationBar.vue';
</script>
