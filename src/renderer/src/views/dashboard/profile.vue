<template>
    <div>
        <header>
            <h1>Profile</h1>
        </header>
        <main class="space-y-8 mt-8 w-full">
            <div class="rounded-xl p-4 bg-[var(--md-sys-color-surface-container-low)]">
                <ProfileCard>
                    <template #editName>
                        <md-filled-tonal-icon-button @click="open">
                            <md-icon>edit</md-icon>
                        </md-filled-tonal-icon-button>
                    </template>
                    <template #editAvatar>
                        <md-filled-tonal-icon-button disabled>
                            <md-icon>edit</md-icon>
                        </md-filled-tonal-icon-button>
                    </template>
                </ProfileCard>
                <Teleport to="#app">
                    <md-dialog :open="dialogOpen" modeless draggable transition="grow">
                        <div slot="header">
                            <h1 slot="headline">Your Info</h1>
                        </div>

                        <div class="mt-2">
                            <EditAccountName></EditAccountName>
                        </div>

                        <md-text-button slot="footer" @click="cancel">Cancel</md-text-button>
                        <md-filled-button slot="footer" @click="submit">Apply</md-filled-button>
                    </md-dialog>
                </Teleport>
            </div>

        </main>
    </div>
</template>

<script setup lang="ts">
import EditAccountName from '@/components/EditAccountName.vue'
import ProfileCard from '@/components/ProfileCard.vue'
import { useUserStore } from '@/store/useUserStore'
import { ref } from 'vue'
const userStore = useUserStore()

/**
 * 关于打开与关闭dialog的操作和业务逻辑
 */
const dialogOpen = ref<boolean>(false)
const open = () => (dialogOpen.value = true)
const close = () => (dialogOpen.value = false)

const oldName = userStore.getName

const submit = () => {
    close()
}
const cancel = () => {
    userStore.setName(oldName)
    close()
}
</script>

<style scoped></style>