<template>
    <div class="space-y-2">
        <ListLayout v-for="e in tasks.getCustom" :key="e.label">
            <template #header>
                <TextLayout class="font-bold">{{ e.label }}</TextLayout>
            </template>
            <div>
                <ListItemLayout v-for="item in e.items" :key="item.index">
                    <TextLayout class="font-bold">{{ item.title }}</TextLayout>
                    <TextLayout>{{ item.subtitle }}</TextLayout>
                    <template #action>
                        <md-standard-icon-button
                            @click="
                                router.push({
                                    path: '/info',
                                    query: {
                                        task: JSON.stringify(item)
                                    }
                                })
                            "
                            >
                            <md-icon>more</md-icon>
                        </md-standard-icon-button>
                    </template>
                </ListItemLayout>
            </div>

            <template #action>
                <md-text-button
                    @click="tasks.insertToCollection(e.label, [
                        useItem({title: 'Edit this', subtitle: 'This is a template.'})
                    ])"
                >Insert a blank task</md-text-button>
            </template>
        </ListLayout>            
    </div>
</template>

<script setup lang="ts">
import { useItem } from '@/hooks/useItem'
import { useTaskStore } from '@/store/useTaskStore'
import { useRouter } from 'vue-router'
import ListLayout from '@/layouts/ListLayout.vue'
import ListItemLayout from '@/layouts/ListItemLayout.vue'
import TextLayout from '@/layouts/TextLayout.vue'

const tasks = useTaskStore()
const router = useRouter()
</script>

<style scoped>

</style>