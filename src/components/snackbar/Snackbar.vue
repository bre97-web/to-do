<template>
    <div class="snackbar">
        <span class="text">
            <slot></slot>
        </span>

        <div class="action-button">
            <slot name="action"></slot>
        </div>
    </div>
</template>

<script setup lang="ts">
import { Ref, watch } from 'vue'


const props = withDefaults(defineProps<{
    rollable?: boolean
    twoLines?: boolean
    watchTarget: () => any | Ref<any>
    watchCallback: () => void
}>(), {
    rollable: false,
    twoLines: false
})
const emits = defineEmits<{
    'rollup': []
}>()

// watch(props.watchTarget, props.watchCallback)


</script>

<style scoped>
.snackbar {
    height: 48px;
    width: 344px;
    padding-left: 16px;
    padding-right: 16px;
    padding-top: 16px;
    padding-bottom: 16px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    flex-wrap: wrap;
    @apply z-50 scrim inverse-on-surface absolute bottom-4 left-4 rounded-md shadow-[--md-sys-color-shadow] shadow-sm;
}
.text {
    align-self: flex-start;
}
.action-button {
    align-self: flex-end;
}
</style>
