<template>
    <PageLayout>
        <TextLayout>
            <TitleLarge>System</TitleLarge>
        </TextLayout>
        <PageContentLayout>
            <div>
                <LabelLarge>移除本地数据</LabelLarge>
                <BodySmall class="italic text-gray-500">这可能需要手动刷新页面</BodySmall>
                <md-tonal-button @click="clear">Reset</md-tonal-button>
            </div>
        </PageContentLayout>
    </PageLayout>
</template>

<script setup lang="ts">
import { useNotice } from '@/hooks/useNotice';
import PageContentLayout from '@/layouts/PageContentLayout.vue';
import PageLayout from '@/layouts/PageLayout.vue';
import TextLayout from '@/layouts/TextLayout.vue';

const clear = () => {
    localStorage.clear()

    useNotice({
        title: 'The Local Storage has been deleted.',
        option: {
            body: 'Click me to reload.',
            handler: () => {
                location.reload()
            }
        }
    })
}
</script>

<style scoped>
main > div > p {
    @apply mt-2;
}
</style>
