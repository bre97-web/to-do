<template>
    <div>
        <header>
            <h1>Date</h1>
        </header>

        <main>
            <p>{{ props.date }}</p>
        </main>
    </div>
</template>

<script lang="ts" setup>
const props = withDefaults(defineProps<{
    date: string
}>(), {
    date: () => ''
})
</script>
