<template>
    <slot></slot>
</template>

<script setup lang="ts">
import { EMaterialContrastLevel, EMaterialVariant, MaterialDynamicSchemeGenerator, type TColor, type TMaterialContrastLevel, type TMaterialVariant  } from '@glare-labs/material-tokens-generator/build/index';
import { ref, watchEffect } from 'vue';

type TSelector = `#${string}` | `.${string}` | keyof HTMLElementTagNameMap
const props = withDefaults(defineProps<Partial<{
    isDark: boolean
    sourceColor: TColor
    contrastLevel: TMaterialContrastLevel
    variant: TMaterialVariant
    target: TSelector
}>>(), {
    contrastLevel: EMaterialContrastLevel.Default,
    isDark: window.matchMedia('(prefers-color-scheme: dark)').matches,
    sourceColor: '#2A6B3C',
    variant: EMaterialVariant.VIBRANT,
    target: 'body'
})

const themeProviderRef = ref<HTMLElement | null>(null)

watchEffect(() => {
    const theme = MaterialDynamicSchemeGenerator.GenerateByVariant(props.sourceColor, {
        isDark: props.isDark,
        contrastLevel: props.contrastLevel,
        variant: props.variant
    })
    document.querySelector(props.target)?.setAttribute('style', theme.ToStyleText())
}, {
    flush: 'post'
})
</script>

<style scoped>

</style>
