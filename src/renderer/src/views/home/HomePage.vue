<template>
    <div class="relative">
        <div>
            <Search></Search>
        </div>

        <Content :targetType="targetType" :setTargetType="setTargetType" :currentFilter="currentFilter" :clearCurrentFilter="clearCurrentFilter" :tasks="store.tasks"></Content>

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
        <div class="fixed bottom-24 lg:bottom-28 z-30 backdrop-blur-md fab flex gap-2 mx-4">
            <Chips v-if="targetType !== TaskType.NONE && getTags.getString.length !== 0" :currentFilter="currentFilter" :pushCurrentFilter="pushCurrentFilter" :clearCurrentFilter="clearCurrentFilter" :getTags="getTags.getString"></Chips>
        </div>

    </div>
</template>

<script lang="ts" setup>
import Creator from '@/components/creator/Creator.vue'
import Search from '@/components/search/Search.vue'
import Content from './lib/Content.vue'
import { computed, reactive, ref, watch } from 'vue';
import Chips from './lib/Chips.vue'
import { useTags } from '@/hooks/useTags'
import { useTaskStore } from '@/store/useTaskStore'
import { Item } from '@/hooks/useItem'

const store = useTaskStore()

/**
 * 当前显示的Task类型（Overview，Focus，Recycle）
 */
enum TaskType {
    NONE = 0,
    NORMAL,
    FOCUS,
    RECYCLE
}
const targetType = ref<TaskType>(TaskType.NONE)
const setTargetType = (e: TaskType) => targetType.value = e


/**
 * 当前选择的过滤标签
 */
const currentFilter = ref<string[]>([])

/**
 * 清除currentFilter对象的元素
 */
const clearCurrentFilter = () => {
    currentFilter.value = []
}
/**
 * 向currentFilter对象toggle一个元素e
 */
const pushCurrentFilter = (e: string) => {
    if(currentFilter.value.includes(e)) {
        currentFilter.value.splice(currentFilter.value.indexOf(e), 1)
    } else {
        currentFilter.value.push(e)
    }
}

/**
 * 此监视器将在store中tasks发生变化时更新currentFilter
 */
watch(store.tasks, () => {
    let map = getTags.value.map

    let found: string[] = []
    map.forEach((_, k) => {
        if(currentFilter.value.includes(k)) {
            found.push(k)
        }
    })

    currentFilter.value = found
})

/**
 * 取得所有Item的tags，返回值作为过滤标签，用于过滤器
 */
 const getTags = computed(() => {
    let result: string[] = []
    let iterable = useTags(store.getAll.normal)
    
    if(targetType.value === TaskType.FOCUS) {
        iterable = useTags(store.getAll.focus)
    } else if(targetType.value === TaskType.RECYCLE) {
        iterable = useTags(store.getAll.recycle)
    }

    for(const e of iterable.keys()) {
        result.push(e)
    }

    return {
        map: iterable as Map<string, Item[]>,
        getString: result
    }
})

/**
 * 控制fab按钮点击后显示的dialog窗口
 */
const dialog: any = reactive({
    open: false
})
const closeDialog = () => (dialog.open = false)
</script>
