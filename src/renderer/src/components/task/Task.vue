<template>
    <div>
        <header>
            <h1>{{ props.title }}</h1>
            <p>{{ props.subtitle }}</p>
        </header>

        <main>
            <slot></slot>
        </main>
    </div>
</template>

<script lang="ts" setup>
const props: any = defineProps({
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
