<template>
    <footer>
        <p class="text-right text-gray-500 dark:text-gray-300">
            Accumulate {{ props.get.length }} results
        </p>
    </footer>
</template>

<script lang="ts" setup>
import { Items } from '@/hooks/useList'

const props = defineProps<{
    get: Items
}>()
</script>
