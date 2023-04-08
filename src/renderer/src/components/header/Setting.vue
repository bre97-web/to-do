<template>
    <div class="setting">
        <md-text-button label="Settings"></md-text-button>

        <ul
            class="item p-4 rounded-md border dark:border-none shadow-md bg-white dark:bg-slate-700 absolute top-5 right-5 flex flex-col space-y-2"
        >
            <li class="space-y-2">
                <h1>Dark</h1>
                <label>
                    <p>Dark</p>
                    <md-switch
                        :selected="theme.get().current.isDark"
                        @click="
                            theme.set({
                                isDark: !theme.get().current.isDark
                            })
                        "
                    ></md-switch>
                </label>
            </li>

            <md-divider></md-divider>

            <li class="space-y-2">
                <h1>Theme</h1>
                <Theme></Theme>
            </li>
        </ul>
    </div>
</template>

<script setup>
import useTheme from '@/hooks/useTheme'
import Theme from '@/components/Theme.vue'

/**
 * 修改主题
 */
 const theme = useTheme()
</script>
