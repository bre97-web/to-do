<template>
    <PageLayout>

        <div class="relative w-full">
            <md-tabs class="sticky top-[0px] z-50">
                <md-tab @click="setCurrentCollection('overview')">Overview</md-tab>
                <md-tab v-for="(e, index) in tasks.getCollections" :key="index" @click="setCurrentCollection(e)">{{ e
                }}</md-tab>
                <md-tab inline-icon @click="openDialog">
                    <md-icon slot="icon">add</md-icon>
                    New
                </md-tab>
            </md-tabs>

            <div>
                <Overview v-if="currentCollection === 'overview'"></Overview>
                <TaskList v-else :tasks="tasks.getTasksByCollection(currentCollection)">
                </TaskList>
            </div>

            <Teleport to="#app">
                <md-dialog id="createCollectionDialog" draggable modeless transition="grow">
                    <p slot="header">New Collection</p>

                    <form id="createCollectionDialogForm" action="dialog">
                        <md-filled-text-field label="Collection Name"></md-filled-text-field>
                    </form>

                    <div slot="footer" class="gap-2">
                        <md-text-button @click="closeDialog">Cancle</md-text-button>
                        <md-tonal-button @click="submitDialog">Apply</md-tonal-button>
                    </div>
                </md-dialog>
            </Teleport>
        </div>


        <!-- ChipSet -->
    </PageLayout>
</template>

<script lang="ts" setup>
import Overview from '@/components/TaskOverview.vue'
import { useTaskStore } from '@/store/useTaskStore';
import { ref } from 'vue';
import TaskList from '@/components/TaskList.vue';
import { useTask } from '@/hooks/useTask';


const tasks = useTaskStore()

/**
 * overview是一个特殊的集合，它不做为tasks中的fromCollection过滤目标
 */
// const collections = 
const currentCollection = ref('overview')
const setCurrentCollection = (e: string) => currentCollection.value = e

const setDialogOpen = async (e: boolean) => {
    (document.getElementById('createCollectionDialog') as HTMLElement & { show: () => void, close: () => void })[e ? 'show' : 'close']()
}
const openDialog = async () => {
    await setDialogOpen(true)
}
const closeDialog = async () => {
    await setDialogOpen(false)
}
const submitDialog = async () => {    
    tasks.push(useTask({
        title: 'Template',
        fromCollection: (document.getElementById('createCollectionDialogForm')?.children.item(0) as HTMLElement & { value: string }).value
    }))
    closeDialog()
}


/**
 * 当前选择的过滤标签
 */
const currentFilter = ref<string[]>([])
const clearCurrentFilter = () => {
    currentFilter.value = []
}
const pushCurrentFilter = (e: string) => {
    if (currentFilter.value.includes(e)) {
        currentFilter.value.splice(currentFilter.value.indexOf(e), 1)
    } else {
        currentFilter.value.push(e)
    }
}


</script>
