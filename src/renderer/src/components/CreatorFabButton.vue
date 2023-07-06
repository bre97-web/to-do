<template>
    <div :class="{'bottom-44 md:bottom-24': !isNullEvent}" class="fixed bottom-24 right-5 lg:bottom-5 z-50">
        <md-fab @click="dialog.open = true">
            <md-icon slot="icon">add</md-icon>
        </md-fab>
        <Creator :dialog="dialog" :close-dialog="closeDialog"></Creator>
    </div>
</template>

<script setup lang="ts">
import { computed, reactive } from 'vue'
import Creator from '@/components/creator/Creator.vue'
import { useEventStore } from '@/store/useEventStore'

/**
 * 控制类，当event不为空时需要将元素偏移，保证元素不被EventSnackbar遮挡
 */
const event = useEventStore()
const isNullEvent = computed<boolean>(() => event.getEvent === null)

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
