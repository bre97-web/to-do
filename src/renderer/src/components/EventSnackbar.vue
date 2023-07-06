<template>
    <div class="fixed bottom-24 md:left-0 lg:bottom-5 w-full md:w-64">
        <div class="mx-4">
            <Transition>
                <div v-if="event !== null" class="p-2 w-full flex justify-between items-center border dark:border-white/25 rounded-md bg-[var(--md-sys-color-primary-container)]">
                    <h1 class="text-[var(--md-sys-color-primary-on-container)]">{{ event?.name }}</h1>
                    <md-text-button v-if="event?.isRollback" @click.once="event?.rollback">Undo</md-text-button>
                </div>
            </Transition>
        </div>
    </div>
</template>

<script lang="ts" setup>
import { useEventStore } from '@/store/useEventStore'
import { computed } from 'vue'

const event = computed(() => useEventStore().getEvent)
</script>


<style scoped>
.v-enter-active,
.v-leave-active {
    transition: opacity 0.5s ease;
}

.v-enter-from,
.v-leave-to {
    opacity: 0;
}
</style>