
import { createStore } from 'vuex'

import tasks from './tasks/tasksModule'

const Store = createStore({
    modules: {
        'tasksStore': tasks,
    }
})

export default Store