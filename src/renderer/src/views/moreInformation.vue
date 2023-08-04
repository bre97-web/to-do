<template>
    <PageWithBackLayout>
        <PageContentLayout>
        
            <!-- Title -->
            <!-- Subtitle-->
            <ContentWithDescriptionLayout>
                <template #desc>
                    <h3>Title</h3>
                    <subtitle1>The title should be concise and clear, it is displayed directly in the container.</subtitle1>
                </template>
                <template #default>
                    <InputWithIconLayout>
                        <template #icon>
                            <md-icon>title</md-icon>
                        </template>
                        <md-outlined-text-field v-model="task.title" label="Title" type="text"></md-outlined-text-field>
                    </InputWithIconLayout>
                    <InputWithIconLayout>
                        <template #icon>
                            <md-icon>subtitles</md-icon>
                        </template>
                        <md-outlined-text-field v-model="task.subtitle" label="Subtitle" type="text"></md-outlined-text-field>
                    </InputWithIconLayout>
                </template>
            </ContentWithDescriptionLayout>

            <md-divider></md-divider>

            <!-- Note  -->
            <ContentWithDescriptionLayout>
                <template #desc>
                    <h3>Note</h3>
                    <subtitle1>This attribute describes the details of this element.</subtitle1>
                </template>
                <InputWithIconLayout>
                    <template #icon>
                        <md-icon>description</md-icon>
                    </template>
                    <md-outlined-text-field v-model="task.note" label="Note" type="text"></md-outlined-text-field>
                </InputWithIconLayout>
            </ContentWithDescriptionLayout>

            <md-divider></md-divider>

            <!-- CreatedTime -->
            <!-- TargetTime -->
            <ContentWithDescriptionLayout>
                <template #desc>
                    <h3>Time</h3>
                    <subtitle1>The creation time is automatically generated and should not be modified in most cases. The target time is when this element is scheduled to be completed.</subtitle1>
                </template>
                <template #default>
                    <InputWithIconLayout>
                        <template #icon>
                            <md-icon>calendar_month</md-icon>
                        </template>
                        <md-outlined-text-field v-model="task.createdDate" label="Created time" type="date"></md-outlined-text-field>
                    </InputWithIconLayout>
                    <InputWithIconLayout>
                        <template #icon>
                            <md-icon>event</md-icon>
                        </template>
                        <md-outlined-text-field v-model="task.targetDate" label="Target time" type="date"></md-outlined-text-field>
                    </InputWithIconLayout>
                </template>
            </ContentWithDescriptionLayout>

            <md-divider></md-divider>

            <!-- Tags -->
            <ContentWithDescriptionLayout>
                <template #desc>
                    <h3>Tag</h3>
                    <subtitle1>tag is the tag of this element, each tag should be as simple as possible, and each tag is separated by a comma.</subtitle1>
                </template>
                <template #default>
                    <InputWithIconLayout>
                        <template #icon>
                            <md-icon>tag</md-icon>
                        </template>
                        <md-outlined-text-field
                            label="Tags"
                            supportingText="Tags中每一个Tag使用逗号分隔"
                            type="text"
                            :value="task.tags"
                            @input="(e: InputEvent) => task.tags = (e.target as HTMLInputElement).value.split(/[,，]/)"
                        ></md-outlined-text-field>
                    </InputWithIconLayout>
                    <ul class="flex items-center justify-start gap-2 flex-wrap">
                        <md-filled-field v-for="(e, index) in task.tags" :key="index">{{ e }}</md-filled-field>
                    </ul>
                </template>
            </ContentWithDescriptionLayout>

            <md-divider></md-divider>

            <!-- Steps -->
            <ContentWithDescriptionLayout>
                <template #desc>
                    <h3>Steps</h3>
                    <subtitle1>step contains the detailed steps of this element.</subtitle1>
                </template>
                <template #default>
                    <InputWithIconLayout>
                        <template #icon>
                            <md-icon>checklist</md-icon>
                        </template>
                        <div class="flex items-center gap-2">
                            <md-outlined-text-field
                            v-model="newStepValue"
                            label="Step"
                            ></md-outlined-text-field>
                            <md-standard-icon-button @click="createStep">
                                <md-icon>add</md-icon>
                            </md-standard-icon-button>
                        </div>
                    </InputWithIconLayout>

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
            </ContentWithDescriptionLayout>

        </PageContentLayout>

    </PageWithBackLayout>
</template>

<script lang="ts" setup>
import { reactive, ref, watch } from 'vue'
import { useRouter } from 'vue-router'
import { Task, useStep } from '@/hooks/useTask'
import { useTaskStore } from '@/store/useTaskStore'
import PageWithBackLayout from '@/layouts/PageWithBackLayout.vue'
import PageContentLayout from '@/layouts/PageContentLayout.vue'
import ContentWithDescriptionLayout from '@/layouts/ContentWithDescriptionLayout.vue'
import InputWithIconLayout from '@/layouts/InputWithIconLayout.vue'

const store = useTaskStore()

/**
 * 用于返回按钮，路由到/home
 */
const router = useRouter()

/**
 * 用于Info组件，用于修改元素
 */
const task = reactive<Task>(JSON.parse(router.currentRoute.value.query.task as string))

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

const updateStoreValue = (e: Task): Task => {
    if (e.index === task.index) {
        return {
            ...task
        }
    }
    return e
}

watch(task, () => {
    if(task.fromCollection !== undefined && task.fromCollection !== '') {
        store.custom = store.custom.map(e => {
            if(e.label === task.fromCollection) {
                e.items = e.items.map(updateStoreValue)
            }
            return e
        })
    } else {
        store.tasks = store.getAll.map(updateStoreValue)
    }
})
</script>

<style scoped lang="css">
</style>
