<template>
    <label>
        <p>Dark</p>
        <md-switch
            :selected="theme.get().current.isDark"
            @click="theme.set({
                isDark: !theme.getCurrent().isDark
            })"
        ></md-switch>
    </label>
</template>

<script lang="ts" setup>
import useTheme from '@/hooks/useTheme'

/**
 * 修改主题
 */
const theme = useTheme()
</script>
