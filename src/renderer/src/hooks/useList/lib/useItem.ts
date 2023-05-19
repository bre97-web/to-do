import { useIndex } from "@/hooks/useIndex"
import moment from "moment"

type Title = string
type Subtitle = string
type Note = string
type Tags = string[]
type Steps = [{
    text: string,
    done: boolean
}]
type Index = number
type Date = string
type Type = "task" | "goal"

interface Item {
    title: Title,
    subtitle?: Subtitle,
    note?: Note,
    tags: Tags,
    steps: Steps,
    index?: Index,
    date?: Date,
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
const createDate = (): string => moment().format('YYYY-MM-DD')

function useItem({title, subtitle, note, tags, steps, type}: Item) {
    return {
        title: title,
        subtitle: subtitle,
        note: note,
        tags: tags,
        steps: steps,
        index: createIndex(),
        date: createDate(),
        type: type,
    }
}

export type {
    Item,
    Items,
    Title,
    Subtitle,
    Note,
    Tags,
    Steps,
    Index,
    Date,
    Type,
}
export {
    useItem
}