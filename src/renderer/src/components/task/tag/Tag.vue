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

<script lang="ts" setup>
const props: any = defineProps({
    tag: {
        type: Array
    }
})
</script>
