<template>
    <div>
        <template v-if="tags.size !== 0">
            <main class="p-8 relative w-full flex flex-col md:flex-row flex-wrap rounded-xl gap-2 md:items-start md:justify-evenly">
                <template v-for="map in tags">
                    <Card class="border rounded-xl p-4 md:w-1/4 md:h-48 elevation surfaceContainer md:flex-grow md:flex-shrink">
                        <template #header>
                            <h1>{{ map[0] }}</h1>
                        </template>
                        <template #>
                            <ul class="rounded-xl flex flex-row flex-wrap items-start gap-2">
                                <template v-for="e in map[1].slice(0, 5)">
                                    <li
                                        class="p-4 surfaceContainerHigh rounded-xl"
                                        @click="router.push({
                                            path: '/info',
                                            query: {
                                                task: JSON.stringify(e)
                                            }
                                        })"
                                    >
                                        {{ e.title }}
                                    </li> 
                                </template>
                            </ul>
                        </template>
                    </Card>
                </template>
            </main>
        </template>
        <template v-else>
            <div class="space-y-4 pt-24 text-center">
                <md-icon class="scale-[4] text-gray-500">done_all</md-icon>
                <p class="text-center italic">All done</p>
            </div>
        </template>
    </div>
</template>

<script setup lang="ts">
import Card from '@/components/card/Card.vue'
import { useTags } from '@/hooks/useTags'
import { useTaskStore } from '@/store'
import '@material/web/icon/icon'
import '@material/web/iconbutton/standard-icon-button'
import { useRouter } from 'vue-router'

const router = useRouter()

const tasks = useTaskStore()
const tags = useTags(Array.from([...tasks.getNormal, ...tasks.getFocus, ...tasks.getRecycle]))
</script>

<style scoped>

</style>