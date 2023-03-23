import {
    reactive, onMounted, onUpdated
} from 'vue'


const THEME = reactive(JSON.parse(localStorage.getItem('theme')) || {
    current: {
        isDark: false
    }
})

export default function useDark() {

    const isDark = THEME.current.isDark
    const get = () => THEME
    const set = (current) => {
        THEME.current = current
        localStorage.setItem('theme', JSON.stringify(THEME))
        update()
    }

    const update = () => {
        if(THEME.current.isDark) {
            document.body.classList.add('dark')
        } else {
            document.body.classList.remove('dark')
        }

    }

    onMounted (() => {
        update()
    })


    return {
        isDark,
        get,
        set,
    }
}