<!-- eslint-disable vue/no-deprecated-slot-attribute -->
<template>
    <div class="flex flex-row gap-2">
        <header
            v-if="info.name.length !== 0"
            class="rounded-full border w-20 h-20 flex items-center justify-center bg-off-base"
        >
            <h1 class="text-4xl">{{ info.name[0] }}</h1>
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
            </div>

            <md-text-button slot="footer" label="Cancel" @click="cancel"></md-text-button>
            <md-filled-button slot="footer" label="OK" @click="submit"></md-filled-button>
        </md-dialog>
    </div>
</template>

<script lang="ts" setup>
import { ref, reactive } from 'vue'

/**
 * 关于打开与关闭dialog的操作和业务逻辑
 */
var dialogOpen: any = ref(false)
const info: any = reactive(
    JSON.parse(localStorage.getItem('bre97-web-todo-personal-info') as string) || {
        name: 'Click me to edit your info',
    }
)

const submit = () => {
    close()
    localStorage.setItem('bre97-web-todo-personal-info', JSON.stringify(info))
}
const cancel = () => {
    close()
    info.name = JSON.parse(localStorage.getItem('bre97-web-todo-personal-info') as string).name
}
const open = () => (dialogOpen.value = true)
const close = () => (dialogOpen.value = false)
</script>

<style scoped></style>
