<template>
    <div>
        <header>
            <h1>Note</h1>
        </header>
        <main>
            <p>{{ props.note }}</p>
        </main>
    </div>
</template>

<script lang="ts" setup>
const props = withDefaults(defineProps<{
    note: string
}>(), {
    note: () => ''
})
</script>
