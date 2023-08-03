<template>
    <PageLayout>
        <div class="m-8 relative flex flex-col md:flex-row flex-wrap gap-2 md:items-start md:justify-evenly">
            <TagCollections></TagCollections>

            <CustomCollections></CustomCollections>
        </div>
        <AllDone></AllDone>
    </PageLayout>
</template>

<script setup lang="ts">
import AllDone from '@/components/AllDone.vue';
import CustomCollections from '@/components/CustomCollections.vue';
import TagCollections from '@/components/TagCollections.vue';
import PageLayout from '@/layouts/PageLayout.vue';

</script>

<style scoped></style>
