import type { Item } from './useTask'

/**
 * 读取list中的每一个Tag属性，将所有的Tag属性统计为Map
 */
function useTags(list: Item[]): Map<string, Item[]> {
    const tags = new Map<string, Item[]>()

    list.forEach((element) => {
        element['tags'].forEach((e) => {
            if (e !== '') {
                if (!tags.has(e)) {
                    tags.set(e, [element])
                } else {
                    tags.set(e, [...(tags.get(e) || []), element])
                }
            }
        })
    })

    return tags
}

export { useTags }
