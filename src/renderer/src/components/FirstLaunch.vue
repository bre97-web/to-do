<template>
    <div
        v-if="isFirstLaunch"
        ref="dialog"
        class="fixed min-h-screen w-full z-50 backdrop-blur-sm bg-black bg-opacity-25"
        :class="{ 'hidden ': !isFirstLaunch }"
    >
        <div
            class="space-y-4 md:space-y-8 lg:space-y-16 w-2/3 max-w-2xl mx-auto border mt-16 bg-background rounded-md px-4 md:px-8 lg:px-16 py-2 md:py-4 lg:py-8"
        >
            <header>
                <h1>Welcome to To-Do</h1>
            </header>
            <main class="space-y-4 md:space-y-8">
                <div
                    class="w-full mx-auto text-center font-black text-6xl flex flex-row items-center justify-center"
                >
                    <img class="w-1/3" src="@/assets/img/icon.png" alt="To-Do" />
                    <span
                        class="w-2/3 text-transparent bg-clip-text bg-gradient-to-br from-blue-300 to-blue-500"
                    >
                        To-Do
                    </span>
                </div>

                <p>welcome! Add your goals and use our To-Do to easily complete your tasks!</p>
                <p>
                    We very much welcome everyone to help us on GitHub, give us suggestions or
                    criticism. If you have time, you can visit our GitHub page
                    <a
                        class="text-blue-500"
                        target="_blank"
                        href="https://github.com/bre97-web/To-Do"
                    >
                        To-Do
                    </a>
                    .
                </p>
            </main>

            <footer class="flex flex-row items-center justify-end gap-2">
                <md-text-button @click="close">Hidden</md-text-button>
                <md-filled-button @click="submit">Read</md-filled-button>
            </footer>
        </div>
    </div>
</template>

<script lang="ts" setup>
import { ref, onBeforeMount, Ref } from 'vue'

var isFirstLaunch: Ref<boolean>
try {
    isFirstLaunch = ref<Ref<boolean>>(
        JSON.parse(localStorage.getItem('bre97-web-todo-firstLaunch') as string)
    )
} catch {
    // 'Please check your Applications Local Storage, We have been delete your invaild local storage.'

    localStorage.clear()

    location.reload()
}

onBeforeMount(() => {
    if (isFirstLaunch.value === undefined || isFirstLaunch.value === null) {
        isFirstLaunch.value = true
    }
})

const submit = () => {
    isFirstLaunch.value = false
    localStorage.setItem('bre97-web-todo-firstLaunch', JSON.stringify(isFirstLaunch.value))
}
const close = () => (isFirstLaunch.value = false)
</script>

<style scoped></style>
