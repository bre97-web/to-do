<template>
    <PageLayout>
        <template v-if="props.items.length !== 0">
            <md-list>
                <template v-for="e in props.items">
                    <md-list-item
                        v-if="props.itemsFilted.length === 0 || tagIncludes(props.itemsFilted, e)"
                        :key="e.index" :headline="e.title"
                        :supporting-text="e.subtitle"
                        @click="setShareItem(e)"
                    >
                        <!-- 完成按钮, 应该注意当前e在哪个容器中 -->
                        <template v-if="e.progressStatus !== 'done'">
                            <md-checkbox slot="start" @click="store.setProgressStatus(e, 'done')"></md-checkbox>
                        </template>
                        <template v-else>
                            <md-checkbox
                                slot="start"
                                checked
                                @click="store.setProgressStatus(e, 'processing')"
                            ></md-checkbox>
                        </template>

                        <!-- Buttons -->
                        <div slot="end">
                            <md-standard-icon-button v-if="e.progressStatus === 'pinned'" @click="store.setProgressStatus(e, 'processing')">
                                <md-icon>favorite</md-icon>
                            </md-standard-icon-button>
                            <md-standard-icon-button v-else-if="e.progressStatus === 'processing'" @click="store.setProgressStatus(e, 'pinned')">
                                <md-icon>favorite</md-icon>
                            </md-standard-icon-button>

                            <md-standard-icon-button v-if="e.progressStatus === 'done'" @click="store.remove(e)">
                                <md-icon>delete_forever</md-icon>
                            </md-standard-icon-button>
                            <md-standard-icon-button v-else @click="router.push({ path: '/info', query: {task: JSON.stringify(e)}})">
                                <md-icon>more</md-icon>
                            </md-standard-icon-button>
                        </div>
                    </md-list-item>
                </template>
            </md-list>
        </template>
        <template v-else>
            <AllDone></AllDone>
        </template>
    </PageLayout>
</template>

<script setup lang="ts">
import { Task, Tasks } from '@/hooks/useTask'
import { useTaskStore } from '@/store/useTaskStore'
import { useRouter } from 'vue-router'
import AllDone from './AllDone.vue'
import { setShareItem } from '@/scripts/taskProvider';
import PageLayout from '@/layouts/PageLayout.vue';

const props = defineProps<{
    itemsFilted: string[]
    items: Tasks
}>()

const router = useRouter()

const store = useTaskStore()

const tagIncludes = (container: string[], e: Task): boolean => {
    for (let i = 0; i < container.length; i++) {
        for (let j = 0; j < e.tags.length; j++) {
            if (container[i] === e.tags[j]) {
                return true
            }
        }
    }
    return false
}
</script>

<style scoped></style>
