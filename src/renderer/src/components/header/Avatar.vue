<template>
    <div
        class="flex-none rounded-full overflow-clip border w-10 h-10 flex items-center justify-center bg-off-base"
    >
        <h1>{{ info.name[0] }}</h1>
    </div>
</template>

<script setup>
import { reactive } from 'vue'
const info = reactive(
    JSON.parse(localStorage.getItem('bre97-web-todo-personal-info')) || {
        name: 'Click me to edit your info',
    }
)
</script>
