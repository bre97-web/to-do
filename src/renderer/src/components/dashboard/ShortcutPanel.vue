<template>
    <PageLayout>
        <TextLayout>
            <TitleLarge>Shortcut</TitleLarge>
        </TextLayout>
        <PageContentLayout>
            <main>
                <div class="line">
                    <BodyMedium>Open Dashboard(Settings)</BodyMedium>
                    <BodyMedium>Alt + s</BodyMedium>
                </div>
                <div class="line">
                    <BodyMedium>Open Navigate</BodyMedium>
                    <BodyMedium>Ctrl + k</BodyMedium>
                </div>
                <div class="line">
                    <BodyMedium>Open Shortcut Map</BodyMedium>
                    <BodyMedium>Alt + m</BodyMedium>
                </div>
            </main>
        </PageContentLayout>
    </PageLayout>
</template>

<script setup lang="ts">
import PageContentLayout from '@/layouts/PageContentLayout.vue';
import PageLayout from '@/layouts/PageLayout.vue';
import TextLayout from '@/layouts/TextLayout.vue';
    
</script>

<style scoped>
div.line {
    @apply grid grid-cols-2 border gap-2 px-4 py-2;
}
</style>
