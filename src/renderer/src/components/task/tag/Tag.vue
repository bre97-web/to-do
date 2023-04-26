<template>
    <div>
        <header>
            <h1>Tags</h1>
        </header>

        <main>
            <ul class="flex items-center justify-start gap-2 flex-wrap">
                <li v-for="(e, index) in props.tag" :key="index">
                    <p>{{ e }}</p>
                </li>
            </ul>
        </main>
    </div>
</template>

<script setup>
const props = defineProps({
    tag: {
        type: Array
    }
})
</script>
