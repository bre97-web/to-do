<template>
    <div id="loading" class="bg-background">
        <div>
            <img src="../assets/img/icon.png" alt="To-Do" class="max-w-xs" />
            <div>
                <md-linear-progress indeterminate></md-linear-progress>
                <h1>To-Do</h1>
            </div>
        </div>
    </div>
</template>

<script lang="ts" setup>
import '@material/web/linearprogress/linear-progress'

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
    @apply text-center flex flex-col items-center justify-center gap-10 w-full;
}
#loading > div > img {
    @apply relative top-0;
    animation: lead 0.25s;
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
