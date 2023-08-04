<template>
    <div>
        <header>
            <h5>System</h5>
        </header>
        <main class="space-y-8 mt-8">
            <div>
                <subtitle1>移除本地数据</subtitle1>
                <overline class="italic text-gray-500">这可能需要手动刷新页面</overline>
                <md-tonal-button @click="clear">Reset</md-tonal-button>
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
