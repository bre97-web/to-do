<template>
    <md-outlined-text-field
        label="Name"
        type="text"
        :value="userStore.getName"
        @input="newName = $event.target.value"
    >
    </md-outlined-text-field>
</template>

<script setup lang="ts">
import { useUserStore } from '@/store/useUserStore'
import { ref, watch } from 'vue';

const userStore = useUserStore()

const newName = ref('')
watch(newName, () => {
    userStore.setName(newName.value)
})
</script>

<style scoped></style>
