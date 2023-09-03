<template>
    <PageWithBackLayout>
        <TabGroup>
            <TabList as="md-tabs" class="w-full sticky top-14 z-30">
                <Tab as="md-tab">Profile</Tab>
                <Tab as="md-tab">Theme</Tab>
                <Tab as="md-tab">System</Tab>
                <Tab as="md-tab">Shortcut</Tab>
            </TabList>
            <TabPanels class="m-8">
                <TabPanel>
                    <ProfilePanel></ProfilePanel>
                </TabPanel>
                <TabPanel>
                    <ThemePanel></ThemePanel>
                </TabPanel>
                <TabPanel>
                    <SystemPanel></SystemPanel>
                </TabPanel>
                <TabPanel>
                    <ShortcutPanel></ShortcutPanel>
                </TabPanel>
            </TabPanels>
        </TabGroup>
    </PageWithBackLayout>
</template>

<script setup lang="ts">
import ProfilePanel from '@/components/dashboard/ProfilePanel.vue'
import SystemPanel from '@/components/dashboard/SystemPanel.vue'
import ThemePanel from '@/components/dashboard/ThemePanel.vue'
import ShortcutPanel from '@/components/dashboard/ShortcutPanel.vue'
import PageWithBackLayout from '@/layouts/PageWithBackLayout.vue'
import { TabGroup, TabList, Tab, TabPanels, TabPanel } from '@headlessui/vue'
</script>
