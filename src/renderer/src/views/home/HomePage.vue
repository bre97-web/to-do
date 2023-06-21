<template>
    <div class="relative background">
        <div class="w-full sticky z-40 top-[0px]">
            <md-tabs>
                <md-tab @click="() => {
                    targetType = TaskType.OVERVIEW
                    router.push('/home/overview')
                }">Overview</md-tab>
                <md-tab @click="() => {
                    targetType = TaskType.FOCUS
                    router.push('/home/focus')
                }">Focus</md-tab>
                <md-tab @click="() => {
                    targetType = TaskType.RECYCLE
                    router.push('/home/recycle')
                }">Recycle</md-tab>
            </md-tabs>
        </div>

        <Search></Search>

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
                <md-filter-chip @click="putCurrentFilter(e[0])" :label="e[0]"></md-filter-chip>
            </template>
        </div>
        
        <router-view v-slot="{ Component }" name="HomePageInnerBoardView" filter="qq">
            <component :is="Component"></component>
        </router-view>
    </div>
</template>

<script lang="ts" setup>
import Creator from '@/components/creator/Creator.vue'
import Search from '@/components/search/Search.vue'
import '@material/web/tabs/tab'
import '@material/web/tabs/tabs'
import '@material/web/fab/fab'
import '@material/web/icon/icon'
import '@material/web/chips/filter-chip'
import { reactive, ref } from 'vue';
import { useRouter } from 'vue-router';
import { useTags } from '@/hooks/useTags'
import { useTaskStore } from '@/store'
import { Item } from '@/hooks/useList/lib/useItem'

const router = useRouter()

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
    console.log(result.values());
    return result
}

/**
 * 当前选择的过滤标签
 */
const currentFilter = ref<string[]>([])
const putCurrentFilter = (e: string) => {
    if(currentFilter.value.includes(e)) {
        currentFilter.value.splice(currentFilter.value.indexOf(e), 1)
    } else {
        currentFilter.value.push(e)
    }
}
</script>
