<template>
    <div>
        <Header :input="input.value" @setInput="setInput"></Header>
        
        <main class="main">
            <Sidebar></Sidebar>
            <router-view v-slot="{ Component }" name="MainBoardView">
                <component :is="Component"></component>
            </router-view>
        </main>

        <!-- Create and Bottom Navigation -->
        <nav>
            <div class="fab">
                <md-branded-fab
                    label="Create"
                    :class="{ 'opacity-0': activeIndex > 1 }"
                    @click="dialog.open = true"
                >
                    <md-icon slot="icon" class="material-icons">create</md-icon>
                </md-branded-fab>
                <Creator :dialog="dialog" :closeDialog="closeDialog"></Creator>
            </div>
            <div class="navigation">
                <div>
                    <md-navigation-bar :activeIndex="activeIndex" class="lg:max-w-lg flex mx-auto">
                        <md-navigation-tab
                            label="Home"
                            @click="
                                () => {
                                    activeIndex = 0
                                    push('/home')
                                }
                            "
                        >
                            <md-icon slot="icon" class="material-icons">home</md-icon>
                        </md-navigation-tab>

                        <md-navigation-tab
                            label="Goals"
                            @click="
                                () => {
                                    activeIndex = 1
                                    push('/goals')
                                }
                            "
                        >
                            <md-icon class="material-icons">home</md-icon>
                        </md-navigation-tab>

                        <md-navigation-tab
                            label="Me"
                            @click="
                                () => {
                                    activeIndex = 2
                                    push('/me')
                                }
                            "
                        >
                            <md-icon slot="icon" class="material-icons">home</md-icon>
                        </md-navigation-tab>
                    </md-navigation-bar>
                </div>
            </div>
        </nav>
    </div>
</template>

<script lang="tsx" setup>
import { reactive, ref, watch } from 'vue'
import { useRouter } from 'vue-router'
import Creator from '@/components/creator/Creator.vue'
import Header from '@/components/setting/Header.vue'
import Sidebar from '@/components/sidebar/Sidebar.vue'
import { Search, SearchType } from '@/assets/js/search'

import '@material/web/navigationbar/navigation-bar'
import '@material/web/navigationtab/navigation-tab'
import '@material/web/fab/branded-fab'



/**
 * 由search.js提供搜索词，它应该转变为一个响应式对象
 * 使用时请带上.value
 */
const searchInput = Search()
const input = reactive<SearchType>(searchInput.get())
const setInput = (value: string) => input.value = value
watch(input, () => searchInput.set(input.value))

/**
 * 路由功能，用于跳转，获取当前路由地址（通过路由地址确定是否显示nav中的按钮）
 */
const router = useRouter()
const push = (path: string) => router.push({ 
    path: path,
})

/**
 * 控制md-navigation-bar的activeIndex属性，请在push时更改此activeIndex的值
 */
const activeIndex: any = ref(0)

/**
 * 控制fab按钮点击后显示的dialog窗口
 */
const dialog: any = reactive({
    open: false
})
const closeDialog = () => (dialog.open = false)
</script>
