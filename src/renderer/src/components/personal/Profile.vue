<template>
    <div class="bg-background flex flex-row gap-2">
        <header
            v-if="userStore.getName.length !== 0"
            class="rounded-full border w-20 h-20 flex items-center justify-center"
        >
            <h1 class="text-onBackground text-4xl">{{ userStore.getName[0] }}</h1>
        </header>

        <main class="flex flex-col">
            <p>Hello</p>
            <h1
                class="text-onBackground underline underline-offset-1 hover:underline-offset-4"
                @click="open"
            >
                {{ userStore.getName }}
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
import { useUserStore } from '@/store/useUserStore'
import { ref } from 'vue'

const userStore = useUserStore()

/**
 * 关于打开与关闭dialog的操作和业务逻辑
 */
const dialogOpen = ref<boolean>(false)
const open = () => (dialogOpen.value = true)
const close = () => (dialogOpen.value = false)

const newName = ref<string>('')

const submit = () => {
    close()
    userStore.setName(newName.value)
}
const cancel = () => {
    close()
}
</script>
