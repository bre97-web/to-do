<script>
import task from '../components/tasks/task.vue';
import { mapGetters } from 'vuex';

export default {
    computed: {
        ...mapGetters('tasksStore', ['getDone']),
    },
    components: {
        task,
    },
}
</script>

<template>

    <div class="panel">

        <!-- Title -->
        <p class="font-bold text-2xl">Is Done Events</p>
        
        <!-- Tasks -->
        <TransitionGroup name="list" tag="ul" class="flex flex-wrap gap-2 flex-col md:flex-row">
            <task 
                v-for="e in getDone" :key="e.id"
                :task="e"
                :hasRemove="true" :hasUndo="true" :hasEdit="true" :showEdit="showEdit">
            </task>
        </TransitionGroup>
        
        <p v-show="getDone.length == 0" class="text-gray-400">All did it!</p>
        
    </div>
</template>