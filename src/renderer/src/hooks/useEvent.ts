import { reactive } from "vue"

interface EventInterface {
    msg: string,
    isRollback: boolean,
}
interface EventsInterface {
    push: (e: EventItem) => void,
    getAll: () => EventItem[]
}

type EventItem = EventInterface


function useEvents(): EventsInterface {

    const Events = reactive<EventItem[]>([])

    const push = (e: EventItem) => {
        Events.push(e)

        setTimeout(() => {
            Events.shift()
        }, 5000)
    }
    const getAll = () => Events

    return {
        push,
        getAll
    }
}


function useEvent(msg:string, isRollback = false): EventInterface {

    var event: EventItem = {
        msg: msg,
        isRollback: isRollback
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