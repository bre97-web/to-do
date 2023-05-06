<template>
    <md-dialog :open="props.dialog.open">
        <div slot="header">
            <h1>Create a task</h1>
        </div>

        <div class="flex flex-col gap-2">
            <md-filled-text-field
                :value="task.title"
                label="Title"
                @input="task.title = $event.target.value"
            />
            <md-filled-text-field
                :value="task.subtitle"
                label="Subtitle"
                @input="task.subtitle = $event.target.value"
            />
            <md-filled-text-field
                :value="task.tags.toString()"
                label="Tag"
                @input="task.tags = $event.target.value.split(',')"
            />
            <md-filled-text-field
                :value="task.note"
                label="Note"
                @input="task.note = $event.target.value"
            />
        </div>

        <md-text-button @click="cancel" slot="footer">Cancel</md-text-button>
        <md-filled-button @click="submit" slot="footer">Apply</md-filled-button>
    </md-dialog>
</template>

<script lang="ts" setup>
import { Item, useList } from '@/hooks/useList'
import { reactive } from 'vue'

const props = defineProps(['dialog', 'closeDialog'])

/**
 * 将要创建的task信息
 */
const task = reactive<Item>({
    title: '',
    subtitle: '',
    tags: [''],
    note: ''
})

/**
 * 将用户输入的信息推送到位于useList.js中的对象中，关闭对话框时清空输入数据
 */
const submit = () => {
    useList().push(task)
    clear()
    props.closeDialog()
}
const cancel = () => {
    clear()
    props.closeDialog()
}

const clear = () => {
    task.title = ''
    task.subtitle = ''
    task.tags = ['']
    task.note = ''
}
</script>
