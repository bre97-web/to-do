<template>
    <slot :categories="categories"></slot>
</template>

<script setup lang="ts">
import { provide } from 'vue';
import { Categories } from '../../store/Category';

const categories = new Categories()

provide('categories', categories)
</script>

<style scoped>

</style>