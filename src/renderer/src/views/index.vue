<template>
    <div class="relative bg-[var(--md-sys-color-surface-container)]">

        <div class="relative container mx-auto h-screen">
            <div class="flex flex-col md:flex-row-reverse h-screen max-h-screen">
                
                <!-- <aside class="hidden lg:block w-64 rounded-3xl bg-[var(--md-sys-color-surface-container-lowest)] m-0 md:m-4 overflow-scroll">

                </aside> -->

                <main class="flex-grow relative rounded-none md:rounded-3xl bg-[var(--md-sys-color-surface-container-lowest)] m-0 md:m-4 overflow-scroll">
                    <router-view v-slot="{ Component }" name="MainView">
                        <component :is="Component"></component>
                    </router-view>
                </main>

                <!-- Bottom Navigation -->
                <nav>
                    <div class="block md:hidden lg:rounded-3xl overflow-clip">
                        <NavigationBottomBar></NavigationBottomBar>
                    </div>
                    <div class="hidden md:block">
                        <NavigationLeftBar></NavigationLeftBar>
                    </div>
                    <div :class="{'bottom-44 md:bottom-24': !isNullEvent}" class="block md:hidden fixed right-4 bottom-24">
                        <!-- Create button -->
                        <CreatorFabButton></CreatorFabButton>
                    </div>
                </nav>
            </div>
        </div>
    </div>
</template>

<script lang="tsx" setup>
import CreatorFabButton from '@/components/CreatorFabButton.vue';
import NavigationBottomBar from '@/components/NavigationBottomBar.vue';
import NavigationLeftBar from '@/components/NavigationLeftBar.vue';
import { useEventStore } from '@/store/useEventStore';
import { computed } from 'vue';

/**
 * 控制类，当event不为空时需要将元素偏移，保证元素不被EventSnackbar遮挡
 */
 const event = useEventStore()
const isNullEvent = computed<boolean>(() => event.getEvent === null)
</script>
