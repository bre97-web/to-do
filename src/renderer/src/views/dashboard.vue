<template>
    <PageLayout>
        <div>
            <TabGroup>
                <TabList as="md-tabs" class="w-full">
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
        </div>
    </PageLayout>
</template>

<script setup lang="ts">
import ProfilePanel from '@/components/ProfilePanel.vue'
import SystemPanel from '@/components/SystemPanel.vue'
import ThemePanel from '@/components/ThemePanel.vue'
import ShortcutPanel from '@/components/ShortcutPanel.vue'
import PageLayout from '@/layouts/PageLayout.vue'
import { TabGroup, TabList, Tab, TabPanels, TabPanel } from '@headlessui/vue'
</script>
