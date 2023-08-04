<template>
    <div v-if="tags.size !== 0" class="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 place-items-start gap-4">
        <ListLayout v-for="(map, index) in tags" :key="index" :no-action="true">
            <template #header>
                <TextLayout>
                    <h6>{{ map[0] }}</h6>
                </TextLayout>
            </template>
            <div class="space-y-2">
                <ListItemLayout v-for="e in map[1].slice(0, 5)" :key="e.index">
                    <TextLayout>
                        <subtitle1>
                            {{ e.title }}
                        </subtitle1>
                    </TextLayout>
                    <template #action>
                        <md-standard-icon-button
                            @click="
                                router.push({
                                    path: '/info',
                                    query: {
                                        task: JSON.stringify(e)
                                    }
                                })
                            "
                            >
                            <md-icon>more</md-icon>
                        </md-standard-icon-button>
                    </template>
                </ListItemLayout>
            </div>
        </ListLayout>
    </div>
</template>

<script setup lang="ts">
import ListLayout from '@/layouts/ListLayout.vue'
import { useTags } from '@/hooks/useTags';
import { useRouter } from 'vue-router'
import { useTaskStore } from '@/store/useTaskStore'
import TextLayout from '@/layouts/TextLayout.vue';
import ListItemLayout from '@/layouts/ListItemLayout.vue';


const tasks = useTaskStore()
const router = useRouter()
const tags = useTags(tasks.getAll)
</script>

<style scoped>

</style>