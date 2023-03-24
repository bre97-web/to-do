<template>
    <div class="bg-transparent dark:bg-gray-900 overflow-x-hidden">
        <header class="topBar">
            <div class="px-4 py-2 flex flex-row items-center justify-between w-full">

                <!-- Web Title -->
                <h1>To-Do</h1>

                <!-- Search input -->
                <div class="relative w-full flex items-center justify-center">
                    <i class="material-icons relative left-10">search</i>
                    <input type="text" placeholder="Search" />
                </div>

                <!-- Settings and other buttons -->
                <div class="flex flex-row items-center justify-between">
                    <label>
                        Dark
                        <md-switch 
                            @click="dark.set({
                                isDark: !dark.get().current.isDark
                            })" 
                            :selected="dark.get().current.isDark">
                        </md-switch>
                    </label>
                </div>
            </div>
        </header>

        <main>
            <div>
                <router-view></router-view>
            </div>
        </main>

        <!-- Create feature -->
        <nav>
            <div class="fab">
                <md-fab-extended :class="{'opacity-0': location != '/'}" @click="open = true" label="Create">
                    <i class="material-icons" slot="icon">create</i>
                </md-fab-extended>
            </div>
            <div class="navigation">
                <div>
                    <md-navigation-bar class="lg:max-w-lg flex mx-auto">
                        <md-navigation-tab @click="push('/')" label="Home">
                            <i class="material-icons" slot="icon">home</i>
                        </md-navigation-tab>
                        
                        <md-navigation-tab @click="push('/me')" label="Me">
                            <i class="material-icons" slot="icon">home</i>
                        </md-navigation-tab>
                    </md-navigation-bar>
                </div>
            </div>
        </nav>

        <footer>
            <div class=" p-8 flex flex-col md:flex-row flex-wrap">
                <h1>To-Do</h1>
                <h2>bre97-web</h2>
            </div>
        </footer>
    </div>
</template>

<script setup>
import {
    reactive, ref, provide, watch
} from 'vue'
import {
    useRouter
} from 'vue-router'

import useDark from './hooks/useDark'

const dark = useDark()

var open = ref(false)
const close = () => open.value = false
provide('createDialog', {
    open,
    close
})

const router = reactive(useRouter())
const location = ref(router.options.history.location)
const push = (path) => router.push({
    path: path
})
watch(router, () => location.value = router.options.history.location)

</script>

<style lang="scss" scoped>

</style>