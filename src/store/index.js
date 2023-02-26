
import { createStore } from 'vuex'

import tasks from './tasks/tasksModule'
import dark from './dark/index'

const Store = createStore({
    modules: {
        'TasksStore': tasks,
        'DarkStore': dark,
    }
})

export default Store