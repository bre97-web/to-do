<template>
    <div class="fixed hidden lg:block top-28 left-0 pl-4 w-44 h-96">
        <div class="sidebar">
            <h1>Sidebar</h1>
            <ul>
                <li>
                    <header>
                        <h1>Set a goal to do it</h1>
                        <p>Including some steps</p>
                    </header>
                    <footer class="action">
                        <md-tonal-button
                            @click="router.push('/chooseGoal')"
                        >Create</md-tonal-button>
                    </footer>
                </li>

                <li>
                    <p class="italic">More features is coming.</p>
                </li>
            </ul>
        </div>
    </div>
</template>

<script lang="ts" setup>
import { useRouter } from 'vue-router'

import '@material/web/button/tonal-button'


const router = useRouter()
</script>