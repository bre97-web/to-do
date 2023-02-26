<script>
import done from './done.vue'
import doing from './doing.vue'
import search from './search.vue'
import pin from './pin.vue'
import { mapActions, mapGetters } from 'vuex'

import now from '../components/time.vue'

export default {
    components: {
        done,
        doing,
        pin,
        search,
        now,
    },
    computed: {
        ...mapGetters('TasksStore', ['getDone', 'getPinned', 'getKeyWord']),
    },
    methods: {
        ...mapActions('TasksStore', ['setKeyWord']),
    },
}
</script>

<template>
    <div class="flex flex-col gap-4">
        <!-- Time -->
        <now></now>
        <search></search>
        <pin v-show="getPinned.length != 0"></pin>
        <doing></doing>
        <done v-show="getDone.length != 0"></done>
    </div>
</template>

<style scoped lang="css">
    
</style>