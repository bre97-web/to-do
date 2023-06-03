<template>
    <div>
        <header>
            <h1>System</h1>
        </header>
        <main class="space-y-8 mt-8">
            <div>
                <h1>移除本地数据</h1>
                <md-tonal-button @click="clear">Reset</md-tonal-button>
                <p class="italic text-gray-500">这可能需要手动刷新页面</p>
            </div>
        </main>
    </div>
</template>

<script setup lang="ts">
const clear = () => {
    localStorage.clear()
}
</script>

<style scoped>
main > div > p {
    @apply mt-2;
}
</style>