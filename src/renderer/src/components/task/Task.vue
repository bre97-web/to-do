<template>
    <div>
        <header>
            <h1>{{ props.title }}</h1>
            <p>{{ props.subtitle }}</p>
        </header>

        <ul class="tasks">
            <slot></slot>
        </ul>
    </div>
</template>

<script setup>
const props = defineProps({
    title: {
        type: String,
        required: true,
        default: ''
    },
    subtitle: {
        type: String,
        required: true,
        default: ''
    }
})
</script>
