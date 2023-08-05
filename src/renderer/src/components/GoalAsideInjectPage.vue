<template>
    <div v-if="props.goal.goalSteps !== undefined">
        <div :class="{ 'line-through': props.goal.goalSteps.compelete }">
            <TitleLarge>{{ props.goal.goalSteps.goals[props.goal.goalSteps.currentIndex].title }}</TitleLarge>
            <TitleMedium>{{ props.goal.goalSteps.currentIndex + 1 }} / {{ props.goal.goalSteps.maxIndex + 1 }}</TitleMedium>
        </div>

    </div>
</template>

<script setup lang="ts">
import { Task } from '@/hooks/useTask';


const props = defineProps<{
    goal: Task
}>()
</script>

<style scoped>

</style>