<template>
    <div class="z-50">
        <md-fab lowered variant="primary" :label="props.label" @click="dialog.open = true">
            <md-icon slot="icon" class="text-[var(--md-sys-color-on-primary)]">add</md-icon>
        </md-fab>
        <Creator :dialog="dialog" :close-dialog="closeDialog"></Creator>
    </div>
</template>

<script setup lang="ts">
import { reactive } from 'vue'
import Creator from '@/components/creator/Creator.vue'

const props = withDefaults(defineProps<{
    label?: string
}>(), {
    label: () => ''
})

/**
 * 控制fab按钮点击后显示的dialog窗口
 */
const dialog = reactive<{
    open: boolean
}>({
    open: false
})
const closeDialog = () => (dialog.open = false)
</script>
