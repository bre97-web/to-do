<template>
    <div class="fixedWindow fullScreen bg-background withBackButton overflow-y-scroll">
        <nav class="backButton">
            <div class="max-w-lg mx-auto">
                <md-text-button
                    @click="
                        () => {
                            router.push('/home')
                        }
                    "
                >
                    <md-icon slot="icon">arrow_back</md-icon>
                    Back
                </md-text-button>
            </div>
        </nav>

        <div class="px-8 space-y-8 max-w-xl w-full mx-auto bg-surface">
            <main class="space-y-2 pb-16">
                <!-- Title -->
                <Info>
                    <template #header>
                        <md-icon>title</md-icon>
                    </template>
                    <template #content>
                        <md-outlined-text-field v-model="task.title" label="Title" type="text">
                        </md-outlined-text-field>
                    </template>
                </Info>

                <!-- Subtitle-->
                <Info>
                    <template #header>
                        <md-icon>subtitles</md-icon>
                    </template>
                    <template #content>
                        <md-outlined-text-field
                            v-model="task.subtitle"
                            label="Subtitle"
                            type="text"
                        >
                        </md-outlined-text-field>
                    </template>
                </Info>

                <!-- Note  -->
                <Info>
                    <template #header>
                        <md-icon>description</md-icon>
                    </template>
                    <template #content>
                        <md-outlined-text-field v-model="task.note" label="Note" type="text">
                        </md-outlined-text-field>
                    </template>
                </Info>

                <!-- CreatedTime -->
                <Info>
                    <template #header>
                        <md-icon>calendar_month</md-icon>
                    </template>
                    <template #content>
                        <md-outlined-text-field
                            v-model="task.createdDate"
                            label="Created time"
                            type="date"
                        >
                        </md-outlined-text-field>
                    </template>
                </Info>

                <!-- TargetTime -->
                <Info>
                    <template #header>
                        <md-icon>event</md-icon>
                    </template>
                    <template #content>
                        <md-outlined-text-field
                            v-model="task.targetDate"
                            label="Target time"
                            type="date"
                        >
                        </md-outlined-text-field>
                    </template>
                </Info>

                <!-- Tags -->
                <Info>
                    <template #header>
                        <md-icon>tag</md-icon>
                    </template>
                    <template #content>
                        <md-outlined-text-field
                            label="Tags"
                            supportingText="Tags中每一个Tag使用逗号分隔"
                            type="text"
                            :value="task.tags"
                            @input="(e: InputEvent) => task.tags = (e.target as HTMLInputElement).value.split(/[,，]/)"
                        >
                        </md-outlined-text-field>
                        <ul class="flex items-center justify-start gap-2 flex-wrap">
                            <md-filled-field v-for="(e, index) in task.tags" :key="index">{{
                                e
                            }}</md-filled-field>
                        </ul>
                    </template>
                </Info>

                <!-- Steps -->
                <Info>
                    <template #header>
                        <md-icon>checklist</md-icon>
                    </template>
                    <template #content>
                        <div class="flex items-center gap-2">
                            <md-outlined-text-field
                                v-model="newStepValue"
                                label="Step"
                            ></md-outlined-text-field>
                            <md-standard-icon-button @click="createStep">
                                <md-icon>add</md-icon>
                            </md-standard-icon-button>
                        </div>
                        <md-list>
                            <div v-for="(e, index) in task.steps" :key="index">
                                <md-list-item :headline="e.text">
                                    <md-checkbox
                                        slot="start"
                                        :checked="e.done"
                                        @click="() => (e.done = !e.done)"
                                    ></md-checkbox>
                                    <md-standard-icon-button
                                        slot="end"
                                        @click="() => task.steps.splice(index, 1)"
                                    >
                                        <md-icon>delete_outlined</md-icon>
                                    </md-standard-icon-button>
                                </md-list-item>
                                <md-divider></md-divider>
                            </div>
                        </md-list>
                    </template>
                </Info>
            </main>
        </div>
    </div>
</template>

<script lang="ts" setup>
import { reactive, ref, watch } from 'vue'
import { useRouter } from 'vue-router'
import { Item } from '@/hooks/useItem'
import Info from '@/components/task/info/Info.vue'
import { useTaskStore } from '@/store/useTaskStore'

const store = useTaskStore()

/**
 * 用于返回按钮，路由到/home
 */
const router = useRouter()

/**
 * 用于Info组件，用于修改元素
 */
const task = reactive<Item>(JSON.parse(router.currentRoute.value.query.task as string))

/**
 * 用于创建新的step元素
 */
const newStepValue = ref<string>('')
const createStep = () => {
    task.steps.push({
        text: newStepValue.value,
        done: false
    })
}

watch(task, () => {
    for (let index = 0; index < store.getFocus.length; index++) {
        if (store.tasks.focus[index].index === task.index) {
            store.tasks.focus[index] = {
                ...task
            }
        }
    }
    for (let index = 0; index < store.getNormal.length; index++) {
        if (store.tasks.normal[index].index === task.index) {
            store.tasks.normal[index] = {
                ...task
            }
        }
    }
    for (let index = 0; index < store.getRecycle.length; index++) {
        if (store.tasks.recycle[index].index === task.index) {
            store.tasks.recycle[index] = {
                ...task
            }
        }
    }
})
</script>
