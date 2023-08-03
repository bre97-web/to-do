<template>
    <PageWithBackLayout name="PageWithBack">


        <div class="panel px-8 flex flex-col gap-2 items-start mx-auto">
            <!-- Title -->
            <div>
                <md-icon>title</md-icon>
                <md-outlined-text-field v-model="task.title" label="Title" type="text"></md-outlined-text-field>
            </div>

            <!-- Subtitle-->
            <div>
                <md-icon>subtitles</md-icon>
                <md-outlined-text-field v-model="task.subtitle" label="Subtitle" type="text"></md-outlined-text-field>
            </div>

            <!-- Note  -->
            <div>
                <md-icon>description</md-icon>
                <md-outlined-text-field v-model="task.note" label="Note" type="text"></md-outlined-text-field>
            </div>

            <!-- CreatedTime -->
            <div>
                <md-icon>calendar_month</md-icon>
                <md-outlined-text-field v-model="task.createdDate" label="Created time" type="date"></md-outlined-text-field>
            </div>

            <!-- TargetTime -->
            <div>
                <md-icon>event</md-icon>
                <md-outlined-text-field v-model="task.targetDate" label="Target time" type="date"></md-outlined-text-field>
            </div>

            <!-- Tags -->
            <div>
                <md-icon>tag</md-icon>
                <div>
                    <md-outlined-text-field
                        label="Tags"
                        supportingText="Tags中每一个Tag使用逗号分隔"
                        type="text"
                        :value="task.tags"
                        @input="(e: InputEvent) => task.tags = (e.target as HTMLInputElement).value.split(/[,，]/)"
                    >
                    </md-outlined-text-field>
                    <ul class="flex items-center justify-start gap-2 flex-wrap">
                        <md-filled-field v-for="(e, index) in task.tags" :key="index">{{ e }}</md-filled-field>
                    </ul>
                </div>
            </div>

            <!-- Steps -->
            <div>
                <md-icon>checklist</md-icon>
                <div>
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
                </div>
            </div>
        </div>
    </PageWithBackLayout>
</template>

<script lang="ts" setup>
import { reactive, ref, watch } from 'vue'
import { useRouter } from 'vue-router'
import { Item, useStep } from '@/hooks/useItem'
import { useTaskStore } from '@/store/useTaskStore'
import PageWithBackLayout from '@/layouts/PageWithBackLayout.vue'

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
    task.steps.push(
        useStep({
            text: newStepValue.value
        })
    )
}

const updateStoreValue = (e: Item): Item => {
    if (e.index === task.index) {
        return {
            ...task
        }
    } else {
        return e
    }
}
watch(task, () => {
    store.tasks.normal = store.getNormal.map(updateStoreValue)
    store.tasks.focus = store.getFocus.map(updateStoreValue)
    /**
     * 没有给Recycle中的元素提供编辑功能
     */
    // store.tasks.recycle = store.getRecycle.map(updateStoreValue)
})
</script>

<style scoped lang="css">
.panel > div {
    @apply flex items-start gap-4;
}
.panel > div > md-icon {
    @apply mt-4;
}
</style>
