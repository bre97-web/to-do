<script>

import task from './task.vue'

export default {
    props: ['tasks', 'forceVisible'],
    computed: {
        pinTasks() {
            return this.tasks.filter(p => p.pin)
        },
    },
    components: {
        task,
    }
}
</script>

<template>
    <div v-show="forceVisible || pinTasks.length != 0" class="panel">

        <!-- Title -->
        <p class="font-bold text-2xl">
            Pin
        </p>

        <!-- Tasks -->
        <TransitionGroup name="list" tag="ul" class="flex flex-wrap gap-2 flex-col md:flex-row">
            <task 
                v-for="e in pinTasks" :key="e.id"
                :task="e"
                :hasRemove="false" :hasUndo="false" :hasDone="false" :hasEdit="false" :hasPin="true">
            </task>
        </TransitionGroup>

        <p v-if="pinTasks.length == 0" class="text-gray-400">Nothing</p>
    </div>
</template>