<template>
    <PageLayout>
        <template v-if="tags.size !== 0 || tasks.getCustom.length !== 0">
            <PageContentLayout>
                <TagCollections></TagCollections>
                <CustomCollections></CustomCollections>
            </PageContentLayout>
        </template>
        <AllDone v-else></AllDone>
    </PageLayout>
</template>

<script setup lang="ts">
import AllDone from '@/components/AllDone.vue';
import CustomCollections from '@/components/CustomCollections.vue';
import TagCollections from '@/components/TagCollections.vue';
import { useTags } from '@/hooks/useTags';
import PageContentLayout from '@/layouts/PageContentLayout.vue';
import PageLayout from '@/layouts/PageLayout.vue';
import { useTaskStore } from '@/store/useTaskStore';

const tasks = useTaskStore()
const tags = useTags(tasks.getTasks)
</script>

<style scoped></style>
