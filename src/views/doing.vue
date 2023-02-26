<script>
import task from '../components/tasks/task.vue';
import { mapGetters } from 'vuex';

export default {
    computed: {
        ...mapGetters('TasksStore', ['getDoing']),
    },
    components: {
        task,
    },
}
</script>

<template>
    <div>
        <!-- Title -->
        <p class="font-bold text-2xl">Today's Tasks</p>
        
        <!-- Tasks -->
        <TransitionGroup name="list" tag="ul" class="flex flex-wrap gap-2 flex-col md:flex-row">
            <task 
                v-for="e in getDoing" :key="e.id"
                :task="e"
                :hasRemove="true" :hasDone="true" :hasEdit="true" :hasPin="true" :showEdit="true">
            </task>
        </TransitionGroup>
        
        <p v-show="getDoing.length == 0" class="text-gray-400">All did it!</p>
        
    </div>
</template>