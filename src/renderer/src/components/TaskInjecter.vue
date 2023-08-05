<template>
    <FlexColLayout v-if="task !== null" class="gap-8">
        <template v-if="task.type === 'task'">
            <TaskAsideInjectPage :task="task"></TaskAsideInjectPage>
        </template>
        <template v-if="task.type === 'goal'">
            <GoalAsideInjectPage :goal="task"></GoalAsideInjectPage>
        </template>

    </FlexColLayout>
</template>

<script setup lang="ts">
import FlexColLayout from '@/layouts/FlexColLayout.vue';
import { getShareItem } from '@/scripts/taskProvider';
import TaskAsideInjectPage from './TaskAsideInjectPage.vue';
import GoalAsideInjectPage from './GoalAsideInjectPage.vue';

const task = getShareItem()
</script>

<style scoped>

</style>