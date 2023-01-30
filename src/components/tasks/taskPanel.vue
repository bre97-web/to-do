<script>

import task from './task.vue';

export default {
    props: {
        'forceVisible': {
            type: Boolean,
            default: false,
        },
        'tasks': {
            required: true,
        },
        'hasRemove': {
            type:Boolean,
            default: false,
        },
        'hasDone': {
            type:Boolean,
            default: false,
        },
        'hasUndo': {
            type:Boolean,
            default: false,
        },
        'hasEdit': {
            type:Boolean,
            default: false,
        },
        'hasPin': {
            type:Boolean,
            default: false,
        },
        'showEdit': {
            type:Boolean,
            default: true,
        },
    },
    components: {
        task,
    }
}
</script>

<template>

    <div v-show="forceVisible || tasks.length != 0" class="panel">

        <!-- Title -->
        <slot name="title"></slot>

        <!-- Tasks -->
        <TransitionGroup name="list" tag="ul" class="flex flex-wrap gap-2 flex-col md:flex-row">
            <task 
                v-for="e in tasks" :key="e.id"
                :task="e"
                :hasRemove="hasRemove" :hasUndo="hasUndo" :hasDone="hasDone" :hasEdit="hasEdit" :hasPin="hasPin" :showEdit="showEdit">
            </task>
        </TransitionGroup>

        <slot name="alt"></slot>
    </div>
</template>