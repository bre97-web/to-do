
import { ThemeColors } from '@/components/setting/lib/ThemeColors'
import { DarkSwitch } from '@/components/dark/DarkSwitch'



const Settings = () => (
    <div class="setting">
        <md-text-button>Settings</md-text-button>

        <ul
            class="item p-4 rounded-md border dark:border-none shadow-md bg-white dark:bg-slate-700 absolute top-5 right-5 flex flex-col space-y-2"
        >
            <li class="space-y-2">
                <h1>Dark</h1>
                <DarkSwitch></DarkSwitch>
            </li>

            <md-divider></md-divider>

            <li class="space-y-2">
                <h1>Theme</h1>
                <ThemeColors></ThemeColors>
            </li>
        </ul>
    </div>
)    


export {
    Settings
}