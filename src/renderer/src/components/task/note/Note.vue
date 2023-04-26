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

<script setup>
const props = defineProps({
    note: {
        type: String,
        required: true,
        default: ''
    }
})
</script>
