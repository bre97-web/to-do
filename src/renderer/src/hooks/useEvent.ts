
interface EventInterface {
    msg: string,
    isRollback: boolean,
}

type EventItem = EventInterface


function useEvent(msg:string, isRollback = false): EventInterface {

    var event: EventItem = {
        msg: msg,
        isRollback: isRollback
    }
    
    return event
}

export {
    useEvent
}