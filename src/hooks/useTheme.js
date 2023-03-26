import {
    reactive, watch
} from 'vue'

/**
 * 全局主题，用于设置主题颜色和深色模式
 */
const THEME = reactive(JSON.parse(localStorage.getItem('theme')) || {
    current: {
        isDark: false
    }
})

/**
 * 监测深色模式与切换, 当THEME.current.isDark为true时为document.body添加dark类
 */
watch(() => THEME.current.isDark, () => {
    if(THEME.current.isDark) {
        document.body.classList.add('dark')
    } else {
        document.body.classList.remove('dark')
    }
}, {immediate: true})

/**
 * 当THEME状态变化时将THEME保存到localStorage
 */
watch(THEME, () => localStorage.setItem('theme', JSON.stringify(THEME)))

export default function useDark() {

    /**
     * 得到全局的THEME
     * @returns const Object THEME
     */
    const get = () => THEME

    /**
     * 设置全局的THEME.current
     * @param {Object} current 请传入一个对象，其中包含THEME.current的属性
     */
    const set = (current) => {
        THEME.current = {
            ...current
        }
    }

    return {
        get,
        set,
    }
}