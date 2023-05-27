<template>
    <div class="pt-8 px-4">
        <Profile></Profile>

        <main class="mt-12 relative space-y-4">
            <!-- 待办等统计按钮，悬停时显示详细信息 -->
            <div class="surfaceContainer p-4 rounded-xl">
                <header>
                    <h1>Tasks</h1>
                </header>
                <main class="py-2">
                    <ul class="list">
                        <li>
                            <h1>待办 {{ store.getNormal.length }}</h1>
                            <ul
                                v-if="store.getNormal.length != 0"
                                class="list-inner-page list"
                            >
                                <li
                                    v-for="e in store.getNormal"
                                    :key="e.index"
                                >
                                    {{ e.title }}
                                </li>
                            </ul>
                        </li>

                        <li>
                            <h1>已完成 {{ store.getRecycle.length }}</h1>
                            <ul
                                v-if="store.getRecycle.length != 0"
                                class="list-inner-page list"
                            >
                                <li
                                    v-for="e in store.getRecycle"
                                    :key="e.index"
                                >
                                    {{ e.title }}
                                </li>
                            </ul>
                        </li>

                        <li>
                            <h1>固定 {{ store.getFocus.length }}</h1>
                            <ul
                                v-if="store.getFocus.length != 0"
                                class="list-inner-page list"
                            >
                                <li
                                    v-for="e in store.getFocus"
                                    :key="e.index"
                                >
                                    {{ e.title }}
                                </li>
                            </ul>
                        </li>
                    </ul>
                </main>
            </div>

            <div v-if="useTags(store.getNormal).keys() === null" class=" surfaceContainer p-4 rounded-xl">
                <header>
                    <h1>Tag</h1>
                </header>
                <main class="py-2">
                    <ul class="list">
                        <li v-for="e in useTags(store.getNormal)" class="list">
                            <h1>{{ e[0] }}</h1>
                            <ul class="list-inner-page tasks">
                                <li v-for="el in e[1]">
                                    {{ el.title }}
                                </li>
                            </ul>
                        </li>
                    </ul>
                </main>
            </div>

            <div class="surfaceContainer p-4 rounded-xl">
                <ul class="group">
                    <li>
                        <h1>Helper</h1>
                        <md-text-button
                            @click="router.push('/helper')"
                        >Look</md-text-button>
                    </li>
                </ul>
            </div>

            <router-view v-slot="{ Component }" name="MeInnerBoard">
                <component :is="Component"></component>
            </router-view>
        </main>
    </div>
</template>

<script lang="ts" setup>
import { useRouter } from 'vue-router'
import Profile from '@/components/personal/Profile.vue'
import { useTags } from '@/hooks/useTags'
import '@material/web/button/text-button'
import { useTaskStore } from '@/store'



/**
 * 用于获取所有的任务
 */
const store = useTaskStore()

/**
 * 路由
 */
const router = useRouter()
</script>
