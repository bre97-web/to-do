<template>
    <Loading v-if="!isLoaded" message="To-Do"></Loading>
    <div v-else id="root" class="bg-base overflow-x-hidden">
        <FirstLaunch></FirstLaunch>

        <Header :input="input" @setInput="setInput"></Header>

        <main class="pt-24 min-h-screen">
            <Search :input="input"></Search>

            <router-view v-slot="{Component}">
                <component :is="Component"></component>
            </router-view>
        </main>

        <!-- Create and Bottom Navigation -->
        <nav>
            <div class="fab">
                <md-fab-extended
                    label="Create"
                    :class="{ 'opacity-0': location != '/' }"
                    @click="dialog.open = true"
                >
                    <i slot="icon" class="material-icons">create</i>
                </md-fab-extended>
                <Creator :dialog="dialog" :closeDialog="closeDialog"></Creator>
            </div>
            <div class="navigation">
                <div>
                    <md-navigation-bar :activeIndex="activeIndex" class="lg:max-w-lg flex mx-auto">
                        <md-navigation-tab label="Home" @click="push('/')">
                            <i slot="icon" class="material-icons">home</i>
                        </md-navigation-tab>
                        <md-navigation-tab label="Me" @click="push('/me')">
                            <i slot="icon" class="material-icons">home</i>
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
import { reactive, ref, watch, computed } from 'vue'
import { useRouter } from 'vue-router'
import Search from '@/views/Search.vue'
import Header from './components/header/Header.vue'
import Creator from './components/Creator.vue'
import FirstLaunch from './components/FirstLaunch.vue'
import Loading from './components/Loading.vue'

/**
 * 在window.load时isLoaded变为true，延迟1秒
 */
const isLoaded = ref(false)
window.addEventListener('load', () => {
    setTimeout(() => (isLoaded.value = true), 1000)
})

const dialog = reactive({
    open: false
})
const closeDialog = () => (dialog.open = false)

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
const input = ref('')
const setInput = (value) => input.value = value
</script>
