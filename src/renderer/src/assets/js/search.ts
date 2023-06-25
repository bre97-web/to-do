interface InputInterface {
    value: string
}

type SearchType = InputInterface

/**
 * 全局关键词
 */
const GLOBAL_OBJECT: SearchType = {
    value: ''
}

function Search() {
    const get = (): SearchType => GLOBAL_OBJECT
    const set = (value: string) => (GLOBAL_OBJECT.value = value)

    return {
        get,
        set
    }
}

export { Search }
export type { SearchType }
