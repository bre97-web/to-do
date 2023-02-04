<script>
import task from '../components/tasks/task.vue'
import { mapGetters } from 'vuex'
import moment from 'moment'

export default {
    computed: {
        ...mapGetters('TasksStore', ['getDoing']),

        getTime() {
            return moment().format('YYYY-MM-DD')
        }
    },
    components: {
        task,
    },
}
</script>

<template>
    <div class="relative">
        <!-- Title -->
        <p class="font-bold text-2xl">Today's Tasks</p>
        
        <!-- Tasks -->
        <TransitionGroup name="list" tag="ul" class="flex flex-wrap gap-2 flex-col md:flex-row">
            <task
                v-for="e in getDoing" :key="e.id"
                :task="e"
                :hasRemove="true" :hasDone="true" :hasEdit="true" :hasPin="true" :showEdit="true"
                :class="{'important': e.date == getTime}"
                class="relative">
            </task>
        </TransitionGroup>
        
        <p v-show="getDoing.length == 0" class="text-gray-400">All did it!</p>
        
    </div>
</template>

<style scoped lang="css">
    .important::after {
        content: '';
        @apply animate-ping w-4 h-4 bg-blue-500 dark:bg-blue-300 rounded-full absolute -right-1 -top-1;
    }
    .important::before {
        content: '';
        @apply w-4 h-4 bg-blue-500 dark:bg-blue-300 rounded-full absolute -right-1 -top-1;
    }
</style>