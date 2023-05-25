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
import { ref, reactive, onMounted, watch } from 'vue'
import { useRouter } from 'vue-router'
import type { Item } from '@/hooks/useList/lib/useItem'
import '@material/web/button/text-button'
import '@material/web/button/filled-button'
import '@material/web/textfield/filled-text-field'
import '@material/web/textfield/outlined-text-field'
import '@material/web/dialog/dialog'
import { TasksInterface, useTaskStore } from '@/store'


const store = useTaskStore()


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
watch(store.tasks, () => {
    console.log(store.tasks);
    
})
const submit = () => {

    for(let index = 0; index < store.getFocus.length; index ++) {
        if(store.tasks.focus[index].index === task.index) {
            store.tasks.focus[index] = {
                ...task
            }
        }
    }
    for(let index = 0; index < store.getNormal.length; index ++) {
        if(store.tasks.normal[index].index === task.index) {
            store.tasks.normal[index] = {
                ...task
            }
        }
    }
    for(let index = 0; index < store.getRecycle.length; index ++) {
        if(store.tasks.recycle[index].index === task.index) {
            store.tasks.recycle[index] = {
                ...task
            }
        }
    }


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
