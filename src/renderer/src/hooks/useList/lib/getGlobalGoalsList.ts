import { Ref, reactive, ref, watch } from "vue";
import { Goals, GoalsInterface, useGoals } from "./useGoal";
import { getGlobalEvents } from "@/hooks/lib/getGlobalEvents";
import { useEvent } from "@/hooks/useEvent";
import { RefSymbol } from "@vue/reactivity";


var GLOBAL_GOALS_LIST: Ref<Array<Goals>> = ref(JSON.parse(localStorage.getItem('bre97-web-todo-goals') as string) || [])

/**
 * 全局GoalsList在被检测到更改时保存到本地，且会清除全部标记为完成的Goals
 */
watch(GLOBAL_GOALS_LIST.value, () => {
    localStorage.setItem('bre97-web-todo-goals', JSON.stringify(GLOBAL_GOALS_LIST.value))
})

const events = reactive(getGlobalEvents().get())

interface GlobalGoalsInterface {
    values: () => Array<Goals>
    valuesOfGoalsInterface: () => Array<GoalsInterface>
    get: (index: number) => Goals
    getGoals: (index: number) => GoalsInterface
    push: (e: Goals) => any
    remove: (index: number) => any
    removeCompeleted: () => any
}

function getGlobalGoalsList(): GlobalGoalsInterface {
    const values = (): Array<Goals> => GLOBAL_GOALS_LIST.value
    const valuesOfGoalsInterface = (): Array<GoalsInterface> => {
        var list: Array<GoalsInterface> = new Array<GoalsInterface>()
        GLOBAL_GOALS_LIST.value.forEach(e => {
            list.push(useGoals(e.schedule, e.goals))
        })

        return list
    }
    const get = (index: number): Goals => GLOBAL_GOALS_LIST.value[index]
    const getGoals = (index: number): GoalsInterface => useGoals(GLOBAL_GOALS_LIST.value[index].schedule, GLOBAL_GOALS_LIST.value[index].goals)
    const push = (e: Goals) => {
        GLOBAL_GOALS_LIST.value.push(e)
        events.push(useEvent('The step is created'))
    }
    const remove = (index: number) => {
        
        let tmpGoal = GLOBAL_GOALS_LIST.value[index]
        let rollBackFn = () => {
            GLOBAL_GOALS_LIST.value.push(tmpGoal)
        }
        GLOBAL_GOALS_LIST.value.splice(index, 1)
        events.push(useEvent('The goal is deleted', true, rollBackFn))
    }
    const removeCompeleted = (): any => {
        for(let i = 0; i < GLOBAL_GOALS_LIST.value.length; i ++) {
            let item = GLOBAL_GOALS_LIST.value[i].goals
            if(item[item.length - 1].compeleted) {
                GLOBAL_GOALS_LIST.value.splice(i, 1)
            }
        }
    }

    return {
        values,
        valuesOfGoalsInterface,
        get,
        getGoals,
        push,
        remove,
        removeCompeleted,
    }
}

export {
    getGlobalGoalsList
}

export type {
    GlobalGoalsInterface
}
