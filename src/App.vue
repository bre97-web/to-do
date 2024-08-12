<template>
    <ThemeProvider 
        :source-color="theme.sourceColor" 
        :contrast-level="theme.contrastLevel" 
        :variant="theme.variant" 
        :is-dark="theme.isDark"
    >

        <RouterView v-slot="{ Component }">
            <component :is="Component"></component>
        </RouterView>

    </ThemeProvider>
</template>

<script lang="ts" setup>
import ThemeProvider from './components/theme-provider/ThemeProvider.vue';
import {useThemeStore} from './store/useThemeStore'

const theme = useThemeStore()
</script>
