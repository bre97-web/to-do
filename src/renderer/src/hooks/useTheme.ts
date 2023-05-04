import { type } from 'os'
import { reactive, watch } from 'vue'

interface CurrentTheme {
    current: {
        isDark: boolean,
        color: string
    }
}
interface Colors {
    color: string[]
}

type Theme = Colors & CurrentTheme

/**
 * 全局主题，用于设置主题颜色和深色模式
 */
const THEME = reactive<Theme>({
    /**
     * color是允许使用的所有主题色，不包括深色模式
     */
    color: ['default', 'green', 'red', 'blue'],

    /**
     * current是当前主题的配置信息
     */
    current: JSON.parse(localStorage.getItem('theme-current') as string) || {
        isDark: false,
        /**
         * 当前使用的主题色
         */
        color: 'default',
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
 * 切换主题色
 */
watch(() => THEME.current.color, () => {
    THEME.color.forEach(element => {
        document.body.classList.remove(element)
    })
    document.body.classList.add(THEME.current.color)
}, {immediate: true})

/**
 * 当THEME状态变化时将THEME保存到localStorage
 */
watch(() => THEME.current, () => localStorage.setItem('theme-current', JSON.stringify(THEME.current)))

export default function useDark() {

    /**
     * 得到全局的THEME
     * @returns const Object THEME
     */
    const get = (): Theme => THEME
    const getCurrent = () => THEME.current
    const getThemeColor = (): string[] => THEME.color

    /**
     * 设置全局的THEME.current
     * @param {Object} current 请传入一个对象，其中包含THEME.current的属性
     */
    const set = (current: CurrentTheme) => {
        THEME.current = {
            ...THEME.current,
            ...current
        }
    }

    return {
        get,
        getCurrent,
        getThemeColor,
        set
    }
}

export type {
    Theme,
    Colors,
    CurrentTheme
}