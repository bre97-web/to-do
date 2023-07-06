<template>
    <md-chip-set ref="chipGroup" :class="{'bottom-44': !isNullEvent}" class="fixed bottom-24 lg:bottom-28 z-50 mx-4">
        <md-filter-chip
            v-for="(e, index) in props.getTags"
            :key="index"
            :label="e"
            @click="props.pushCurrentFilter(e)"
        ></md-filter-chip>
        <md-suggestion-chip
            label="Reset"
            @click="
                () => {
                    props.clearCurrentFilter()
                    syncFilterChipState()
                }
            "
        ></md-suggestion-chip>
    </md-chip-set>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'
import { useEventStore } from '@/store/useEventStore'

/**
 * 控制类，当event不为空时需要将元素偏移，保证元素不被EventSnackbar遮挡
 */
const event = useEventStore()
const isNullEvent = computed<boolean>(() => event.getEvent === null)


const chipGroup = ref()
const syncFilterChipState = () => {
    Array.from(chipGroup.value.children).forEach((e: any) => {
        e.selected = false
    })
}

const props = defineProps<{
    currentFilter: string[]
    pushCurrentFilter: (e: string) => void
    clearCurrentFilter: () => void
    getTags: string[]
}>()
</script>

<style scoped></style>
