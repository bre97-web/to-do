<template>
    <div class="fixed z-50 bottom-24 lg:bottom-5 left-4 w-1/2 md:w-52 xl:w-96">
        <ul class="flex flex-col w-full gap-2">
            <TransitionGroup>
                <li v-for="e in events.getAll()" :key="e.index" class="px-4 py-2 rounded-md shadow flex flex-row items-center justify-between surfaceContainer">
                    <h1>{{ e.msg }}</h1>
                    <div :class="{ invisible: !e.isRollback }">
                        <md-text-button @click.once="() => e.fn()">Undo</md-text-button>
                    </div>
                </li>
            </TransitionGroup>
        </ul>
    </div>
</template>

<script lang="tsx" setup>
import { EventsInterface } from '@/hooks/useEvent'
import { getGlobalEvents } from '@/hooks/lib/getGlobalEvents'
import '@material/web/button/text-button'

const events: EventsInterface = getGlobalEvents().get()
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