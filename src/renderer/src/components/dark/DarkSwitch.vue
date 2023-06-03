<template>
    <md-switch
        ref="element"
        @click="setIsDark"
    ></md-switch>
</template>

<script setup lang="ts">
import '@material/web/switch/switch'
import useTheme from '@/hooks/useTheme'
import { onMounted, ref } from 'vue'

interface Switch {
    selected: boolean
}

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
    (element.value as HTMLElement & Switch).selected = isDark.value
})
            
</script>

<style scoped>

</style>