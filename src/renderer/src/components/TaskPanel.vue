<template>
    <TabGroup as="div" class="relative w-full">
        <TabList as="md-tabs" class="sticky top-[0px] z-50">
            <Tab as="md-tab" @click="setTargetTypeWithResetFilter('overview')">Overview</Tab>
            <Tab as="md-tab" @click="setTargetTypeWithResetFilter('processing')">Processing</Tab>
            <Tab as="md-tab" @click="setTargetTypeWithResetFilter('pinned')">Pinned</Tab>
            <Tab as="md-tab" @click="setTargetTypeWithResetFilter('done')">Done</Tab>
        </TabList>
        <TabPanels>
            <TabPanel>
                <Overview></Overview>
            </TabPanel>
            <TabPanel>
                <Result :itemsFilted="props.currentFilter" :items="props.tasks"></Result>
            </TabPanel>
            <TabPanel>
                <Result :itemsFilted="props.currentFilter" :items="props.tasks"></Result>
            </TabPanel>
            <TabPanel>
                <Result :itemsFilted="props.currentFilter" :items="props.tasks"></Result>
            </TabPanel>
        </TabPanels>
    </TabGroup>
</template>

<script setup lang="ts">
import { TabGroup, TabList, Tab, TabPanels, TabPanel } from '@headlessui/vue'
import Result from '@/components/TaskFiltedShower.vue'
import Overview from '@/components/TaskOverview.vue'
import { ProgressStatus, Tasks } from '@/hooks/useTask';

type PageName = ProgressStatus | 'overview'
const props = defineProps<{
    currentPage: PageName
    setCurrentPage: (e: PageName) => void
    currentFilter: string[]
    clearCurrentFilter: () => void
    tasks: Tasks
}>()

/**
 * 当当前显示的Task类型变化后，清空currentFilter
 */
const setTargetTypeWithResetFilter = (e: PageName) => {
    props.setCurrentPage(e)
    props.clearCurrentFilter()
}
</script>

<style scoped></style>
