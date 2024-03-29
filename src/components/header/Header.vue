<template>
    <div class="header">
        
        <!-- Drawer toggle button & Website title -->
        <div class="left-part">
            <span class="pl-2 title-medium on-surface">{{ Website.title }}</span>
        </div>

        <!-- Search -->
        <div></div>

        <div class="actions">

            <md-icon-button
        @click="hanldeClick" 
        :aria-label="`Switch to ${theme.isDark ? 'light' : 'dark'} theme`"
    >
        <md-icon>{{ theme.isDark ? 'light_mode' : 'dark_mode' }}</md-icon>
    </md-icon-button>

            <md-icon-button @click="router.push('/settings')">
                <md-icon>settings</md-icon>
            </md-icon-button>


        </div>
    </div>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router';
import { Website } from '../../utils/Const'
import { useThemeStore } from '../../store/useThemeStore'

const router = useRouter()

const theme = useThemeStore()
const hanldeClick = () => {
    theme.setIsDark(!theme.isDark)
}
</script>

<style scoped>

.header {
    @apply surface-container-high flex justify-between p-2;
}
.header .left-part {
    @apply flex items-center flex-1 gap-1;
}
.header .actions {
    @apply flex items-center gap-1;
}
</style>