import { useDate } from "@/hooks/useDate"
import { useIndex } from "@/hooks/useIndex"
import { fchown } from "fs"

type Title = string
type Subtitle = string
type Note = string
type Tags = string[]
type Step = {
    text: string,
    done: boolean
}
type Steps = Step[]
type Index = number
type Date = string
type Type = "task" | "goal"

/**
 * 一个Item相当于一个Todo（或Goal）
 * Item必须要提供title、tags、steps、type
 * 请使用useItem(...)来创建一个Item类型的对象，useItem已经提供了部分缺省参数
 */
interface Item {

    // Item最终显示的标题
    title: Title,

    /**
     * 可选项
     * 最终会显示的描述性标题
     */
    subtitle?: Subtitle,

    /**
     * 可选项
     * 一般不会直接显式note属性，它仅仅用于用户对一个Item的详细说明
     */
    note?: Note,

    /**
     * 谨慎修改
     * tags是一个重要的属性，它用于给自身打上标记，在关于Item显示的组件中经常使用tags
     */
    tags: Tags,

    /**
     * steps是一个包含text和done的对象，它用于给自身添加步骤说明
     */
    steps: Steps,

    /**
     * 创建Item时的可选项
     * index是一个Item的唯一标识符，它可以用来作为列表的key
     * 此属性不需要由用户提供，也不需要在创建Item时手动赋值，它的值是当前的UNIX时间戳
     * 在store中调用push时会自动赋值
     */
    index?: Index,

    /**
     * 创建Item时的可选项
     * 创建日期
     * （在store中调用push时会自动赋值）
     */
    createdDate?: Date,

    /**
     * 创建Item时的可选项
     * 它由用户提供，如果用户没有提供此参数，此参数为null
     * 目标日期（由用户指定指定的需要完成的日期）
     * （在store中调用push时会自动赋值）
     */
    targetDate?: Date | null,

    /**
     * [目前作用未知]
     */
    type: Type,
}
type Items = Item[]

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
 * 返回一个Item类型的对象
 * 需要指定title,剩余参数提供了缺省值
 */
function useItem({title, subtitle = "", note = "", tags = [], steps = [], targetDate = null,type = "task"}: Item): Item {
    return {
        title: title,
        subtitle: subtitle,
        note: note,
        tags: tags,
        steps: steps,
        index: createIndex(),
        createdDate: createDate(),
        targetDate: targetDate,
        type: type,
    }
}
function useStep({text, done = false}: Step): Step {
    return {
        text: text,
        done: done
    }
}

export type {
    Item,
    Items,
    Title,
    Subtitle,
    Note,
    Tags,
    Step,
    Steps,
    Index,
    Date,
    Type,
}
export {
    useItem,
    useStep
}