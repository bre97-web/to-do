<template>
    <div>
        <Header :input="input" @setInput="setInput"></Header>
        <main class="main">
            <router-view v-slot="{ Component }" name="MainBoardView">
                <component :is="Component"></component>
            </router-view>
        </main>

        <!-- Create and Bottom Navigation -->
        <nav>
            <div class="fab">
                <md-fab-extended
                    label="Create"
                    :class="{ 'opacity-0': activeIndex != 0 }"
                    @click="dialog.open = true"
                >
                    <i slot="icon" class="material-icons">create</i>
                </md-fab-extended>
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
                            <i slot="icon" class="material-icons">home</i>
                        </md-navigation-tab>

                        <md-navigation-tab
                            label="Me"
                            @click="
                                () => {
                                    activeIndex = 1
                                    push('/me')
                                }
                            "
                        >
                            <i slot="icon" class="material-icons">home</i>
                        </md-navigation-tab>
                    </md-navigation-bar>
                </div>
            </div>
        </nav>
    </div>
</template>

<script setup>
import { reactive, ref } from 'vue'
import { useRouter } from 'vue-router'
import Creator from '@/components/Creator.vue'
import Header from '@/components/header/Header.vue'


/**
 * 用于Search组件
 */
const input = ref('')
const setInput = (value) => (input.value = value)

/**
 * 路由功能，用于跳转，获取当前路由地址（通过路由地址确定是否显示nav中的按钮）
 */
const router = useRouter()
const push = (path) => router.push({ 
    path: path,
})

/**
 * 控制md-navigation-bar的activeIndex属性，请在push时更改此activeIndex的值
 */
const activeIndex = ref(0)

/**
 * 控制fab按钮点击后显示的dialog窗口
 */
const dialog = reactive({
    open: false
})
const closeDialog = () => (dialog.open = false)
</script>
