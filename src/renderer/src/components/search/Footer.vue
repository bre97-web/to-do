<template>
    <footer>
        <p class="text-right text-gray-500 dark:text-gray-300">
            Accumulate {{ props.get.length }} results
        </p>
    </footer>
</template>

<script setup>
const props = defineProps({
    get: {
        type: Object,
        default: null
    }
})
</script>
