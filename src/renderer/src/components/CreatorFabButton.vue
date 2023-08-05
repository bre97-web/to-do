<template>
    <div class="z-50">
        <md-fab v-show="AllowRouterList.includes(router.currentRoute.value.path)" lowered variant="primary" :label="props.label" @click="() => creatorDialog.open = true">
            <md-icon slot="icon" class="text-[var(--md-sys-color-on-primary)]">add</md-icon>
        </md-fab>
    </div>
</template>

<script setup lang="ts">
import { getCreatorFabAllowRouterList } from '@/scripts/navigation';
import { MDDialog } from '@/types/MDDialog';
import { useRouter } from 'vue-router';

const router = useRouter()
const AllowRouterList = getCreatorFabAllowRouterList()

const props = withDefaults(defineProps<{
    label?: string
}>(), {
    label: () => ''
})

const creatorDialog = document.querySelector('#creatorDialog') as MDDialog
</script>
