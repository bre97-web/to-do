import { reactive, watch } from "vue";
import { EventsInterface, useEvents } from "../useEvent";


const GLOBAL_EVENTS = reactive<EventsInterface>(useEvents())

watch(() => GLOBAL_EVENTS, () => console.log('12'))

function GlobalEvents() {

    const get = () => GLOBAL_EVENTS

    return {
        get
    }
}

export {
    GlobalEvents
}