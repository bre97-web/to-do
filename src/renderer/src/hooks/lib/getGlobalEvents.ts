import { reactive, watch } from "vue";
import { EventsInterface, useEvents } from "../useEvent";


const GLOBAL_EVENTS = reactive<EventsInterface>(useEvents())

function getGlobalEvents() {

    const get = () => GLOBAL_EVENTS

    return {
        get
    }
}

export {
    getGlobalEvents
}