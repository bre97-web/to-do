<template>
    <div class="relative">
        <div>
            <SearchResult></SearchResult>
        </div>

        <Content
            :target-type="targetType"
            :set-target-type="setTargetType"
            :current-filter="currentFilter"
            :clear-current-filter="clearCurrentFilter"
            :tasks="store.tasks"
        ></Content>

        <!-- Create button -->
        <CreatorFabButton></CreatorFabButton>

        <!-- ChipSet -->
        <Chips
            v-if="targetType !== TaskType.NONE && getTags.getString.length !== 0"
            :current-filter="currentFilter"
            :push-current-filter="pushCurrentFilter"
            :clear-current-filter="clearCurrentFilter"
            :get-tags="getTags.getString"
        ></Chips>
    </div>
</template>

<script lang="ts" setup>
import SearchResult from '@/components/SearchResult.vue'
import Content from '@/components/TaskPanel.vue'
import { computed, ref, watch } from 'vue'
import Chips from '@/components/TaskTagChips.vue'
import { useTags } from '@/hooks/useTags'
import { useTaskStore } from '@/store/useTaskStore'
import { Item } from '@/hooks/useItem'
import CreatorFabButton from '@/components/CreatorFabButton.vue'

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
const setTargetType = (e: TaskType) => {
    targetType.value = e
}

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
    if (currentFilter.value.includes(e)) {
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
        if (currentFilter.value.includes(k)) {
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

    if (targetType.value === TaskType.FOCUS) {
        iterable = useTags(store.getAll.focus)
    } else if (targetType.value === TaskType.RECYCLE) {
        iterable = useTags(store.getAll.recycle)
    }

    for (const e of iterable.keys()) {
        result.push(e)
    }

    return {
        map: iterable as Map<string, Item[]>,
        getString: result
    }
})
</script>
