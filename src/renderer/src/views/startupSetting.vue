<template>
    <div class="overflow-auto grid place-content-center h-full w-full">

        <!-- background colors -->
        <div class="fixed top-0 right-0 w-screen h-screen blur-[128px] -z-50 overflow-clip">
            <img src="@/assets/resources/img/oobe-background.jpg" :class="{'invert': isDark}" class="opacity-50 w-full h-full noTransition">
        </div>

        <div class="transition h-full">
            <Transition mode="out-in">
                <!-- Animate -->
                <div v-if="isAnimated.pedding">
                    <lottie-player
                        src="https://assets8.lottiefiles.com/packages/lf20_zvKAYTsxBI.json"
                        background="transparent"
                        speed="1"
                        style="width: 300px; height: 300px;"
                        autoplay
                    ></lottie-player>
                </div>
                <!-- OOBE Context -->
                <div v-else class="p-2 md:p-4 m-4 max-w-3xl relative backdrop-blur-3xl rounded-md shadow-md bg-white dark:bg-black bg-opacity-50">
                    <div class="grid grid-cols-1 md:grid-cols-2 m-4 md:m-8">
                        <div class="mx-auto md:mx-0">
                            <template v-for="(e, index) in ContentList">
                                <lottie-player
                                    v-if="index === currentIndex"
                                    :key="index"
                                    :src="e.src"
                                    background="transparent"
                                    speed="1"
                                    style="width: 300px; height: 300px;"
                                    loop
                                    autoplay
                                >
                                </lottie-player>
                            </template>
                        </div>
                        <div class="flex flex-col justify-between gap-2">
                            <Content></Content>
                            <footer class="space-x-2 self-end">
                                <md-text-button :disabled="currentIndex === 0" @click="() => currentIndex--">Back</md-text-button>
                                <md-tonal-button v-if="currentIndex < ContentList.length - 1" @click="() => currentIndex++">Next</md-tonal-button>
                                <md-tonal-button v-else @click="allDone">Done</md-tonal-button>
                            </footer>
                        </div>
                    </div>
                </div>
            </Transition>
        </div>
    </div>
</template>

<script setup lang="tsx">
import DarkSwitch from '@/components/theme/DarkSwitch.vue'
import EditAccountName from '@/components/profile/EditAccountName.vue'
import ThemePicker from '@/components/theme/ThemePicker.vue'
import { useNotice } from '@/hooks/useNotice'
import useTheme from '@/hooks/useTheme'
import { computed, onMounted, reactive, ref } from 'vue'
import { useRouter } from 'vue-router';

const router = useRouter()
const allDone = () => {
    localStorage.setItem(
        "bre97-web-todo-firstLaunch",
        JSON.stringify(false)
    )
    router.push('/')
}

const isAnimated = reactive({
    pedding: true,
})
onMounted(() => {
    setTimeout(() => {
        isAnimated.pedding = false
    }, 3500)

    /**
     * Send a notify
     */
    useNotice({
        title: 'Welcome to To-Do',
    })
})

const currentIndex = ref<number>(0)
const ContentList = [
    {
        title: 'Welcome',
        descript: 'Add your goals and use our To-Do to easily complete your tasks!',
        src: 'https://assets8.lottiefiles.com/packages/lf20_qbab96r3.json',
        component: <p class="body-medium">We very much welcome everyone to help us on GitHub, give us suggestions or criticism. If you have time, you can visit our GitHub page To-Do.</p>
    },
    {
        title: 'Theme',
        descript: 'Set Dark mode',
        src: 'https://assets8.lottiefiles.com/packages/lf20_s8pbrcfw.json',
        component: <DarkSwitch></DarkSwitch>
    },
    {
        title: 'Theme',
        descript: 'Set primary colors',
        src: 'https://assets8.lottiefiles.com/packages/lf20_daeaejto.json',
        component: <ThemePicker></ThemePicker>
    },
    {
        title: 'Account',
        descript: 'Tell me your name',
        src: 'https://assets9.lottiefiles.com/packages/lf20_qip16iyy.json',
        component: <EditAccountName></EditAccountName>
    },
    {
        title: 'All done',
        descript: '',
        src: 'https://assets8.lottiefiles.com/packages/lf20_wols8vp7.json',
        component: <div></div>
    }
]
const Content = () => (
    <div class="space-y-4">
        <header>
            <p class="title-large">{ContentList[currentIndex.value].title}</p>
        </header>
        <div class="space-y-2">
            <p class="body-medium">{ContentList[currentIndex.value].descript}</p>
            <div>
                {ContentList[currentIndex.value].component}
            </div>
        </div>
    </div>
)

const isDark = computed(() => useTheme().getCurrent().isDark)
</script>

<style scoped>
.transition * {
    transition: all 1s cubic-bezier(.54, .01, .44, 1.01);
}
.v-enter-active,
.v-leave-active {
    transition: opacity 0.5s ease;
}

.v-enter-from,
.v-leave-to {
    opacity: 0;
}
</style>
