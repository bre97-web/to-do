<template>
    <div>
        <header>
            {{ title }}
        </header>

        <main>
            <slot></slot>
        </main>
    </div>
</template>

<script lang="ts" setup>

interface TaskInfo {
    title: string
}

defineProps<TaskInfo>()
</script>
