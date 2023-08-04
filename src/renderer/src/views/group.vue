<template>
    <PageLayout>
        <PageContentLayout>
                <TagCollections></TagCollections>
                
                <CustomCollections></CustomCollections>
        </PageContentLayout>
        <!-- <AllDone></AllDone> -->
    </PageLayout>
</template>

<script setup lang="ts">
import CustomCollections from '@/components/CustomCollections.vue';
import TagCollections from '@/components/TagCollections.vue';
import PageContentLayout from '@/layouts/PageContentLayout.vue';
import PageLayout from '@/layouts/PageLayout.vue';

</script>

<style scoped></style>
