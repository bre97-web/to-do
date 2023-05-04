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
const props: any = defineProps({
    date: {
        type: String,
        required: true,
        default: ''
    }
})
</script>
