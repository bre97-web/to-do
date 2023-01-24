<script>

import edit from './editTask.vue'
import task from './task.vue'

export default {
    props: {
        tasks: {
            required: true
        }
    },
    computed: {
        doTasks() {
            return this.tasks.filter(p => !p.done)
        },
    },
    components: {
        edit,
        task,
    },

}
</script>

<template>

    <div class="panel">

        <!-- Title -->
        <p class="font-bold text-2xl">
            Today's Tasks
        </p>
        
        <!-- Tasks -->
        <TransitionGroup name="list" tag="ul" class="flex flex-wrap gap-2 flex-col md:flex-row">
            <task 
                v-for="e in doTasks" :key="e.id"
                :task="e"
                :hasRemove="true" :hasDone="true" :hasEdit="true" :hasPin="true">
            </task>
        </TransitionGroup>

        <!-- 'All did it' if tasks is done -->
        <p v-if="doTasks.length == 0" class="text-gray-400">All did it!</p>

    </div>



        
            

</template>

