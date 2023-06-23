import { useDate } from "@/hooks/useDate"
import { useIndex } from "@/hooks/useIndex"

type Date = string

/**
 * Goal类型的对象应该被存储在Goals类型的容器中
 * 通过useGoal()来创建一个Goal类型的对象,将其装载至useGoals()
 */
type Goal = {

    /**
     * index是当前Goal的唯一标识符，它取值为当前的UNIX时间戳
     */
    index: number

    /**
     * Goal的标题，它会被显示
     */
    title: string

    /**
     * Goal的描述，它会被显示
     */
    description?: string
}

/**
 * Goals类型的对象存储Goal类型的对象
 */
interface Goals {

    /**
     * 装载Goal数组的属性
     */
    goals: Goal[]

    /**
     * 规定每一个Goal之间的日期间隔
     */
    schedule: Schedule

    /**
     * 用于goals数组
     * 表示当前指向的的goals的坐标
     */
    currentIndex: number

    /**
     * currentIndex的最大值
     */
    maxIndex: number

    /**
     * Goals对象的创建日期
     */
    createdDate: Date

    /**
     * [目前作用未知]
     */
    targetDate: Date | null

    /**
     * 当前Goals的完成状态
     * 当currentIndex达到规定的maxIndex时complete需要被标记为true
     */
    compelete: boolean

    /**
     * 当前Goals对象的唯一标识符，取值为当前时间的UNIX时间戳
     */
    index: number
}

/**
 * Goals中的每个Goal相隔的距离
 */
type Schedule = "daily" | "weekly" | "monthly"

/**
 * 创建一个Goal类型的对象
 * Goal需要添加到Goals类型的对象中
 */
function useGoal({title, description = ''}: {
    title: string,
    description?: string
}): Goal {
    return {
        index: useIndex(),
        title: title,
        description: description,
    }
}

/**
 * 创建一个用于装载Goal数组的容器对象
 * 请使用useGoal()来创建Goal类型的对象
 */
function useGoals({ goalList, schedule = "daily", currentIndex = 0, maxIndex = goalList.length - 1, targetDate = null, compelete = false }: {
    goalList: Goal[],
    schedule?: Schedule, 
    currentIndex?: number
    maxIndex?: number,
    targetDate?: Date | null,
    compelete?: boolean
}): Goals {
    return {
        goals: goalList,
        schedule: schedule,
        currentIndex: currentIndex,
        maxIndex: maxIndex,
        createdDate: useDate(),
        targetDate: targetDate,
        compelete: compelete,
        index: useIndex()
    }
}

export type {
    Goal,
    Goals,
    Schedule,
    Date,
}

export {
    useGoal,
    useGoals,
}