<template>
    <PageLayout>
        <template v-if="tags.size !== 0">
            <div
                class="m-8 relative flex flex-col md:flex-row flex-wrap gap-2 md:items-start md:justify-evenly"
            >
                <Card
                    v-for="(map, index) in tags"
                    :key="index"
                    class="rounded-xl p-4 md:w-1/4 md:h-48 md:flex-grow md:flex-shrink"
                >
                    <template #header>
                        <h1 class="text-onSurface">{{ map[0] }}</h1>
                    </template>
                    <ul class="rounded-xl flex flex-row flex-wrap items-start gap-2">
                        <li
                            v-for="e in map[1].slice(0, 5)"
                            :key="e.index"
                            class="p-4 relative rounded-xl"
                            @click="
                                router.push({
                                    path: '/info',
                                    query: {
                                        task: JSON.stringify(e)
                                    }
                                })
                            "
                        >
                            <md-ripple></md-ripple>
                            <md-evelation></md-evelation>
                            <p>
                                {{ e.title }}
                            </p>
                        </li>
                    </ul>
                </Card>
            </div>
        </template>
        <template v-else>
            <AllDone></AllDone>
        </template>
    </PageLayout>
</template>

<script setup lang="ts">
import AllDone from '@/components/AllDone.vue';
import Card from '@/components/Card.vue'
import { useTags } from '@/hooks/useTags'
import PageLayout from '@/layouts/PageLayout.vue';
import { useTaskStore } from '@/store/useTaskStore'
import { useRouter } from 'vue-router'

const router = useRouter()

const tasks = useTaskStore()
const tags = useTags(Array.from([...tasks.getNormal, ...tasks.getFocus, ...tasks.getRecycle]))
</script>

<style scoped></style>
