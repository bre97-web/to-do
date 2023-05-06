<template>
    <md-dialog :open="isOpen">
        <div slot="header">
            <h1>Edit a task</h1>
        </div>

        <div class="flex flex-col gap-2">
            <md-filled-text-field
                :value="task.title"
                label="Title"
                @input="task.title = $event.target.value"
            ></md-filled-text-field>
            <md-filled-text-field
                :value="task.subtitle"
                label="Subtitle"
                @input="task.subtitle = $event.target.value"
            ></md-filled-text-field>
            <md-filled-text-field
                :value="task.tags.toString()"
                label="Tag"
                @input="task.tags = $event.target.value.split(',')"
            />
            <md-outlined-text-field
                type="date"
                :value="task.date"
                label="Created Date"
                @input="task.date = $event.target.value"
            ></md-outlined-text-field>
        </div>

        <md-text-button @click="cancel" slot="footer">Cancel</md-text-button>
        <md-filled-button @click="submit" slot="footer">Apply</md-filled-button>
    </md-dialog>
</template>

<script lang="ts" setup>
import { ref, reactive, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import type { Item } from '@/hooks/useList'
import { useTasks } from '@/hooks/useTasks'

const router = useRouter()

/**
 * 由路由时传递的query得到需要修改的useList的全局对象的具体的元素
 */
const task = reactive<Item>({
    ...JSON.parse(router.currentRoute.value.query.task as string)
})
var isOpen = ref<boolean>(false)
onMounted(() => {
    isOpen.value = true
})
const submit = () => {
    useTasks().get().taskList.edit(task, task)
    close()
}
const cancel = () => {
    close()
}
const close = () => {
    isOpen.value = false
    setTimeout(() => router.push('/'), 250)
}
</script>
