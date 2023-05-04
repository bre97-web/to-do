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
                        @click="() => settings.isDark = !settings.isDark"
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

<script lang="ts" setup>
import useTheme, { Color, Dark } from '@/hooks/useTheme'
import Theme from '@/components/Theme.vue'
import { reactive, watch } from 'vue'


/**
 * 修改主题
 */
const theme = useTheme()

const settings = reactive<Dark & Color>(theme.getCurrent())
watch(settings, () => theme.set(settings))
</script>
