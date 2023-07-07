<template>
    <div class="flex flex-col gap-4 items-center justify-start">
        <div class="relative">
            <Avatar class="w-64 h-64 text-8xl"></Avatar>
            <div class="absolute right-5 bottom-5">
                <slot name="editAvatar"></slot>
            </div>
        </div>
        <div class="flex items-center gap-2">
            <UserName></UserName>
            <slot name="editName"></slot>
        </div>
    </div>
</template>

<script lang="ts" setup>
import UserName from './UserName.vue'
import Avatar from './Avatar.vue';
</script>
