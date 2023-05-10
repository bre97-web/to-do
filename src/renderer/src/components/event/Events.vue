<template>
    <div class="eventsSurface">
        <ul class="events">
            <li>
                <Event :event="event"></Event>
            </li>
            <li>
                <Event :event="event"></Event>
            </li>
        </ul>
    </div>
</template>

<script lang="ts" setup>
import { useEvent, EventItem } from '@/hooks/useEvent';
import Event from './Event.vue'

var event: EventItem = useEvent('Test Msg')
</script>