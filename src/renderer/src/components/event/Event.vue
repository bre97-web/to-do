<template>
    <div class="event">
        <h1 class="dark:text-black">
            {{ props.event.msg  }}
        </h1>
        <md-text-button>Undo</md-text-button>
    </div>
</template>

<script lang="ts" setup>
import { EventItem } from '@/hooks/useEvent';


const props = defineProps<{
    event: EventItem
}>()
</script>

<style lang="scss" scoped>

</style>