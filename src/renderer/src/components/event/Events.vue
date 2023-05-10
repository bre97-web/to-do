<template>
    <div class="eventsSurface">
        <ul class="events">
            <li v-for="(e, index) in events.getAll()" :key="index">
                <Event :event="e"></Event>
            </li>
        </ul>
    </div>
</template>

<script lang="ts" setup>
import { EventsInterface, useEvents } from '@/hooks/useEvent';
import Event from './Event.vue'

const events: EventsInterface = useEvents()
</script>