<template>
    <div>
        <header class="flex flex-row items-end justify-start gap-2">
            <h1>Search</h1>
            <h1 class="underline underline-offset-1">
                <mark>{{ props.input }}</mark>
            </h1>
        </header>
    </div>
</template>

<script setup>
const props = defineProps({
    input: {
        type: String
    }
})
</script>
