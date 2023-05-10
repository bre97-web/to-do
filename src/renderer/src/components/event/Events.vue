<template>
    <div class="eventsSurface">
        <ul class="events">
            <li v-for="e in events.getAll()" :key="e.index">
                <Event :event="e"></Event>
            </li>
        </ul>
    </div>
</template>

<script lang="ts" setup>
import { getCurrentInstance } from 'vue'
import { EventsInterface } from '@/hooks/useEvent';
import Event from './Event.vue'

const events:EventsInterface = getCurrentInstance()?.appContext.config.globalProperties.$events
</script>