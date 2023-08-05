<template>
    <div>
        <template v-if="goalStore.getGoals.length !== 0">
            <md-item>
                <md-list-item
                    v-for="goals in goalStore.getGoals"
                    :key="goals.index"
                    :headline="
                        goals.compelete
                            ? goals.goals[goals.maxIndex !== 0 ? goals.maxIndex - 1 : 0].title
                            : goals.goals[goals.currentIndex].title
                    "
                    :supporting-text="
                        goals.compelete ? '' : 'Next times ' + goalStore.geuCurrentDate(goals)
                    "
                >
                    <!-- 下一步按钮 -->
                    <div slot="start" class="ml-2">
                        <md-standard-icon-button
                            slot="start"
                            :disabled="goals.compelete"
                            @click="goalStore.nextGoal(goals)"
                        >
                            <md-icon v-if="!goals.compelete">radio_button_unchecked</md-icon>
                            <md-icon v-else>check</md-icon>
                        </md-standard-icon-button>
                    </div>

                    <!-- 删除按钮 -->
                    <div slot="end" class="flex gap-2 items-center justify-end">
                        <LabelLarge>
                            {{
                                !goals.compelete
                                    ? `${goals.currentIndex + 1} / ${goals.maxIndex + 1}`
                                    : `Compeleted`
                            }}
                        </LabelLarge>
                        <md-standard-icon-button @click="goalStore.removeGoals(goals)">
                            <md-icon>delete</md-icon>
                        </md-standard-icon-button>
                    </div>
                </md-list-item>
            </md-item>
        </template>
        <template v-else>
            <AllDone></AllDone>
        </template>
    </div>
</template>

<script lang="ts" setup>
import { useGoalStore } from '@/store/useGoalStore.ts'
import AllDone from './AllDone.vue';

const goalStore = useGoalStore()
</script>

