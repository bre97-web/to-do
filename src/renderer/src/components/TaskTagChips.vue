<template>
    <md-chip-set ref="chipGroup">
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
import { ref } from 'vue'

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
