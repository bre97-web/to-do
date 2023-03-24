<template>
    <md-dialog open="true">
        <div slot="header">
            <h1>
                Edit a task
            </h1>
            <p>
                
            </p>
        </div>

        <div class="flex flex-col gap-2">
            <md-filled-text-field :value="task.title" @input="task.title = $event.target.value" label="Title"></md-filled-text-field>
            <md-filled-text-field :value="task.subtitle" @input="task.subtitle = $event.target.value" label="Subtitle"></md-filled-text-field>
            <md-outlined-text-field type="date" :value="task.date" @input="task.date = $event.target.value" label="Created Date"></md-outlined-text-field>
        </div>

        <md-text-button @click="cancel" label="Cancel" slot="footer"></md-text-button>
        <md-filled-button @click="submit" label="OK" slot="footer"></md-filled-button>
    </md-dialog>
</template>

<script setup>
import {
    reactive
} from 'vue'
import {
    useRouter
} from 'vue-router'
import { 
    useList
} from '../hooks/useList'

const router = useRouter()

/**
 * 由路由时传递的query得到需要修改的useList的全局对象的具体的元素
 */
const props = defineProps(['task'])
const task = reactive({
    ...JSON.parse(props.task),
})
const submit = () => {
    useList().edit(task)
    close()
}
const cancel = () => {
    close()
}
const close = () => router.push('/')

</script>

<style scoped>

</style>