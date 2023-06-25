import { getGlobalEvents } from '@/hooks/lib/getGlobalEvents'
import { useEvent } from '@/hooks/useEvent'
import { Goals } from '@/hooks/useGoal'
import moment from 'moment'
import { defineStore } from 'pinia'

const events = getGlobalEvents().get()

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
            const rollBackFn = () => this.goalsContainer.push(e)

            this.goalsContainer = this.goalsContainer.filter((el) => el !== e)

            events.push(useEvent('Remove the goal', true, rollBackFn))
        },
        removeCompeletedGoals() {
            this.goalsContainer = this.goalsContainer.filter((e) => !e.compelete)
        },
        nextGoal(e: Goals) {
            const backup = JSON.parse(JSON.stringify(e))
            const rollBackFn = () => {
                if (this.goalsContainer.includes(e)) {
                    this.goalsContainer[this.goalsContainer.indexOf(e)] = backup
                }
            }

            if (e.currentIndex >= e.maxIndex) {
                e.compelete = true
            } else {
                if (e.maxIndex !== 0) {
                    e.currentIndex++
                }
            }

            events.push(useEvent('Next the goal', true, rollBackFn))
        },
        setCompelete(e: Goals) {
            e.currentIndex = e.maxIndex
            e.compelete = true
        },
        geuCurrentDate(e: Goals): string {
            return moment(e.createdDate, 'YYYY-MM-DD')
                .add(
                    (e.currentIndex + 1) *
                        (e.schedule === 'daily' ? 1 : e.schedule === 'monthly' ? 30 : 7),
                    'd'
                )
                .format('YYYY-MM-DD')
        }
    },

    persist: true
})

export { useGoalStore }
