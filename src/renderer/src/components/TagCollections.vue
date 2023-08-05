<template>
    <div v-if="tags.size !== 0" class="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 place-items-start gap-4">
        <ListLayout v-for="(map, index) in tags" :key="index" :no-action="true">
            <template #header>
                <TextLayout>
                    <TitleLarge>{{ map[0] }}</TitleLarge>
                </TextLayout>
            </template>
            <ListContentLayout>
                <ListItemLayout v-for="e in map[1].slice(0, 5)" :key="e.index">
                    <TextLayout>
                        <LabelLarge>
                            {{ e.title }}
                        </LabelLarge>
                    </TextLayout>
                    <TextLayout>
                        <BodyMedium>
                            {{ e.subtitle }}
                        </BodyMedium>
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
            </ListContentLayout>
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
import ListContentLayout from '@/layouts/ListContentLayout.vue';


const tasks = useTaskStore()
const router = useRouter()
const tags = useTags(tasks.getAll)
</script>

<style scoped>

</style>