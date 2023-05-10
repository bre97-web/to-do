import { ref } from "vue"
import { useIndex } from "./useIndex"

interface EventInterface {
    msg: string,
    isRollback: boolean,
    index?: number,
}
interface EventsInterface {
    push: (e: EventItem) => void,
    getAll: () => EventItem[]
}

type EventItem = EventInterface


function useEvents(): EventsInterface {

    const Events = ref<EventItem[]>([])

    const push = (e: EventItem) => {
        e.index = useIndex()
        Events.value.push(e)

        setTimeout(() => {
            Events.value = Events.value.filter(el => e.index !== el.index)
        }, 5000)
    }
    const getAll = () => Events.value

    return {
        push,
        getAll
    }
}


function useEvent(msg:string, isRollback = false): EventInterface {

    var event: EventItem = {
        msg: msg,
        isRollback: isRollback,
    }
    
    return event
}

export {
    useEvent,
    useEvents
}

export type {
    EventInterface,
    EventsInterface
}