<template>
    <div
        class="flex-none rounded-full overflow-clip border w-10 h-10 flex items-center justify-center bg-off-base"
    >
        <h1>{{ info.name[0] }}</h1>
    </div>
</template>

<script lang="ts" setup>
import { reactive } from 'vue'
const info: any = reactive(
    JSON.parse(localStorage.getItem('bre97-web-todo-personal-info') as string) || {
        name: 'Click me to edit your info',
    }
)
</script>
