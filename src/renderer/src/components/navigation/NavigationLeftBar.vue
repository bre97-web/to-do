<template>
    <div class="max-h-screen overflow-auto max-w-min">
        <div class="px-2 my-4">
            <div class="flex flex-col items-start justify-start gap-2">
                <div
                    v-for="e in routerList"
                    :key="e.url"
                    class="rounded-full relative min-w-min max-w-max"
                    @click="router.push(e.url)"
                >
                    <md-ripple></md-ripple>
                    <div class="flex gap-2 items-center justify-center lg:justify-start w-14 h-14 lg:w-full lg:px-4">
                        <md-icon :class="{'icon-filled': router.currentRoute.value.path === e.url}">{{ e.icon }}</md-icon>
                        <BodyLarge class="hidden lg:block" :class="{'font-black': router.currentRoute.value.path == e.url}">{{ e.label }}</BodyLarge>
                    </div>
                </div>
                <div class="block lg:hidden">
                    <CreateTaskDialogOpenButton></CreateTaskDialogOpenButton>
                </div>
                <div class="hidden lg:block">
                    <CreateTaskDialogOpenButton label="Create"></CreateTaskDialogOpenButton>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import CreateTaskDialogOpenButton from '@/components/dialog/create-task-dialog/CreateTaskDialogOpenButton.vue'
import { getRouterList } from './navigation'
import { useRouter } from 'vue-router';

const router = useRouter()
const routerList = getRouterList()
</script>

<style scoped></style>
