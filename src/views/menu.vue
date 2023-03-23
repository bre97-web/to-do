<template>
    <div class="max-w-md rounded-3xl mx-auto">
        <h1>Menu</h1>

        <div class="p-4 bg-purple-50 rounded-3xl grid grid-cols-2 gap-2">
            <md-tonal-button label="Doing"></md-tonal-button>
            <md-tonal-button label="Pinned"></md-tonal-button>
            <md-tonal-button label="Done"></md-tonal-button>
            <md-tonal-button label="Helper"></md-tonal-button>
        </div>
    </div>
</template>

<script setup>

</script>

<style scoped>
    h1 {
        @apply font-bold text-2xl;
    }
</style>