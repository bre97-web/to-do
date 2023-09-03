<template>
    <div class="space-y-4 text-center">
        <div class="space-y-4 pt-24 text-center">
            <md-icon class="scale-[4]">done_all</md-icon>
            <BodyMedium class="text-center italic">All done</BodyMedium>
        </div>
        <div>
            <md-tonal-button @click="() => creatorDialog.open = true">Create</md-tonal-button>
        </div>
    </div>
</template>

<script setup lang="ts">
import { MDDialog } from '@/types/MDDialog';

const creatorDialog = document.querySelector('#creatorDialog') as MDDialog
</script>

<style scoped></style>
