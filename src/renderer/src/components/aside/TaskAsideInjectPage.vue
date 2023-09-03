<template>
    <FlexColLayout class="gap-4">
        <div :class="{ 'line-through': props.task.progressStatus === 'done' }">
            <TitleLarge>{{ props.task.title }}</TitleLarge>
            <TitleMedium>{{ props.task.subtitle }}</TitleMedium>
        </div>

        <div>
            <BodyMedium>{{ props.task.note }}</BodyMedium>
        </div>

        <ListLayout>
            <template #header>
                <TextLayout>
                    <LabelLarge>Steps</LabelLarge>
                </TextLayout>
            </template>
            <ListContentLayout>
                <ListItemLayout v-for="(e, index) in props.task.steps" :key="index">
                    <template #default>
                        {{ e.text }}
                    </template>
                </ListItemLayout>
            </ListContentLayout>
        </ListLayout>

        <md-chip-set>
            <md-assist-chip v-for="(tag, index) in props.task.tags" :key="index" :label="tag"></md-assist-chip>
        </md-chip-set>
    </FlexColLayout>
</template>

<script setup lang="ts">
import FlexColLayout from '@/layouts/FlexColLayout.vue';
import ListContentLayout from '@/layouts/ListContentLayout.vue';
import ListItemLayout from '@/layouts/ListItemLayout.vue';
import ListLayout from '@/layouts/ListLayout.vue';
import TextLayout from '@/layouts/TextLayout.vue';
import { Task } from '@/hooks/useTask';

const props = defineProps<{
    task: Task
}>()
</script>

<style scoped></style>
