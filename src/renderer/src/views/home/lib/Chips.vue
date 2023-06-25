<template>
    <div class="space-x-2">
        <span ref="chipGroup" class="space-x-2">
            <md-filter-chip
                v-for="(e, index) in props.getTags"
                :key="index"
                :label="e"
                @click="props.pushCurrentFilter(e)"
            ></md-filter-chip>
        </span>
        <md-suggestion-chip
            label="Reset"
            @click="
                () => {
                    props.clearCurrentFilter()
                    syncFilterChipState()
                }
            "
        ></md-suggestion-chip>
    </div>
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
