<template>
    <div class="surface bg-white dark:bg-black/50">
        <md-elevation></md-elevation>
        <md-focus-ring></md-focus-ring>
        
        <header>
            <slot name="header"></slot>
        </header>

        <main class="px-4 py-2">
            <slot name="content"></slot>
            <slot name="action"></slot>
        </main>
    </div>
</template>

<script lang="ts" setup>

</script>
