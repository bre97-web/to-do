<template>
    <div class="fixedWindow fullScreen">
        <div class="space-y-4">
            <header>
                <h1>{{ task.title }}</h1>
                <p>{{ task.subtitle }}</p>
            </header>

            <main class="space-y-2">
                <!-- Note组件本身是absolute的 -->
                <Note :note="task.note"></Note>
                <Date :date="task.date"></Date>
                <Tag :tag="task.tag"></Tag>
            </main>

            <nav class="backButton">
                <md-text-button
                    label="Back"
                    @click="
                        () => {
                            router.push('/home')
                        }
                    "
                ></md-text-button>
            </nav>
        </div>
    </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router'
import Note from '@/components/task/note/Note.vue'
import Date from '@/components/task/date/Date.vue'
import Tag  from '@/components/task/tag/Tag.vue'
import { Item } from '@/hooks/useList';


const router = useRouter()

const task = ref<Item>(JSON.parse(router.currentRoute.value.query.task as string))
</script>
