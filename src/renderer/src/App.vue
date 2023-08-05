<template>
    <!-- 首屏 -->
    <div id="root" class="overflow-x-auto overflow-y-auto relative">

        <ninja-keys
            class="z-50"
            placeholder="placeholder"
            :data="hotkeys"
        ></ninja-keys>

        <!-- 启动后/重定向到/home -->
        <RouterView v-slot="{ Component }">
            <component :is="Component"></component>
        </RouterView>

        <EventSnackbar></EventSnackbar>
    </div>
</template>

<script lang="ts" setup>
import 'ninja-keys'
import EventSnackbar from '@/components/EventSnackbar.vue'
import { useRouter } from 'vue-router'
import useTheme from '@/hooks/useTheme'
import { onBeforeMount } from 'vue'

const router = useRouter()

onBeforeMount(() => {
    let isFirstLaunch = (
        JSON.parse(localStorage.getItem("bre97-web-todo-firstLaunch") as string) as boolean
    )
    if (isFirstLaunch === undefined || isFirstLaunch === null) {
        isFirstLaunch = true
    }
    if(isFirstLaunch) {
        router.push('/startupSetting')
    }
})

/**
 * Hotkeys
 */
const hotkeys = [
    {
        id: 'Shortcut Map',
        title: 'Shortcut Map',
        hotkey: 'alt+m',
        mdIcon: 'map',
        handler: () => {
            router.push('/dashboard/shortcutMap')
        }
    },
    {
        id: 'Settings',
        title: 'Dashboard',
        hotkey: 'alt+s',
        mdIcon: 'settings',
        handler: () => {
            router.push('/dashboard')
        }
    },
    {
        id: 'Theme',
        title: 'Theme',
        mdIcon: 'invert_colors',
        children: [
            {
                id: 'Dark',
                title: 'Dark',
                mdIcon: 'dark_mode',
                handler: () => {
                    useTheme().set({
                        isDark: true
                    })
                }
            },
            {
                id: 'Light',
                title: 'Light',
                mdIcon: 'light_mode',
                handler: () => {
                    useTheme().set({
                        isDark: false
                    })
                }
            }
        ]
    }
]
</script>
