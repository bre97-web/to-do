<template>
    <PageLayout>
        <template v-if="props.tasks.length !== 0">

            <!-- PINNED -->
            <md-list v-show="props.tasks.filter(e => e.progressStatus === 'pinned').length !== 0">
                <LabelLarge class="ml-4">Pinned</LabelLarge>
                <md-list-item 
                    v-for="e in props.tasks.filter(e => e.progressStatus === 'pinned')" 
                    :key="e.index"
                    :headline="e.title"
                    :supporting-text="e.subtitle"
                    @click="setShareItem(e)"
                >
                    <!-- 完成按钮, 应该注意当前e在哪个容器中 -->
                    <md-checkbox slot="start" @click="store.setProgressStatus(e, 'done')"></md-checkbox>

                    <!-- Buttons -->
                    <div slot="end">
                        <md-standard-icon-button @click="store.setProgressStatus(e, 'processing')">
                            <md-icon class="icon-filled">star</md-icon>
                        </md-standard-icon-button>
                        <md-standard-icon-button @click="router.push({ path: '/info', query: { task: JSON.stringify(e) } })">
                            <md-icon>more</md-icon>
                        </md-standard-icon-button>
                    </div>
                </md-list-item>
            </md-list>

            <!-- PROCESSING -->
            <md-list v-show="props.tasks.filter(e => e.progressStatus === 'processing').length !== 0">
                <LabelLarge class="ml-4">Processing</LabelLarge>
                <md-list-item 
                    v-for="e in props.tasks.filter(e => e.progressStatus === 'processing')" 
                    :key="e.index"
                    :headline="e.title"
                    :supporting-text="e.subtitle"
                    @click="setShareItem(e)"
                >
                    <!-- 完成按钮, 应该注意当前e在哪个容器中 -->
                    <md-checkbox slot="start" @click="store.setProgressStatus(e, 'done')"></md-checkbox>

                    <!-- Buttons -->
                    <div slot="end">
                        <md-standard-icon-button @click="store.setProgressStatus(e, 'pinned')">
                            <md-icon>star</md-icon>
                        </md-standard-icon-button>
                        <md-standard-icon-button @click="router.push({ path: '/info', query: { task: JSON.stringify(e) } })">
                            <md-icon>more</md-icon>
                        </md-standard-icon-button>
                    </div>
                </md-list-item>
            </md-list>

            <!-- DONE -->
            <md-list v-show="props.tasks.filter(e => e.progressStatus === 'done').length !== 0">
                <LabelLarge class="ml-4">Completed</LabelLarge>
                <md-list-item
                    v-for="e in props.tasks.filter(e => e.progressStatus === 'done')" 
                    :key="e.index"
                    :headline="e.title"
                    :supporting-text="e.subtitle"
                    class="line-through"
                    @click="setShareItem(e)"
                >
                    <md-checkbox slot="start" checked @click="store.setProgressStatus(e, 'processing')"></md-checkbox>

                    <div slot="end">
                        <md-standard-icon-button @click="store.remove(e)">
                            <md-icon>delete_forever</md-icon>
                        </md-standard-icon-button>
                    </div>
                </md-list-item>
            </md-list>
        </template>
        <AllDone v-else></AllDone>
    </PageLayout>
</template>

<script setup lang="ts">
import { Tasks } from '@/hooks/useTask'
import { useTaskStore } from '@/store/useTaskStore'
import { useRouter } from 'vue-router'
import AllDone from '@/components/tasks/list/internal/AllDone.vue'
import { setShareItem } from '@/components/aside/taskProvider';
import PageLayout from '@/layouts/PageLayout.vue';

const props = defineProps<{
    tasks: Tasks
}>()

const router = useRouter()

const store = useTaskStore()
</script>

<style scoped></style>
