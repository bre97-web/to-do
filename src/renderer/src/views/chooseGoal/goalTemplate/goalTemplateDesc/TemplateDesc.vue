<template>
    <div class="space-y-4">
        <h1 class="font-black text-4xl">{{ query.title }}</h1>

        <ul class="flex flex-col">
            <li v-for="e in query.goal" :key="e.id" class="my-2">
                <h1>{{ e.title }}</h1>
                <p>{{ e.description }}</p>
                <md-divider></md-divider>
            </li>
        </ul>
    </div>
</template>

<script lang="ts" setup>
import { reactive } from 'vue';
import { useRouter } from 'vue-router';

import '@material/web/divider/divider'


const router = useRouter()

const query = reactive({
    ...JSON.parse(router.currentRoute.value.query.value as string)
})
</script>
