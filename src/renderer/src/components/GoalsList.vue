<template>
    <div>
        <template v-if="tasks.getTasksIncludingGoals.length !== 0">
            <md-item>
                <template v-for="e in tasks.getTasksIncludingGoals">
                    <md-list-item
                        v-if="e.type === 'goal' && e.goalSteps !== undefined"
                        :key="e.index"
                        :headline="
                            e.goalSteps.compelete
                                ? e.goalSteps.goals[e.goalSteps.maxIndex !== 0 ? e.goalSteps.maxIndex - 1 : 0].title
                                : e.goalSteps.goals[e.goalSteps.currentIndex].title
                        "
                        :supporting-text="
                            e.goalSteps.compelete ? '' : 'Next times ' + tasks.geuCurrentDate(e)
                        "
                        @click="setShareItem(e)"
                    >
                        <!-- 下一步按钮 -->
                        <div slot="start" class="ml-2">
                            <md-standard-icon-button
                                slot="start"
                                :disabled="e.goalSteps.compelete"
                                @click="tasks.nextGoal(e)"
                            >
                                <md-icon v-if="!e.goalSteps.compelete">radio_button_unchecked</md-icon>
                                <md-icon v-else>check</md-icon>
                            </md-standard-icon-button>
                        </div>

                        <!-- 删除按钮 -->
                        <div slot="end" class="flex gap-2 items-center justify-end">
                            <LabelLarge>
                                {{
                                    !e.goalSteps.compelete
                                        ? `${e.goalSteps.currentIndex + 1} / ${e.goalSteps.maxIndex + 1}`
                                        : `Compeleted`
                                }}
                            </LabelLarge>
                            <md-standard-icon-button @click="tasks.remove(e)">
                                <md-icon>delete</md-icon>
                            </md-standard-icon-button>
                        </div>
                    </md-list-item>
                </template>
                </md-item>
        </template>
        <template v-else>
            <AllDone></AllDone>
        </template>
    </div>
</template>

<script lang="ts" setup>
import AllDone from './AllDone.vue';
import { useTaskStore } from '@/store/useTaskStore'
import { setShareItem } from '@/scripts/taskProvider';

const tasks = useTaskStore()
</script>

