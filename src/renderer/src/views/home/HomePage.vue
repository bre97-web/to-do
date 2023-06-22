<template>
    <div class="relative background">
        <div class="pt-2 m-2">
            <Search></Search>
        </div>

        <TabGroup as="div" class="w-full sticky z-40 top-[0px]">
            <TabList as="md-tabs">
                <Tab as="md-tab">Overview</Tab>
                <Tab as="md-tab">Focus</Tab>
                <Tab as="md-tab">Recycle</Tab>
            </TabList>
            <TabPanels>
                <TabPanel>
                    <Result :itemsFilted="currentFilter" :items="store.getNormal"></Result>
                </TabPanel>
                <TabPanel>
                    <Result :itemsFilted="currentFilter" :items="store.getFocus"></Result>
                </TabPanel>
                <TabPanel>
                    <Result :itemsFilted="currentFilter" :items="store.getRecycle"></Result>
                </TabPanel>
            </TabPanels>
        </TabGroup>

        <!-- Create button -->
        <nav class="fab">
            <md-fab
                label="Create"
                @click="dialog.open = true"
            >
                <md-icon slot="icon">create</md-icon>
            </md-fab>
            <Creator :dialog="dialog" :closeDialog="closeDialog"></Creator>
        </nav>

        <!-- ChipSet -->
        <div class="fixed bottom-24 z-30 backdrop-blur-md fab flex gap-2 mx-4">
            <template v-for="e in getTags()">
                <md-filter-chip @click="putCurrentFilter(e)" :label="e[0]"></md-filter-chip>
            </template>
        </div>

    </div>
</template>

<script lang="ts" setup>
import { TabGroup, TabList, Tab, TabPanels, TabPanel } from '@headlessui/vue'
import Creator from '@/components/creator/Creator.vue'
import Search from '@/components/search/Search.vue'
import '@material/web/tabs/tab'
import '@material/web/tabs/tabs'
import '@material/web/fab/fab'
import '@material/web/icon/icon'
import '@material/web/chips/filter-chip'
import { reactive, ref, watch } from 'vue';
import { useTags } from '@/hooks/useTags'
import { useTaskStore } from '@/store'
import { Item } from '@/hooks/useList/lib/useItem'
import Result from './lib/Result.vue';

/**
 * 控制fab按钮点击后显示的dialog窗口
 */
const dialog: any = reactive({
    open: false
})
const closeDialog = () => (dialog.open = false)

const store = useTaskStore()

/**
 * 当前显示的Task类型（Overview，Focus，Recycle）
 */
enum TaskType {
    OVERVIEW = 0,
    FOCUS,
    RECYCLE
}
const targetType = ref<TaskType>(TaskType.OVERVIEW)

/**
 * 取得所有Item的tags，返回值作为过滤标签，用于过滤器
 */
const getTags = (): Map<string, Item[]> => {
    let result: Map<string, Item[]> = new Map()

    if(targetType.value === TaskType.OVERVIEW) {
        result = useTags([...store.getAll.normal])
    } else if(targetType.value === TaskType.FOCUS) {
        result = useTags([...store.getAll.focus])
    } else if(targetType.value === TaskType.RECYCLE) {
        result = useTags([...store.getAll.recycle])
    }
    return result
}

/**
 * 当前选择的过滤标签
 */
const currentFilter = ref<Map<string, Item[]>>(new Map<string, Item[]>())
const putCurrentFilter = (e: [string, Item[]]) => {
    if(currentFilter.value.get(e[0])) {
        currentFilter.value.delete(e[0])
    } else {
        currentFilter.value?.set(e[0], e[1])
    }
}
/**
 * 当当前显示的Task类型变化后，清空currentFilter
 */
watch(() => targetType.value, () => currentFilter.value = new Map<string, Item[]>())


</script>
