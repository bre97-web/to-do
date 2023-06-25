<template>
    <div class="bg-background flex flex-row gap-2">
        <header
            v-if="info.get().name.length !== 0"
            class="rounded-full border w-20 h-20 flex items-center justify-center"
        >
            <h1 class="text-onBackground text-4xl">{{ info.get().name[0] }}</h1>
        </header>

        <main class="flex flex-col">
            <p>Hello</p>
            <h1
                class="text-onBackground underline underline-offset-1 hover:underline-offset-4"
                @click="open"
            >
                {{ info.get().name }}
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
                    :value="newName"
                    @input="newName = $event.target.value"
                ></md-filled-text-field>
            </div>

            <md-text-button slot="footer" @click="cancel">Cancel</md-text-button>
            <md-filled-button slot="footer" @click="submit">Apply</md-filled-button>
        </md-dialog>
    </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import personal from '@/assets/js/personal'

import '@material/web/button/text-button'
import '@material/web/button/filled-button'
import '@material/web/textfield/filled-text-field'
import '@material/web/dialog/dialog'

/**
 * 关于打开与关闭dialog的操作和业务逻辑
 */
var dialogOpen = ref<boolean>(false)

const info = personal()
const newName = ref(info.get().name)

const submit = () => {
    close()
    info.set({
        name: newName.value
    })
}
const cancel = () => {
    close()
    newName.value = info.get().name
}
const open = () => (dialogOpen.value = true)
const close = () => (dialogOpen.value = false)
</script>
