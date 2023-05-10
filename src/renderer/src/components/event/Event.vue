<template>
    <div class="event">
        <h1 class="dark:text-black">
            {{ props.event.msg  }}
        </h1>
        <div :class="{'invisible': !props.event.isRollback}">
            <md-text-button>Undo</md-text-button>
        </div>
    </div>
</template>

<script lang="ts" setup>
import { EventInterface } from '@/hooks/useEvent';

const props = defineProps<{
    event: EventInterface
}>()
</script>