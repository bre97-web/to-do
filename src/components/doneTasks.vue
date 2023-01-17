<script>

import roundedButton from './button/roundedButton.vue'
import Task from './task.vue'


export default {
    props: {
        tasks: {
            required: true,
        }
    },
    computed: {
        doneTasks() {
            var e = this.tasks.filter(p => p.done)
            return e
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

    <div v-if="doneTasks.length != 0" class="panel">

        <!-- Title -->
        <p class="font-bold text-2xl">
            Is Done Events
        </p>

        <!-- Tasks -->
        <ul class="flex flex-wrap gap-2 flex-col lg:flex-row">
            <task 
                v-for="e in doneTasks" :key="e.id"
                :task="e" @remove="remove" @edit="edit"  @undo="undo"
                :hasRemove="true" :hasUndo="true" :hasEdit="true">
            </task>
        </ul>
    </div>

</template>
