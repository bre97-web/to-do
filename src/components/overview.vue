<script>
import doing from './doingTasks.vue'
import done from './doneTasks.vue'
import search from './searchTasks.vue'
import pin from './pinTasks.vue'
import dark from './dark.vue'


export default {
    props: ['tasks', 'keyWord'],
    components: {
        done,
        doing,
        search,
        dark,
        pin,
    }
}

</script>

<template>
    <div>
        
        <search :tasks="tasks" :keyWord="keyWord" :showEdit="false"></search>

        <pin :tasks="tasks"></pin>

        <doing :tasks="tasks"></doing>

        <done :tasks="tasks"></done>
    </div>

</template>