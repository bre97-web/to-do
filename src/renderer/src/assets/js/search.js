/**
 * 全局关键词
 */
const GLOBAL_OBJECT = {
    value: ''
}

function Search() {
    const get = () => GLOBAL_OBJECT
    const set = (value) => GLOBAL_OBJECT.value = value

    return {
        get,
        set
    }
}

export default Search
