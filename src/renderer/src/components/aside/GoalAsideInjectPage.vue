<template>
    <FlexColLayout v-if="props.goal.goalSteps !== undefined" class="gap-4">
        <div :class="{ 'line-through': props.goal.goalSteps?.compelete }">
            <TitleLarge>{{ props.goal.goalSteps?.goals[props.goal.goalSteps.currentIndex].title }}</TitleLarge>
            <TitleMedium>{{ props.goal.goalSteps?.currentIndex || 0 + 1 }} / {{ props.goal.goalSteps?.maxIndex || 0 + 1 }}</TitleMedium>
        </div>
    </FlexColLayout>
</template>

<script setup lang="ts">
import { Task } from '@/hooks/useTask';
import FlexColLayout from '@/layouts/FlexColLayout.vue';

const props = defineProps<{
    goal: Task
}>()
</script>

<style scoped></style>
