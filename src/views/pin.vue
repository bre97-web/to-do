<script>
import task from '../components/tasks/task.vue';
import { mapGetters } from 'vuex';

export default {
    computed: {
        ...mapGetters('TasksStore', ['getPinned']),
    },
    components: {
        task,
    },
}
</script>

<template>

    <div>
        <!-- Title -->
        <p class="font-bold text-2xl">Pinned</p>
          
        <!-- Tasks -->
        <TransitionGroup name="list" tag="ul" class="flex flex-wrap gap-2 flex-col md:flex-row">
            <task 
                v-for="e in getPinned" :key="e.id"
                :task="e"
                :hasPin="true">
            </task>
        </TransitionGroup>
        
        <p v-show="getPinned.length == 0" class="text-gray-400">All did it!</p>
    
    </div>
</template>