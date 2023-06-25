<template>
    <md-switch ref="element" @click="setIsDark"></md-switch>
</template>

<script setup lang="ts">
import useTheme from '@/hooks/useTheme'
import { onMounted, ref } from 'vue'

const theme = useTheme()

const element = ref()
const isDark = ref(theme.getCurrent().isDark)
const setIsDark = () => {
    isDark.value = !isDark.value
    theme.set({
        isDark: isDark.value
    })
}

onMounted(() => {
    element.value.selected = isDark.value
})
</script>
