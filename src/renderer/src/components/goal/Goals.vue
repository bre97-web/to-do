<template>
    <div>
        <template v-if="globalGoals.values().length === 0">
            <div class="space-y-4 pt-24 text-center">
                <span class="material-symbols-outlined scale-[4] text-secondary">done_all</span>
                <p class="text-center italic text-secondary">All done</p>
            </div>
        </template>

        <template v-else v-for="(obj, index) in globalGoals.valuesOfGoalsInterface()" :key="index">
            <template v-if="obj.currentGoal() !== null">
                <md-list-item
                    :key="index"
                    :headline="obj.currentGoal()?.title"
                    :supportingText="'Next times ' + obj.currentDate()"
                >
                    <md-checkbox
                        slot="start"
                        @click="(e: PointerEvent) => {                            
                            markCompeleted(e, obj)
                        }"
                    ></md-checkbox>
                    <div slot="end" class="flex gap-2 items-center justify-end">
                        <h1>{{ obj.currentIndex() + 1}} / {{ obj.get().goals.length }}</h1>
                        <md-standard-icon-button @click="globalGoals.remove(index)">
                            <md-icon>delete</md-icon>
                        </md-standard-icon-button>
                    </div>
                </md-list-item>
                <md-divider></md-divider>
            </template>
        </template>
    </div>
</template>

<script lang="ts" setup>
import { getGlobalGoalsList } from '@/hooks/useList/lib/getGlobalGoalsList'
import { reactive } from 'vue'
import '@material/web/checkbox/checkbox'
import '@material/web/iconbutton/standard-icon-button'
import '@material/web/icon/icon'
import '@material/web/list/list'
import '@material/web/list/list-item'
import '@material/web/divider/divider'

const globalGoals = reactive(getGlobalGoalsList())

const markCompeleted = (event: PointerEvent, e: GoalsInterface): any => {
    setTimeout(() => {
        (event.target as HTMLInputElement).checked = false
        e.setCurrentCompeleted()
        globalGoals.removeCompeleted()
    }, 500)
}
</script>
