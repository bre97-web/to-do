<template>
    <div class="relative w-full">
        <TabGroup as="div" class="relative flex flex-col md:flex-row h-screen">
            <TabList as="div" class="relative flex flex-row md:flex-col border w-full md:max-w-xs h-auto md:h-screen p-2 md:p-8 gap-1">
                <div class="md:absolute md:bottom-4">
                    <md-text-button @click="router.push('/')">
                        <span class="material-symbols-outlined">arrow_back</span>
                        back
                    </md-text-button>
                </div>
                
                <div class="hidden md:flex gap-2 items-center justify-start mb-8">
                    <span class="material-symbols-outlined">dashboard</span>
                    <h1 class="text-2xl">Dashboard</h1>
                </div>
                
                <Tab as="template">
                    <md-text-button>Account</md-text-button>
                </Tab>

                <Tab as="template">
                    <md-text-button>Theme</md-text-button>
                </Tab>

                <Tab as="template">
                    <md-text-button>System</md-text-button>
                </Tab>
            </TabList>

            <TabPanels class="p-8">
                <TabPanel as="template">
                    <Account></Account>
                </TabPanel>
                <TabPanel as="template">
                    <Theme></Theme>
                </TabPanel>
                <TabPanel as="template">
                    <System></System>
                </TabPanel>
            </TabPanels>
        </TabGroup>
    </div>
</template>

<script setup lang="ts">
import { TabGroup, TabList, Tab, TabPanels, TabPanel } from '@headlessui/vue'
import '@material/web/button/text-button'
import Account from './lib/Account.vue'
import Theme from './lib/Theme.vue';
import System from './lib/System.vue'
import { useRouter } from 'vue-router';

const router = useRouter()
</script>

<style scoped>
main {
    @apply mt-12;
}
</style>