<template>
    <PageLayout>

        <Content
            :current-page="currentPage"
            :set-current-page="setCurrentPage"
            :current-filter="currentFilter"
            :clear-current-filter="clearCurrentFilter"
            :tasks="store.tasks"
        ></Content>

        <!-- ChipSet -->
        <Chips
            v-if="currentPage !== 'overview' && tags.length !== 0"
            :current-filter="currentFilter"
            :push-current-filter="pushCurrentFilter"
            :clear-current-filter="clearCurrentFilter"
            :get-tags="tags"
        ></Chips>
    </PageLayout>
</template>

<script lang="ts" setup>
import Content from '@/components/TaskPanel.vue'
import { computed, ref } from 'vue'
import Chips from '@/components/TaskTagChips.vue'
import { useTaskStore } from '@/store/useTaskStore'
import PageLayout from '@/layouts/PageLayout.vue'
import { ProgressStatus } from '@/hooks/useTask'

const store = useTaskStore()

/**
 * 当前显式的页面名称
 *  overview
 *  processing
 *  pinned
 *  done
 */
type PageName = ProgressStatus | 'overview'
const currentPage = ref<PageName>('overview')
const setCurrentPage = (e: PageName) => {
    currentPage.value = e
}

/**
 * 当前选择的过滤标签
 */
const currentFilter = ref<string[]>([])
const clearCurrentFilter = () => {
    currentFilter.value = []
}
const pushCurrentFilter = (e: string) => {
    if (currentFilter.value.includes(e)) {
        currentFilter.value.splice(currentFilter.value.indexOf(e), 1)
    } else {
        currentFilter.value.push(e)
    }
}

/**
 * 可供选择的标签数组
 */
const tags = computed<string[]>(() => {
    if(currentPage.value === 'processing') {
        return store.getProcessingTags || []
    } else if(currentPage.value === 'pinned') {
        return store.getPinnedTags || []
    } else if(currentPage.value === 'done') {
        return store.getDoneTags || []
    }
    return []
})

</script>
