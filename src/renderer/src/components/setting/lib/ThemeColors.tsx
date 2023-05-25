import useTheme from '@/hooks/useTheme'

import '@material/web/radio/radio'


const theme = useTheme()

const ThemeColors = () => (
    <ul class="flex flex-col gap-2">
        {
            theme.getThemeColor().map((e, index) => (
                <li
                    key={index}
                    class="flex items-center justify-start"
                >
                    <label>
                        <p>{ e }</p>
                        <md-radio
                            name="theme"
                            class="absolute right-0"
                            onClick={() => theme.set({
                                color: e
                            })}
                        ></md-radio>
                    </label>
                </li>
            ))
        }
    </ul>
)

export {
    ThemeColors
}