<template>
    <TabGroup as="div" class="relative w-full z-40">
        <TabList as="md-tabs" class="sticky top-[0px]">
            <Tab as="md-tab" @click="setTargetTypeWithResetFilter(TaskType.NONE)">Overview</Tab>
            <Tab as="md-tab" @click="setTargetTypeWithResetFilter(TaskType.NORMAL)">Todo</Tab>
            <Tab as="md-tab" @click="setTargetTypeWithResetFilter(TaskType.FOCUS)">Focus</Tab>
            <Tab as="md-tab" @click="setTargetTypeWithResetFilter(TaskType.RECYCLE)">Recycle</Tab>
        </TabList>
        <TabPanels>
            <TabPanel>
                <Overview></Overview>
            </TabPanel>
            <TabPanel>
                <Result :itemsFilted="props.currentFilter" :items="props.tasks.normal"></Result>
            </TabPanel>
            <TabPanel>
                <Result :itemsFilted="props.currentFilter" :items="props.tasks.focus"></Result>
            </TabPanel>
            <TabPanel>
                <Result :itemsFilted="props.currentFilter" :items="props.tasks.recycle"></Result>
            </TabPanel>
        </TabPanels>
    </TabGroup>
</template>

<script setup lang="ts">
import { TabGroup, TabList, Tab, TabPanels, TabPanel } from '@headlessui/vue'
import Result from './Result.vue';
import Overview from './Overview.vue'
import { Items } from '@/hooks/useList/lib/useItem';

enum TaskType {
    NONE = 0,
    NORMAL,
    FOCUS,
    RECYCLE
}
const props = defineProps<{
    targetType: TaskType,
    setTargetType: (e: TaskType) => {},
    currentFilter: string[],
    clearCurrentFilter: () => void,
    tasks: {
        focus: Items;
        normal: Items;
        recycle: Items;
    }
}>()

/**
 * 当当前显示的Task类型变化后，清空currentFilter
 */
const setTargetTypeWithResetFilter = (e: TaskType) => {
    props.setTargetType(e)
    props.clearCurrentFilter()
}
</script>

<style scoped>

</style>