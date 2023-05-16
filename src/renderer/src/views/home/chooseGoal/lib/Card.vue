<template>
    <div class="surface">
        <md-elevation></md-elevation>

        <header>
            <slot name="header"></slot>
        </header>

        <main class="px-4 py-2">
            <slot name="content"></slot>
        </main>
    </div>
</template>

<script lang="ts" setup>

</script>
