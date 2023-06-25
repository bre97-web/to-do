<template>
    <div>
        <GoalsList></GoalsList>

        <nav class="fab">
            <md-fab label="Create" @click="dialog.open = true">
                <md-icon slot="icon">create</md-icon>
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
