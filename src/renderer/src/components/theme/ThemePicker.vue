<template>
    <md-outlined-segmented-button-set>
        <md-outlined-segmented-button
            v-for="(e, index) in theme.getThemeColor()"
            :key="index"
            :label="e.toUpperCase()"
            @click="() =>
                theme.set({
                    color: e
                })
            "
        >
        </md-outlined-segmented-button>
    </md-outlined-segmented-button-set>
</template>

<script setup lang="ts">
import useTheme from '@/hooks/useTheme'

const theme = useTheme()
</script>

<style scoped></style>