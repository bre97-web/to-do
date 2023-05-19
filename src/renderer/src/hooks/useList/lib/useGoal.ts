import { useDate } from "@/hooks/useDate"
import { useIndex } from "@/hooks/useIndex"
import moment from "moment"

/**
 * Goal类型的对象应该被存储在Goals类型的容器中
 * 通过useGoal()来创建一个Goal类型的对象
 */
type Goal = {
    id?: number
    title: string
    description?: string
    compeleted?: boolean
    date?: string
    schedule?: Schedule
}

/**
 * Goals类型的对象存储Goal类型的元素
 */
type Goals = {
    goals: Array<Goal>
    schedule: Schedule
}

type Schedule = "daily" | "weekly" | "monthly"

/**
 * 创建一个Goal类型的对象,useGoal不需要提供id、date等信息
 * Goal需要添加到Goals类型的对象中
 */
function useGoal({title, description = ''}: Goal): Goal {
    return {
        id: useIndex(),
        title: title,
        description: description,
        compeleted: false,
        date: useDate()
    }
}

interface GoalsInterface {
    get(): Goals
    set(e: Goals): any
    currentGoal(): Goal | null
    currentIndex(): number
    currentDate(): string | null
    setCurrentCompeleted(): any
    push: any
    pushAll: any
}

/**
 * 创建一个用于管理Goals的GoalsClass类型的对象
 */
function useGoals(schedule: Schedule, goals = new Array<Goal>()): GoalsInterface {
    var _goals: Goals = {
        goals: goals,
        schedule: schedule
    }


    const currentGoal = (): Goal | null => {
        for(let e of _goals.goals) {
            if(!e.compeleted) {
                return e
            }
        }
        return null
    }
    const currentIndex = (): number => {
        for(let index = 0; index < _goals.goals.length; index ++) {
            if(!_goals.goals[index].compeleted) {
                return index
            }
        }
        return -1
    }
    const currentDate = (): string | null => {
        for(let index = 0; index < _goals.goals.length; index ++) {
            if(!_goals.goals[index].compeleted) {
                var days = 1
                if(_goals.schedule === 'weekly') {
                    days = 7
                } else if(_goals.schedule === 'monthly') {
                    days = 30
                }
                return moment(_goals.goals[index].date, 'YYYY-MM-DD').add(days * index, 'd').format('YYYY-MM-DD')
            }
        }
        return null
    }

    const setCurrentCompeleted = () => {
        _goals.goals[currentIndex()].compeleted = true
    }

    const get = (): Goals => {
        return {
            goals: _goals.goals,
            schedule: _goals.schedule
        }
    }
    const set = ({goals}: Goals): any => {
        _goals.goals = [...goals]
    }
    const push = (e: Goal): any => {
        _goals.goals.push({
            ...e,
            id: useIndex()
        })
    }
    const pushAll = async ({goals}: Goals) => {
        const delay = (event: any) => new Promise(resolve => setTimeout(() => {
            event()
            resolve(null)
        }, 50))
        const createId = async (el: Goal) => {
            await delay(() => el.id = useIndex())
        }
        for(let element of goals) {
            await createId(element)
        }
        
        _goals.goals.push(...goals)
    }   

    return {
        currentDate,
        currentGoal,
        currentIndex,
        set,
        get,
        setCurrentCompeleted,
        pushAll,
        push
    }
}

export type {
    Goal,
    Goals,
    Schedule,
    GoalsInterface,
}

export {
    useGoal,
    useGoals,
}