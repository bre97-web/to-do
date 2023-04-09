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

<script setup>
import useTasks from '@/hooks/useTasks'
import { ref } from 'vue'

/**
 * 读取taskList中的每一个Tag属性，将所有的Tag属性统计
 */
const tasks = useTasks().taskList
const tags = ref(new Map())

tasks.getValues().forEach(element => {
    element.tag.forEach(e => {
        if (!tags.value.has(e)) {
            tags.value.set(e, [element])
        } else {
            tags.value.set(e, [...tags.value.get(e), element])
        }
    })
});

console.log(tags.value);
</script>

<style scoped>
ul {
    @apply flex flex-row flex-wrap gap-2 font-bold;
}
</style>
