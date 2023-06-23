import { Goal, Goals } from "@/hooks/useList/lib/useGoal";
import { defineStore } from "pinia";



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
            if(e.currentIndex >= e.maxIndex) {
                e.compelete = true
            }
            if(e.maxIndex === 0) {
                return
            }
            e.currentIndex ++
        },
        setCompelete(e: Goals) {
            e.currentIndex = e.maxIndex
            e.compelete = true
        },


    },

    persist: true,
})

export {
    useGoalStore
}