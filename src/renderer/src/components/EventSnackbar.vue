<template>
    <div class="fixed bottom-24 md:left-0 lg:bottom-5 w-full md:w-64">
        <div class="mx-4">
            <Transition>
                <div v-if="eventStore.getEvent !== null" class="p-2 w-full flex justify-between items-center border dark:border-white/25 rounded-md bg-[var(--md-sys-color-surface-container)]">
                    <subtitle2>{{ eventStore.getEvent?.name }}</subtitle2>
                    <md-text-button v-if="eventStore.getEvent?.isRollback" @click.once="run">Undo</md-text-button>
                </div>
            </Transition>
        </div>
    </div>
</template>

<script lang="ts" setup>
import { useEventStore } from '@/store/useEventStore.ts'

const eventStore = useEventStore()

const run = () => {
    eventStore.getEvent?.rollback()
    eventStore.clear()
}
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