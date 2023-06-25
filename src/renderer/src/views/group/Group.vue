<template>
    <div>
        <template v-if="tags.size !== 0">
            <main
                class="p-8 relative w-full flex flex-col md:flex-row flex-wrap rounded-xl gap-2 md:items-start md:justify-evenly"
            >
                <Card
                    v-for="(map, index) in tags"
                    :key="index"
                    class="rounded-xl p-4 md:w-1/4 md:h-48 elevation surfaceContainer md:flex-grow md:flex-shrink"
                >
                    <template #header>
                        <h1 class="text-onSurface">{{ map[0] }}</h1>
                    </template>
                    <ul class="rounded-xl flex flex-row flex-wrap items-start gap-2">
                        <li
                            v-for="e in map[1].slice(0, 5)"
                            :key="e.index"
                            class="p-4 surfaceContainerHigh text-onSurface rounded-xl"
                            @click="
                                router.push({
                                    path: '/info',
                                    query: {
                                        task: JSON.stringify(e)
                                    }
                                })
                            "
                        >
                            {{ e.title }}
                        </li>
                    </ul>
                </Card>
            </main>
        </template>
        <template v-else>
            <div class="space-y-4 pt-24 text-center">
                <md-icon class="scale-[4] text-secondary">done_all</md-icon>
                <p class="text-center italic text-secondary">All done</p>
            </div>
        </template>
    </div>
</template>

<script setup lang="ts">
import Card from '@/components/card/Card.vue'
import { useTags } from '@/hooks/useTags'
import { useTaskStore } from '@/store/useTaskStore'
import { useRouter } from 'vue-router'

const router = useRouter()

const tasks = useTaskStore()
const tags = useTags(Array.from([...tasks.getNormal, ...tasks.getFocus, ...tasks.getRecycle]))
</script>

<style scoped></style>
