<template>
    <MaterialThemeProvider 
        :hctToInt="mdConfig.hct.toInt()" 
        :contrast-level="mdConfig.contrastLevel" 
        :variant="mdConfig.variant" 
        :is-dark="mdConfig.isDark"
    >

        <RouterView v-slot="{ Component }">
            <component :is="Component"></component>
        </RouterView>

    </MaterialThemeProvider>
</template>

<script lang="ts" setup>
import { inject, onBeforeUnmount, onMounted } from 'vue';
import {MaterialThemeProvider} from './components/material-provider/material-theme-provider';
import { type IMaterialThemeConfigurationService, MaterialThemeConfigurationServiceSymbol } from './services/material-theme-configuration.service'
import { MediaQueryService, MediaQueryServiceSymbol } from './services/media-query.service';

const mdConfig = inject<IMaterialThemeConfigurationService>(MaterialThemeConfigurationServiceSymbol)!
const mediaQuery = inject<MediaQueryService>(MediaQueryServiceSymbol)!

const onWindowResize = () => {
    mediaQuery.onWindowResize(window, document.body)
}

onMounted(() => {
    onWindowResize()
    window.addEventListener('resize', onWindowResize)
})
onBeforeUnmount(() => {
    window.removeEventListener('resize', onWindowResize)
})
</script>
