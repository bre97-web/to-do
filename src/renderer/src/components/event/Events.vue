<template>
    <div class="eventsSurface">
        <ul class="events">
            <li v-for="e in events.getAll()" :key="e.index">
                <Event :msg="e.msg" :isRollback="e.isRollback"></Event>
            </li>
        </ul>
    </div>
</template>

<script lang="tsx" setup>
import { EventsInterface } from '@/hooks/useEvent';
import { Event } from './lib/Event'
import { GlobalEvents } from '@/hooks/lib/GlobalEventsObject';

const events:EventsInterface = GlobalEvents().get()
</script>