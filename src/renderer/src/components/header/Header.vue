<template>
    <header class="topBar">
        <div class="px-4 py-2 flex flex-row items-center justify-between w-full gap-2">
            <!-- Web Title -->
            <Title></Title>

            <!-- Search input -->
            <SearchInput :input="props.input" @setInput="setInput"></SearchInput>

            <!-- Settings and other buttons -->
            <Setting></Setting>

            <!-- Users avatar-->
            <Avatar></Avatar>
        </div>
    </header>
</template>

<script lang="ts" setup>
import Title from '@/components/header/Title.vue'
import SearchInput from '@/components/header/SearchInput.vue'
import Setting from '@/components/header/Setting.vue'
import Avatar from '@/components/header/Avatar.vue'

interface Props {
    input: string
}

const props = withDefaults(defineProps<Props>(), {
    input: () => ''
})
const emits = defineEmits(['setInput'])
const setInput = (value: string) => emits('setInput', value)
</script>
