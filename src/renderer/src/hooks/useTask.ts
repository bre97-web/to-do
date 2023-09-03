import { useDate } from '@/hooks/useDate'
import { useIndex } from '@/hooks/useIndex'

export type Title = string
export type Subtitle = string
export type Note = string
export type Tags = string[]
export type Step = {
    text: string
    done: boolean
}
export type Steps = Step[]
export type Index = number
export type Date = string
export type Type = 'task' | 'goal'
export type DefaultCollection = 'processing' | 'pinned' | 'done'
export type FromCollection = string
export type ProgressStatus = 'processing' | 'pinned' | 'done'

/**
 * Goal类型的对象应该被存储在Goals类型的容器中
 * 通过useGoal()来创建一个Goal类型的对象,将其装载至useGoals()
 */
export type Goal = {
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
 * Goals中的每个Goal相隔的距离
 */
export type Schedule = 'daily' | 'weekly' | 'monthly'

/**
 * Goals类型的对象存储Goal类型的对象
 */
export interface Goals {
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
 * 一个Task相当于一个Todo（或Goal）
 * 请使用useTask(...)来创建一个Task类型的对象，useTask已经提供了部分缺省参数
 */
export interface Task {
    // Task最终显示的标题
    title: Title

    /**
     * 最终会显示的描述性标题
     */
    subtitle: Subtitle

    /**
     * 一般不会直接显式note属性，它仅仅用于用户对一个Task的详细说明
     */
    note: Note

    /**
     * 谨慎修改
     * tags是一个重要的属性，它用于给自身打上标记，在关于Task显示的组件中经常使用tags
     */
    tags: Tags

    /**
     * steps是一个包含text和done的对象，它用于给自身添加步骤说明
     */
    steps: Steps

    /**
     * 创建Task时的可选项
     * index是一个Task的唯一标识符，它可以用来作为列表的key
     * 此属性不需要由用户提供，也不需要在创建Task时手动赋值，它的值是当前的UNIX时间戳
     * 在store中调用push时会自动赋值
     */
    index: Index

    /**
     * 创建Task时的可选项
     * 创建日期
     * （在store中调用push时会自动赋值）
     */
    createdDate: Date

    /**
     * 创建Task时的可选项
     * 它由用户提供，如果用户没有提供此参数，此参数为null
     * 目标日期（由用户指定指定的需要完成的日期）
     * （在store中调用push时会自动赋值）
     */
    targetDate: Date | null

    /**
     * Task元素的作用类型
     *  task
     *  goal
     *  collection
     */
    type: Type

    /**
     * 如果type为collection，fromCollection应该不为null
     */
    fromCollection:  DefaultCollection | FromCollection

    /**
     * 如果type为goal，goalSteps应该不为null
     */
    goalSteps: Goals | null

    /**
     * 任务的处理进度
     * processing为处理中，done为处理完成，pinned为已标记（固定，它的处理逻辑同processing）
     */
    progressStatus: ProgressStatus
}

export type Tasks = Task[]

/**
 * 使用moment().format('x')时间戳作为每个元素的index
 */
const createIndex = (): number => useIndex()

/**
 * 使用YYYY-MM-DD格式的日期作为每一个元素的日期
 * @returns 返回一个YYYY-MM-DD格式的日期
 */
const createDate = (): string => useDate()

/**
 * 返回一个Task类型的对象
 * 需要指定title,剩余参数提供了缺省值
 */
export function useTask({
    title,
    subtitle = '',
    note = '',
    tags = [],
    steps = [],
    targetDate = null,
    fromCollection = 'processing',
}: {
    title: string
    subtitle?: string
    note?: string
    tags?: Tags
    steps?: Steps
    targetDate?: Date | null
    fromCollection: DefaultCollection | FromCollection
}): Task {
    return {
        title: title,
        subtitle: subtitle,
        note: note,
        tags: tags,
        steps: steps,
        index: createIndex(),
        createdDate: createDate(),
        targetDate: targetDate,
        goalSteps: null,
        type: 'task',
        progressStatus: 'processing',
        fromCollection: fromCollection
    }
}

export function useStep({ text, done = false }: { text: string; done?: boolean }): Step {
    return {
        text: text,
        done: done
    }
}

/**
 * 创建一个Goal类型的对象
 * Goal需要添加到Goals类型的对象中
 */
export function useGoal({ title = '', description = '' }: { title?: string; description?: string }): Goal {
    return {
        index: useIndex(),
        title: title,
        description: description
    }
}

/**
 * 创建一个用于装载Goal数组的容器对象
 * 请使用useGoal()来创建Goal类型的对象
 */
export function useGoals({
    goalList,
    schedule = 'daily',
    currentIndex = 0,
    maxIndex = goalList.length - 1,
    targetDate = null,
    compelete = false
}: {
    goalList: Goal[]
    schedule?: Schedule
    currentIndex?: number
    maxIndex?: number
    targetDate?: Date | null
    compelete?: boolean
}): Task {
    return {
        title: '',
        subtitle: '',
        note: '',
        tags: [],
        steps: [],
        index: createIndex(),
        createdDate: createDate(),
        targetDate: targetDate,
        fromCollection: 'undefined in goal',
        type: 'goal',
        progressStatus: 'processing',
        goalSteps: {
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
}
