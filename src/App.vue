<template>
    <div>
        <header class="topBar">
            <div class="px-4 py-2 flex flex-row items-center justify-between w-full">

                <!-- Web Title -->
                <h1>To-Do</h1>

                <!-- Search input -->
                <input type="text" placeholder="Search" />

                <!-- Settings and other buttons -->
                <div class="flex flex-row items-center justify-between">
                    <md-outlined-icon-button>
                        <i class="material-icons" slot="icon">group</i>
                    </md-outlined-icon-button>
                </div>
            </div>
        </header>

        <main>

            <Task></Task>

            <div>
                <router-view></router-view>
            </div>
        </main>

        <nav>
            <md-fab-extended @click="dark.set({
                isDark: !dark.get().current.isDark
            })" label="Dark">
                <i class="material-icons" slot="icon">group</i>
            </md-fab-extended>
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
import useDark from './hooks/useDark'

import Task from './components/Task.vue'

const dark = useDark()


</script>

<style lang="scss" scoped>

</style>