<template>
    <div>
        <main class="p-8 relative w-full mt-16 flex flex-col md:flex-row flex-wrap rounded-xl gap-2 md:items-start md:justify-evenly">
            <template v-for="map in tags">
                <Card class="border rounded-xl p-4 md:w-1/4 md:h-48 surface surfaceContainer md:flex-grow md:flex-shrink">
                    <template #header>
                        <h1>{{ map[0] }}</h1>
                    </template>
                    <ul class="rounded-xl" v-for="tag in map[1].slice(0, 5)">

                        <li>{{ tag.title }}</li> 
                    </ul>
                </Card>
            </template>
        </main>
    </div>
</template>

<script setup lang="ts">
import Card from '@/components/card/Card.vue'
import { useTags } from '@/hooks/useTags';
import { useTaskStore } from '@/store';


const tasks = useTaskStore()
const tags = useTags(Array.from([...tasks.getNormal, ...tasks.getFocus, ...tasks.getRecycle]))
</script>

<style scoped>

</style>