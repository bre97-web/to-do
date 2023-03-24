<template>
    <md-dialog :open="dialog.open.value">
        <div slot="header">
            <h1>
                Create a task
            </h1>
            <p>
                
            </p>
        </div>

        <div class="flex flex-col gap-2">
            <md-filled-text-field :value="task.title" @input="task.title = $event.target.value" label="Title"></md-filled-text-field>
            <md-filled-text-field :value="task.subtitle" @input="task.subtitle = $event.target.value" label="Subtitle"></md-filled-text-field>
        </div>

        <md-text-button @click="cancel" label="Cancel" slot="footer"></md-text-button>
        <md-filled-button @click="submit" label="OK" slot="footer"></md-filled-button>
    </md-dialog>
</template>

<script setup>
import {
    inject
} from 'vue'
import { 
    useList
} from '../hooks/useList'

const dialog = inject('createDialog')

const task = {
    title: '',
    subtitle: '',
}

/**
 * 将用户输入的信息推送到位于useList.js中的对象中，关闭对话框时清空输入数据
 */
const submit = () => {
    useList().push(task)
    clear()
    dialog.close()
}
const cancel = () => {
    clear()
    dialog.close()
}

const clear = () => {
    task.title = ''
    task.subtitle = ''
}

</script>

<style scoped>

</style>