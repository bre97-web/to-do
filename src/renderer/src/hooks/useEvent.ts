/* eslint-disable no-unused-vars */
import { ref } from 'vue'
import { useIndex } from './useIndex'

interface EventInterface {
    msg: string
    isRollback: boolean
    fn: () => void
    index?: number
}
interface EventsInterface {
    push: (e: EventItem) => void
    getAll: () => EventItem[]
}

type EventItem = EventInterface

function useEvents(): EventsInterface {
    const Events = ref<EventItem[]>([])

    const push = (e: EventItem) => {
        e.index = useIndex()
        Events.value.push(e)

        setTimeout(() => {
            Events.value = Events.value.filter((el) => e.index !== el.index)
        }, 5000)
    }
    const getAll = () => Events.value

    return {
        push,
        getAll
    }
}

function useEvent(_msg: string, _isRollback: boolean, _fn: () => void): EventInterface {
    return {
        msg: _msg,
        isRollback: _isRollback,
        fn: _fn
    }
}

export { useEvent, useEvents }

export type { EventInterface, EventsInterface }
