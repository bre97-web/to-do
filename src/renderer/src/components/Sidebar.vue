<template>
    <div class="fixed hidden lg:block top-28 left-0 pl-4 w-44 h-96">
        <ul class="flex flex-col gap-4">
            <li>
                <section>
                    <h1 class="text-onBackground">Set a goal to do it</h1>
                    <p class="text-onBackground">Including some steps</p>
                </section>
                <footer class="action">
                    <md-outlined-button @click="router.push('/chooseGoal')">Create</md-outlined-button>
                </footer>
            </li>

            <li>
                <p class="italic text-onBackground">More features is coming.</p>
            </li>
        </ul>
    </div>
</template>

<script lang="ts" setup>
import { useRouter } from 'vue-router'

const router = useRouter()
</script>

<style scoped>
h1 {
    @apply font-medium text-base;
}

ul > li {
    @apply rounded-xl space-y-2 px-4 py-2 bg-gradient-to-br from-blue-50/25 to-blue-100/75 dark:to-blue-800/25;
}

ul > li h1 + p {
    @apply font-normal text-sm italic;
}

ul > li footer.action {
    @apply flex items-center justify-end;
}
</style>