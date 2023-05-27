<template>
    <div class="surface surfaceContainer rounded-3xl w-48 md:w-96">
        <md-elevation></md-elevation>
        <md-focus-ring></md-focus-ring>
        
        <header class="overflow-clip rounded-3xl w-48 md:w-96 max-h-32 md:max-h-64">
            <slot name="header"></slot>
        </header>

        <main class="px-4 py-2">
            <slot name="content"></slot>
            <slot name="action"></slot>
        </main>
    </div>
</template>

<script lang="ts" setup>
import '@material/web/focus/focus-ring'
import '@material/web/elevation/elevation'


</script>
