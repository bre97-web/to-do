<template>
    <div class="relative bg-background">

        <div class="relative container mx-auto h-screen">
            <div class="flex flex-col md:flex-row-reverse h-screen max-h-screen">
                <main class="flex-grow border-x dark:border-none relative overflow-scroll">
                    <router-view v-slot="{ Component }" name="MainView">
                        <component :is="Component"></component>
                    </router-view>
                    <div class="h-[1000px]"></div>
                </main>

                <!-- Bottom Navigation -->
                <nav>
                    <div class="block md:hidden lg:rounded-3xl overflow-clip">
                        <NavigationBottomBar></NavigationBottomBar>
                    </div>
                    <div class="hidden md:block">
                        <NavigationLeftBar></NavigationLeftBar>
                    </div>
                </nav>
            </div>
        </div>
    </div>
</template>

<script lang="tsx" setup>
import NavigationBottomBar from '@/components/NavigationBottomBar.vue';
import NavigationLeftBar from '@/components/NavigationLeftBar.vue';
</script>
