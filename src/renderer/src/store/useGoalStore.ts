import { getGlobalEvents } from "@/hooks/lib/getGlobalEvents";
import { useEvent } from "@/hooks/useEvent";
import { Goal, Goals } from "@/hooks/useList/lib/useGoal";
import moment from "moment";
import { defineStore } from "pinia";

const events = getGlobalEvents()


const useGoalStore = defineStore('goal_store', {
    state: () => ({
        goalsContainer: [] as Goals[]
    }),
    getters: {
        getGoals: (state): Goals[] => state.goalsContainer
    },
    actions: {
        push(e: Goals) {
            this.goalsContainer.push(e)
        },
        removeGoals(e: Goals) {
            this.goalsContainer = this.goalsContainer.filter(el => el !== e)
        },
        removeGoal(container: Goals, e: Goal) {
            container.goals = container.goals.filter(el => el !== e)
        },
        removeCompeletedGoals() {
            this.goalsContainer = this.goalsContainer.filter(e => !e.compelete)
        },
        nextGoal(e: Goals) {
            let backup = {...e}
            const rollBackFn = () => e = backup

            if(e.currentIndex >= e.maxIndex) {
                e.compelete = true
            }
            if(e.maxIndex === 0) {
                return
            }
            e.currentIndex ++

            events.get().push(useEvent('Next the goal', true, rollBackFn))
        },
        setCompelete(e: Goals) {
            e.currentIndex = e.maxIndex
            e.compelete = true
        },
        geuCurrentDate(e: Goals): string {
            return moment(e.createdDate, 'YYYY-MM-DD').add((e.currentIndex + 1) * (e.schedule === "daily" ? 1 : e.schedule === "monthly" ? 30 : 7), 'd').format('YYYY-MM-DD')
        }

    },

    persist: true,
})

export {
    useGoalStore
}