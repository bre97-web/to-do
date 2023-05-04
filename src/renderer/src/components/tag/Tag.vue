<template>
    <div>
        <ul>
            <li v-for="e in tags" class="list">
                {{ e[0] }}
                <ul class="list-inner-page tasks">
                    <li v-for="el in e[1]">
                        {{ el.title }}
                    </li>
                </ul>
            </li>
        </ul>
    </div>
</template>

<script lang="ts" setup>
import useTasks from '@/hooks/useTasks'
import { useTags } from '@/hooks/useTags'
import { Item } from '@/hooks/useList'

const tags: Map<string, Item[]> = useTags(useTasks().taskList.getValues())
</script>

<style scoped>
ul {
    @apply flex flex-row flex-wrap gap-2 font-bold;
}
</style>
