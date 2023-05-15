<template>
    <div>
        <Profile></Profile>

        <main class="mt-12 relative">
            <!-- 待办等统计按钮，悬停时显示详细信息 -->
            <div>
                <header>
                    <h1>Tasks</h1>
                </header>
                <main class="py-2">
                    <ul class="list">
                        <li>
                            <h1>待办 {{ tasks.get().taskList.get().length }}</h1>
                            <ul
                                v-if="tasks.get().taskList.get().length != 0"
                                class="list-inner-page list"
                            >
                                <li
                                    v-for="e in tasks.get().taskList.get()"
                                    :key="e.index"
                                >
                                    {{ e.title }}
                                </li>
                            </ul>
                        </li>

                        <li>
                            <h1>已完成 {{ tasks.get().binList.get().length }}</h1>
                            <ul
                                v-if="tasks.get().binList.get().length != 0"
                                class="list-inner-page list"
                            >
                                <li
                                    v-for="e in tasks.get().binList.get()"
                                    :key="e.index"
                                >
                                    {{ e.title }}
                                </li>
                            </ul>
                        </li>

                        <li>
                            <h1>固定 {{ tasks.get().focusList.get().length }}</h1>
                            <ul
                                v-if="tasks.get().focusList.get().length != 0"
                                class="list-inner-page list"
                            >
                                <li
                                    v-for="e in tasks.get().focusList.get()"
                                    :key="e.index"
                                >
                                    {{ e.title }}
                                </li>
                            </ul>
                        </li>
                    </ul>
                </main>
            </div>

            <div v-if="useTags(tasks.get().taskList.get()).keys() === null">
                <header>
                    <h1>Tag</h1>
                </header>
                <main class="py-2">
                    <ul class="list">
                        <li v-for="e in useTags(tasks.get().taskList.get())" class="list">
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

            <div class="mt-12 mb-2">
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
import { useTasks } from '@/hooks/useTasks'
import Profile from '@/components/personal/Profile.vue'
import { useTags } from '@/hooks/useTags'



/**
 * 用于获取所有的任务
 */
const tasks = useTasks()

/**
 * 路由
 */
const router = useRouter()
</script>
