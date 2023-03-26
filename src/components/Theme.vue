<template>
    <div>
        <ul class="list">
            <li v-for="e in theme.getThemeColor()" @click="theme.set({
                    color: e
                })">
                <h1>{{ e }}</h1>
            </li>
        </ul>
    </div>
</template>

<script setup>
import useTheme from '@/hooks/useTheme'

const theme = useTheme()

</script>

<style scoped>

</style>