<script>

import Edit from './editTask.vue'
import Task from './task.vue'

export default {
    emits: ['remove', 'done', 'edit', 'pin', 'unpin'],
    props: {
        tasks: {
            required: true
        }
    },
    data() {
        return {

        }
    },
    computed: {
        doTasks() {
            return this.tasks.filter(p => !p.done)
        },
    },
    methods: {
        done(e) {
            this.$emit('done', e)
        },
        remove(e) {
            this.$emit('remove', e)
        },
        edit(e, task) {
            this.$emit('edit', e, task)
        },
        pin(e) {
            this.$emit('pin', e)
        },
        unpin(e) {
            this.$emit('unpin', e)
        },
    },
    components: {
        edit: Edit,
        task: Task,
    }

}
</script>

<template>

    <div class="panel">

        <!-- Title -->
        <p class="font-bold text-2xl">
            Today's Tasks
        </p>
        
        <!-- Tasks -->
        <ul class="flex flex-wrap gap-2 flex-col md:flex-row">
            <task 
                v-for="e in doTasks" :key="e.id"
                :task="e" @remove="remove" @done="done" @edit="edit" @pin="pin" @unpin="unpin"
                :hasRemove="true" :hasDone="true" :hasEdit="true">
            </task>
        </ul>

        <!-- 'All did it' if tasks is done -->
        <p v-if="doTasks.length == 0" class="text-gray-400">All did it!</p>

    </div>



        
            

</template>

