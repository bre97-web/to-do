<template>
    <div id="loading">
        <div>
            <img src="../assets/img/icon.png" alt="To-Do" class="max-w-xs" />
            <div>
                
                <h1>To-Do</h1>
            </div>
        </div>
    </div>
</template>

<script lang="ts" setup>
// import Spinner from 'vue-simple-spinner/src/components/Spinner.vue'
</script>

<style scoped>
#loading * {
    @apply pointer-events-none select-none;
}
#loading {
    @apply fixed bg-white w-full min-h-screen top-0 left-0 z-50 flex flex-col items-center justify-center;
    transition: none;
}
#loading > div {
    @apply text-center flex flex-col items-center justify-center gap-10;
    transition: all 0.45s;
}
#loading > div > img {
    @apply relative top-0;
    animation: lead 0.5s;
}

@keyframes lead {
    from {
        @apply opacity-0 -top-5;
    }
    to {
        @apply opacity-100 top-0;
    }
}
</style>
