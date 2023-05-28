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
import { getGlobalEvents } from '@/hooks/lib/getGlobalEvents';

const events:EventsInterface = getGlobalEvents().get()
</script>