<template>
    <div class="eventsSurface">
        <ul class="events">
            <li v-for="e in events.getAll()" :key="e.index">
                <div class="event surfaceContainer">
                    <h1>{{ e.msg }}</h1>
                    <div :class="{ invisible: !e.isRollback }">
                        <md-text-button @click.once="() => e.fn()">Undo</md-text-button>
                    </div>
                </div>
            </li>
        </ul>
    </div>
</template>

<script lang="tsx" setup>
import { EventsInterface } from '@/hooks/useEvent'
import { getGlobalEvents } from '@/hooks/lib/getGlobalEvents'
import '@material/web/button/text-button'

const events: EventsInterface = getGlobalEvents().get()
</script>
