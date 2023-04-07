<template>
    <div id="root" class="bg-base overflow-x-hidden">

        <FirstLaunch></FirstLaunch>

        <header class="topBar">
            <div class="px-4 py-2 flex flex-row items-center justify-between w-full gap-2">

                <!-- Web Title -->
                <h1>To-Do</h1>

                <!-- Search input -->
                <div class="relative w-full flex items-center justify-center">
                    <i class="material-icons relative left-10">search</i>
                    <input :value:="input" @input="input = $event.target.value" type="text" placeholder="Search" />
                </div>

                <!-- Settings and other buttons -->
                <div class="setting">
                    
                    <md-text-button label="Settings">
                    </md-text-button>
                    
                    <ul class="item p-4 rounded-md border dark:border-none shadow-md bg-white dark:bg-slate-700 absolute top-5 right-5 flex flex-col space-y-2">
                        <li class="space-y-2">
                            <h1>Dark</h1>
                            <label>
                                <p>Dark</p>
                                <md-switch 
                                    @click="theme.set({
                                        isDark: !theme.get().current.isDark
                                    })" 
                                    :selected="theme.get().current.isDark">
                                </md-switch>
                            </label>
                        </li>

                        <md-divider></md-divider>

                        <li class="space-y-2">
                            <h1>Theme</h1>
                            <Theme></Theme>
                        </li>
                    </ul>
                </div>
            </div>
        </header>

        <main class="pt-24 min-h-screen">
            <Search :input="input"></Search>

            <router-view v-slot="{Component}">
                <component :is="Component"></component>
            </router-view>
        </main>

        <!-- Create and Bottom Navigation -->
        <nav>
            <div class="fab">
                <md-fab-extended :class="{'opacity-0': location != '/'}" @click="open = true" label="Create">
                    <i class="material-icons" slot="icon">create</i>
                </md-fab-extended>
            </div>
            <div class="navigation">
                <div>
                    <md-navigation-bar :activeIndex="activeIndex" class="lg:max-w-lg flex mx-auto">
                        <md-navigation-tab @click="push('/')" label="Home">
                            <i class="material-icons" slot="icon">home</i>
                        </md-navigation-tab>
                        
                        <md-navigation-tab  @click="push('/me')" label="Me">
                            <i class="material-icons" slot="icon">home</i>
                        </md-navigation-tab>
                    </md-navigation-bar>
                </div>
            </div>
        </nav>

        <footer>
            <div class="p-8 flex flex-col md:flex-row gap-2 flex-wrap">
                <div>
                    <h1>To-Do</h1>
                    <h2>bre97-web</h2>
                </div>
            </div>
        </footer>
    </div>
</template>

<script setup>
import { reactive, ref, provide, watch, computed } from 'vue'
import { useRouter } from 'vue-router'
import Search from '@/views/Search.vue'
import Theme from '@/components/Theme.vue'
import useTheme from '@/hooks/useTheme'
import FirstLaunch from './components/FirstLaunch.vue'

const theme = useTheme()

var open = ref(false)
const close = () => (open.value = false)
provide('createDialog', {
    open,
    close
})

/**
 * 路由功能，用于跳转，获取当前路由地址（通过路由地址确定是否显示nav中的按钮）
 */
const router = reactive(useRouter())
const location = ref(router.options.history.location)
const push = (path) => router.push({ path: path })
watch(router, () => (location.value = router.options.history.location))
const optionsRoutes = ref(router.options.routes)

var activeIndex = computed(() => {
    for (let key in optionsRoutes.value) {
        if (optionsRoutes.value[key].path == location.value) {
            return key * 1
        }
    }
    return optionsRoutes.value.length - 2
})

/**
 * 用于Search组件
 */
var input = ref('')
</script>
