<template>
    <div>
        {{ tasks.getCustom }}
            <md-filled-button @click="tasks.createCollection('test')">create</md-filled-button>
            <md-filled-button
                @click="tasks.insertToCollection('test', [
                    useItem({title: '1'})
                ])"
            >insert</md-filled-button>
    </div>
</template>

<script setup lang="ts">
import { useItem } from '@/hooks/useItem';
import { useTaskStore } from '@/store/useTaskStore';

const tasks = useTaskStore()

</script>

<style scoped>

</style>