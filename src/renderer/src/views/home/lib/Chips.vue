<template>
    <div class="space-x-2">
        <span class="space-x-2" ref="chipGroup">
            <md-filter-chip v-for="(e, index) in props.getTags" :key="index" @click="props.pushCurrentFilter(e)" :label="e"></md-filter-chip>
        </span>
        <md-suggestion-chip label="Reset" @click="() => {
            props.clearCurrentFilter()
            syncFilterChipState()
        }"></md-suggestion-chip>
    </div>
</template>

<script setup lang="ts">
import '@material/web/chips/filter-chip'
import '@material/web/chips/suggestion-chip'
import { ref } from 'vue';

interface Select {
    selected: boolean
}
const chipGroup = ref()
const syncFilterChipState = () => {
    Array.from(chipGroup.value.children).forEach(e => {
        (e as Select).selected = false
    })
    
}

const props = defineProps<{
    currentFilter: string[],
    pushCurrentFilter: (e: string) => void,
    clearCurrentFilter: () => void,
    getTags: string[]
}>()


</script>

<style scoped>

</style>