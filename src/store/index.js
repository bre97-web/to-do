
import { createStore } from 'vuex'

import tasks from './tasks/tasksModule'

const Store = createStore({
    modules: {
        'TasksStore': tasks,
    }
})

export default Store