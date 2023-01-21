<script>

import roundedButton from './button/roundedButton.vue'
import Task from './task.vue'


export default {
    emits: ['remove', 'undo', 'edit'],
    props: {
        tasks: {
            required: true,
        },
        forceVisible: {
            required: false,
            type:Boolean,
            default: false,
        }
    },
    computed: {
        doneTasks() {
            return this.tasks.filter(p => p.done)
        },
    },
    methods: {
        undo(e) {
            this.$emit('undo', e)
        },
        remove(e) {
            this.$emit('remove', e)
        },
        edit(e, task) {
            this.$emit('edit', e, task)
        },
    },
    components: {
        roundedButton,
        task: Task,
    }
}
</script>

<template>

    <div v-if="forceVisible || doneTasks.length != 0" class="panel">

        <!-- Title -->
        <p class="font-bold text-2xl">
            Is Done Events
        </p>

        <!-- Tasks -->
        <ul class="flex flex-wrap gap-2 flex-col md:flex-row">
            <task 
                v-for="e in doneTasks" :key="e.id"
                :task="e" @remove="remove" @edit="edit"  @undo="undo"
                :hasRemove="true" :hasUndo="true" :hasEdit="true">
            </task>
        </ul>

        <p v-if="doneTasks.length == 0" class="text-gray-400">Nothing</p>
    </div>

</template>
