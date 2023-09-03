<template>
    <div class="relative w-full">
        <md-tabs class="sticky top-[0px] z-50">
            <md-tab>Overview</md-tab>
            <md-tab v-for="(e, index) in collections" :key="index" @click="setCurrentCollection(e)">{{ e }}</md-tab>
            <md-tab inline-icon @click="openDialog">
                <md-icon slot="icon">add</md-icon>
                New
            </md-tab>
        </md-tabs>

        <div>
            <Overview></Overview>
            <ul>
                <li v-for="e in tasks.getTasksByCollection(currentCollection)" :key="e.index">
                    {{ e.title }}
                    {{ e.index }}
                </li>
            </ul>
            <!-- <Result :itemsFilted="props.currentFilter" :items="tasks.getDone"></Result> -->
        </div>

        <Teleport to="#app">
            <md-dialog id="createCollectionDialog" draggable modeless transition="grow">
                <p slot="header">New Collection</p>

                <form id="qwe" action="dialog">
                    <md-filled-text-field label="Collection Name"></md-filled-text-field>
                </form>

                <div slot="footer" class="gap-2">
                    <md-text-button @click="closeDialog">Cancle</md-text-button>
                    <md-tonal-button @click="closeDialog">Cancle</md-tonal-button>
                </div>
            </md-dialog>
        </Teleport>
    </div>
</template>

<script setup lang="ts">
import Overview from '@/components/TaskOverview.vue'
import { useTaskStore } from '@/store/useTaskStore';
import { onMounted, ref, watch } from 'vue';


const tasks = useTaskStore()

/**
 * 
 */
const collections = ref([
    'processing',
    'pinned',
    'done',
])
const currentCollection = ref(collections.value[0])
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

</script>

<style scoped></style>
