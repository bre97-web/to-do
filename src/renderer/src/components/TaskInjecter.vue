<template>
    <FlexColLayout v-if="task !== null" class="gap-8">
        <div :class="{'line-through': task.progressStatus === 'done'}">
            <TitleLarge>{{ task.title }}</TitleLarge>
            <TitleMedium>{{ task.subtitle }}</TitleMedium>
        </div>
        
        <div>
            <BodyMedium>{{ task.note }}</BodyMedium>
        </div>

        <ListLayout>
            <template #header>
                <TextLayout>
                    <LabelLarge>Steps</LabelLarge>
                </TextLayout>
            </template>
            <ListContentLayout>
                <ListItemLayout v-for="(e, index) in task.steps" :key="index">
                    <template #default>
                        {{ e.text }}
                    </template>
                </ListItemLayout>
            </ListContentLayout>
        </ListLayout>

        <md-chip-set>
            <md-assist-chip v-for="(tag, index) in task.tags" :key="index" :label="tag"></md-assist-chip>
        </md-chip-set>
    </FlexColLayout>
</template>

<script setup lang="ts">
import FlexColLayout from '@/layouts/FlexColLayout.vue';
import ListContentLayout from '@/layouts/ListContentLayout.vue';
import ListItemLayout from '@/layouts/ListItemLayout.vue';
import ListLayout from '@/layouts/ListLayout.vue';
import TextLayout from '@/layouts/TextLayout.vue';
import { getShareItem } from '@/scripts/taskProvider';

const task = getShareItem()
</script>

<style scoped>

</style>