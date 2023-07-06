import { defineStore } from "pinia"

type Event = {
    name: string,
    isRollback: boolean,
    rollback: () => void
}

const useEventStore = defineStore('event_store', {
    state: () => ({
        currentEvent: null as null | Event,
        timer: null as any
    }),
    getters: {
        getEvent: (state): Event | null => state.currentEvent
    },
    actions: {
        set({ name, isRollback = false, rollback = () => {} }: {
            name: string,
            isRollback: boolean,
            rollback: () => void
        }) {
            const e = {
                name: name,
                isRollback: isRollback,
                rollback: rollback
            }

            this.currentEvent = e

            if(this.timer !== null) {
                clearTimeout(this.timer)
            }
            this.timer = setTimeout(() => {
                this.currentEvent = null
            }, 3000)
        }
    }
})

export type { Event }
export { useEventStore }