<template>
    <div v-if="task !== null">
        <template v-if="['task', 'collection'].includes(task.type)">
            <TaskAsideInjectPage :task="task"></TaskAsideInjectPage>
        </template>
        <template v-if="task.type === 'goal'">
            <GoalAsideInjectPage :goal="task"></GoalAsideInjectPage>
        </template>
    </div>
    <AllDone v-else></AllDone>
</template>

<script setup lang="ts">
import { getShareItem } from './taskProvider';
import TaskAsideInjectPage from './TaskAsideInjectPage.vue';
import GoalAsideInjectPage from './GoalAsideInjectPage.vue';
import AllDone from '@/components/tasks/list/internal/AllDone.vue';

const task = getShareItem()
</script>

<style scoped></style>
