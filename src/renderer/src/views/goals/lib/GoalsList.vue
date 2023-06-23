<template>
    <md-item>
        <template
            v-if="goalStore.getGoals.length !== 0"
            v-for="goals in goalStore.getGoals"
        >

            <md-list-item
                :headline="goals.compelete ? goals.goals[goals.maxIndex !== 0 ? goals.maxIndex - 1 : 0].title : goals.goals[goals.currentIndex].title"
                :supportingText="'Next times '"
                :class="{ 'text-secondary': goals.compelete }"
            >
                <!-- 下一步按钮 -->
                <md-checkbox
                    slot="start"
                    :checked="goals.compelete"
                    :disabled="goals.compelete"
                    @click="goalStore.nextGoal(goals)"
                ></md-checkbox>

                <!-- 删除按钮 -->
                <div slot="end" class="flex gap-2 items-center justify-end">
                    <h1>
                        {{ !goals.compelete ? `${goals.currentIndex + 1} / ${goals.maxIndex + 1}` : `Compeleted` }}
                    </h1>
                    <md-standard-icon-button @click="goalStore.removeGoals(goals)">
                        <md-icon>delete</md-icon>
                    </md-standard-icon-button>
                </div>
            </md-list-item>
            <md-divider></md-divider>
        </template>
        <template v-else>
            <div class="space-y-4 pt-24 text-center">
                <span class="material-symbols-outlined scale-[4] text-secondary">done_all</span>
                <p class="text-center italic text-secondary">All done</p>
            </div>
        </template>
    </md-item>
</template>

<script lang="ts" setup>
import { useGoalStore } from '@/store/useGoalStore.ts'
import '@material/web/checkbox/checkbox'
import '@material/web/icon/icon'
import '@material/web/iconbutton/standard-icon-button'
import '@material/web/list/list'
import '@material/web/list/list-item'


const goalStore = useGoalStore()


</script>