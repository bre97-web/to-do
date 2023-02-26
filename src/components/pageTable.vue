<template>
    <!-- Nav Rail -->
    <div class="sticky top-16 w-full xl:max-w-xs">
        <!-- SideBar -->
        <nav class="flex gap-2 flex-row xl:flex-col px-4">
            <router-link :to="{
                path: '/'
            }" class="link" exact>Home</router-link>

            <router-link :to="{
                path: '/pin'
            }" class="link" exact>Pinned</router-link>

            <router-link :to="{
                path: '/done'
            }" class="link" exact>Done</router-link>

            <router-link :to="{
                path: '/search'
            }" class="link" exact>Search</router-link>

            <router-link :to="{
                path: '/helper'
            }" class="link" exact>Helper</router-link>
        </nav>

    </div>
</template>

<style scoped lang="css">
    .link {
        @apply relative border dark:border-0 rounded-md font-normal bg-gray-100 dark:bg-gray-800 py-1 w-full h-full overflow-hidden px-6;
    }
    .active {
        @apply bg-gray-200 dark:bg-gray-600 font-bold;
    }
    .active::before {
        content: '';
        animation: leadin 0.25s;
        @apply h-4 w-2 rounded-full bg-red-500 absolute flex left-2 top-2;
    }


    @keyframes leadin {
        from {
            @apply -left-4 opacity-0 scale-0;
        } to {
            @apply left-2 opacity-100 scale-100;
        }
    }
</style>