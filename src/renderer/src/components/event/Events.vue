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
import { getCurrentInstance } from 'vue'
import { EventsInterface } from '@/hooks/useEvent';
import { Event } from './lib/Event'

const events:EventsInterface = getCurrentInstance()?.appContext.config.globalProperties.$events
</script>