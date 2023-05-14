<template>
    <div class="flex items-center justify-start gap-4">
        <header class="self-start mt-4">
            <slot name="header"></slot>
        </header>

        <main>
            <slot name="content"></slot>
        </main>
    </div>
</template>

<script lang="ts" setup>
</script>
