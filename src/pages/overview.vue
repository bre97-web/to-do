<script>
import done from './done.vue';
import doing from './doing.vue';
import search from './search.vue';
import pin from './pin.vue';
import { mapGetters } from 'vuex';

export default {
    props: {
        keyWord: {},
    },
    components: {
        done,
        doing,
        pin,
        search,
        pin
    },
    computed: {
        ...mapGetters('tasksStore', ['getDone', 'getPinned']),
    },
}
</script>

<template>
    <div class="flex flex-col gap-1">
        <search :keyWord="keyWord"></search>
        <pin v-show="getPinned.length != 0"></pin>
        <doing></doing>
        <done v-show="getDone.length != 0"></done>
    </div>
</template>