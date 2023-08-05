<template>
    <PageLayout>
        <TextLayout>
            <TitleLarge>Theme</TitleLarge>
        </TextLayout>
        <PageContentLayout>
            <div>
                <LabelLarge>Dark mode</LabelLarge>
                <BodySmall class="italic text-gray-500">深色模式将会禁用部分效果。</BodySmall>
                <DarkSwitch></DarkSwitch>
            </div>

            <div>
                <LabelLarge>Primary color</LabelLarge>
                <ThemePicker></ThemePicker>
            </div>
        </PageContentLayout>
    </PageLayout>
</template>

<script setup lang="ts">
import DarkSwitch from '@/components/DarkSwitch.vue'
import ThemePicker from '@/components/ThemePicker.vue'
import PageContentLayout from '@/layouts/PageContentLayout.vue';
import PageLayout from '@/layouts/PageLayout.vue';
import TextLayout from '@/layouts/TextLayout.vue';
import TitleLarge from '@/typography/TitleLarge.vue';

</script>

<style scoped>
main > div > p {
    @apply mt-2;
}
</style>
