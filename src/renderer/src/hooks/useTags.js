import { ref } from 'vue'

/**
 * 读取list中的每一个Tag属性，将所有的Tag属性统计
 */
function useTags(list) {
    const tags = ref(new Map())

    list.forEach(element => {
        element['tag'].forEach(e => {
            if (e !== '') {
                if (!tags.value.has(e)) {
                    tags.value.set(e, [element])
                } else {
                    tags.value.set(e, [...tags.value.get(e), element])
                }
            }
        })
    })

    return tags
}

export {
    useTags
}