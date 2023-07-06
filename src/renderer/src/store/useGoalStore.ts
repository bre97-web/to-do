import { Goals } from '@/hooks/useGoal'
import moment from 'moment'
import { defineStore } from 'pinia'
import { useEventStore } from './useEventstore'

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
            const event = useEventStore()
            const rollBackFn = () => this.goalsContainer.push(e)

            this.goalsContainer = this.goalsContainer.filter((el) => el !== e)

            event.set({
                name: 'Remove the goal',
                isRollback: true,
                rollback: rollBackFn
            })
        },
        removeCompeletedGoals() {
            this.goalsContainer = this.goalsContainer.filter((e) => !e.compelete)
        },
        nextGoal(e: Goals) {
            const event = useEventStore()
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

            event.set({
                name: 'Next the goal',
                isRollback: true,
                rollback: rollBackFn
            })
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
