<template>
    <div>
        <ul>
            <li v-for="e in list.getValues()">{{ e }}</li>
        </ul>
    </div>
</template>

<script setup>
import useList from '../hooks/useList'

const list = useList()

</script>

<style lang="scss" scoped>

</style>