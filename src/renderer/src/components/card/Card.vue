<template>
    <div class="surface select-none">
        <md-ripple></md-ripple>
        <md-elevation></md-elevation>

        <header>
            <slot name="header"></slot>
        </header>

        <slot></slot>

        <footer>
            <slot name="footer"></slot>
        </footer>
    </div>
</template>

<script setup lang="ts">
import '@material/web/ripple/ripple'
import '@material/web/elevation/elevation'
</script>

<style scoped>

</style>