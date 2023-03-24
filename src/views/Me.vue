<template>
    <div>
        <header>
            <div class="flex flex-col">
                <p>Hello</p>
                <h1 @click="open" class="underline underline-offset-1 hover:underline-offset-4">{{ info.name }}</h1>
            </div>
        </header>

        <main>
            <div>
                <header>
                    <h1>Tasks</h1>
                </header>
                <main>
                    <ul class="list">
                        <!-- <li>待办 {{ task.tasks.length }}</li>
                        <li>固定 {{ task.focus.length }}</li>
                        <li>完成 {{ task.bin.length }}</li> -->
                    </ul>
                </main>
            </div>
        </main>

        <md-dialog :open="dialogOpen">
            <div slot="header">
                <h1>Rename</h1>
            </div>

            <div class="flex flex-col gap-2">
                <md-filled-text-field :value="info.name" @input="info.name = $event.target.value" label="Name"></md-filled-text-field>
            </div>

            <md-text-button @click="cancel" label="Cancel" slot="footer"></md-text-button>
            <md-filled-button @click="submit" label="OK" slot="footer"></md-filled-button>
        </md-dialog>
    </div>
</template>

<script setup>
import {
    ref, reactive
} from 'vue'

var dialogOpen = ref(false)

const info = reactive(JSON.parse(localStorage.getItem('personal-info')) || {
    name: 'Click me to rename',
})
const submit = () => {
    localStorage.setItem('personal-info', JSON.stringify(info))
    close()
}
const cancel = () => {
    info.name = JSON.parse(localStorage.getItem('personal-info')).name
    close()
}
const open = () => dialogOpen.value = true
const close = () => dialogOpen.value = false


// const task = reactive({
//     tasks: JSON.parse(localStorage.getItem('tasks')),
//     focus: JSON.parse(localStorage.getItem('focus')),
//     bin  : JSON.parse(localStorage.getItem('bin')),
// })

</script>

<style scoped>

</style>