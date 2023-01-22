<script>
import DoingTasks from './doingTasks.vue'
import DoneTasks from './doneTasks.vue'
import SearchTasks from './searchTasks.vue'
import PinTasks from './pinTasks.vue'
import Dark from './dark.vue'


export default {
    emits: ['add', 'remove', 'done', 'undo', 'edit', 'pin', 'unpin'],
    props: ['tasks', 'keyWord'],
    data() {
        return {
            /**
             * 1: Earliest
             * 2: Latest
             */
            sortType: '1',
            
       }
    },
    computed: {
    },
    watch: {
        sortType: {
            handler() {
                this.sort(this.tasks)
            }
        }
    },
    methods: {
        add(text) {
            this.$emit('add', text)
        },
        remove(e) {
            this.$emit('remove', e)
        },
        done(e) {
            this.$emit('done', e)
        },
        undo(e) {
            this.$emit('undo', e)
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
        done: DoneTasks,
        doing: DoingTasks,
        search: SearchTasks,
        dark: Dark,
        pin: PinTasks,
    }
}

</script>

<template>
    <div>
        
        <search :tasks="tasks" :keyWord="keyWord" @add="add" @remove="remove" @done="done" @undo="undo" @edit="edit" @pin="pin" @unpin="unpin"></search>

        <pin :tasks="tasks" @pin="pin" @unpin="unpin"></pin>

        <doing :tasks="tasks" @remove="remove" @done="done" @edit="edit" @pin="pin" @unpin="unpin"></doing>

        <done :tasks="tasks" @remove="remove" @undo="undo" @edit="edit" @pin="pin" @unpin="unpin"></done>
    </div>

</template>