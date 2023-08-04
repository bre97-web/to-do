<template>
    <PageLayout>
        <div>
            <SearchResult></SearchResult>
        </div>

        <Content
            :current-page="currentPage"
            :set-current-page="setCurrentPage"
            :current-filter="currentFilter"
            :clear-current-filter="clearCurrentFilter"
            :tasks="store.tasks"
        ></Content>

        <!-- ChipSet -->
        <Chips
            v-if="currentPage !== 'overview' && getTags.getString.length !== 0"
            :current-filter="currentFilter"
            :push-current-filter="pushCurrentFilter"
            :clear-current-filter="clearCurrentFilter"
            :get-tags="getTags.getString"
        ></Chips>
    </PageLayout>
</template>

<script lang="ts" setup>
import SearchResult from '@/components/SearchResult.vue'
import Content from '@/components/TaskPanel.vue'
import { computed, ref, watch } from 'vue'
import Chips from '@/components/TaskTagChips.vue'
import { useTags } from '@/hooks/useTags'
import { useTaskStore } from '@/store/useTaskStore'
import PageLayout from '@/layouts/PageLayout.vue'
import { ProgressStatus, Tasks } from '@/hooks/useTask'

const store = useTaskStore()

/**
 * 当前显式的页面名称
 *  overview
 *  processing
 *  pinned
 *  done
 */
type PageName = ProgressStatus | 'overview'
const currentPage = ref<PageName>('processing')
const setCurrentPage = (e: PageName) => {
    currentPage.value = e
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
    let iterable = useTags(store.getAll)

    for (const e of iterable.keys()) {
        result.push(e)
    }

    return {
        map: iterable as Map<string, Tasks[]>,
        getString: result
    }
})
</script>
