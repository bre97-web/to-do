<!-- eslint-disable vue/no-deprecated-slot-attribute -->
<template>
    <div class="flex flex-row">
        <header v-if="info.avatar_path.length !== 0">
            <img :src="info.avatar_path" alt="Avatar" />
        </header>

        <main class="flex flex-col">
            <p>Hello</p>
            <h1 class="underline underline-offset-1 hover:underline-offset-4" @click="open">
                {{ info.name }}
            </h1>
        </main>

        <md-dialog :open="dialogOpen">
            <div slot="header">
                <h1>Your Info</h1>
            </div>

            <div class="flex flex-col gap-2">
                <md-filled-text-field
                    label="Name"
                    type="text"
                    :value="info.name"
                    @input="info.name = $event.target.value"
                ></md-filled-text-field>
                <md-filled-text-field ref="img" type="file" label="Avatar"></md-filled-text-field>
            </div>

            <md-text-button slot="footer" label="Cancel" @click="cancel"></md-text-button>
            <md-filled-button slot="footer" label="OK" @click="submit"></md-filled-button>
        </md-dialog>
    </div>
</template>

<script setup>
import { ref, reactive, onMounted } from 'vue'

const img = ref()

/**
 * 关于打开与关闭dialog的操作和业务逻辑
 */
var dialogOpen = ref(false)
const info = reactive(
    JSON.parse(localStorage.getItem('bre97-web-todo-personal-info')) || {
        name: 'Click me to edit your info',
        avatar_path: '',
        avatar_file: ''
    }
)

const submit = () => {
    info.avatar_file = img.value.input.files[0]
    progress()
    close()
    localStorage.setItem('bre97-web-todo-personal-info', JSON.stringify(info))
}
const cancel = () => {
    close()
    info.name = JSON.parse(localStorage.getItem('bre97-web-todo-personal-info')).name
}
const open = () => (dialogOpen.value = true)
const close = () => (dialogOpen.value = false)

/**
 * 头像处理
 */
onMounted(() => {
    // progress()
})
const progress = () => {
    var reader = new FileReader()
    reader.readAsDataURL(info.avatar_file)
    reader.onload = () => (info.avatar_path = reader.result)
    // info.avatar_path = info.avatar_file
}
</script>

<style scoped></style>
