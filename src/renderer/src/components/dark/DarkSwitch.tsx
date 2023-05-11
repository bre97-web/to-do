import useTheme from '@/hooks/useTheme'

const theme = useTheme()

const DarkSwitch = () => (
    <label>
        <p>Dark</p>
        <md-switch
            selected={theme.get().current.isDark}
            onClick={() => theme.set({
                isDark: !theme.getCurrent().isDark
            })}
        ></md-switch>
    </label>
)

export {
    DarkSwitch
}