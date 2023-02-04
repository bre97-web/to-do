import { createRouter, createWebHashHistory } from "vue-router"

import overview from '../pages/overview.vue'
import search from '../pages/search.vue'
import fullSearch from '../pages/fullSearch.vue'
import done from '../pages/done.vue'
import doing from '../pages/doing.vue'
import pin from '../pages/pin.vue'
import helper from '../pages/helper.vue'

const routes = [
    {
        name: 'search',
        path: '/search',
        component: fullSearch,
    },
    {
        path: '/',
        component: overview,
    },
    {
        path: '/pin',
        component: pin,
    },
    {
        path: '/done',
        component: done,
    },
    {
        path: '/helper',
        component: helper,
    },
]

const Router = createRouter({
    history: createWebHashHistory(),
    routes,
})

export default Router