<template>
    <div>
        <GoalsList></GoalsList>

        <nav class="fixed right-5 bottom-24 lg:bottom-5 z-50">
            <md-fab @click="dialog.open = true">
                <md-icon slot="icon">add</md-icon>
            </md-fab>
            <Creator :dialog="dialog" :close-dialog="closeDialog"></Creator>
        </nav>
    </div>
</template>

<script lang="ts" setup>
import Creator from '@/components/creator/Creator.vue'
import GoalsList from './lib/GoalsList.vue'
import { reactive } from 'vue'

/**
 * 控制fab按钮点击后显示的dialog窗口
 */
const dialog: any = reactive({
    open: false
})
const closeDialog = () => (dialog.open = false)
</script>
