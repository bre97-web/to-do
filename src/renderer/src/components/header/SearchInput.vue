<template>
    <div class="relative w-full flex items-center justify-center">
        <md-icon class="material-icons relative left-10 text-base">search</md-icon>
        <input
            ref="inputRef"
            :value:="props.input"
            type="text"
            placeholder="Search"
            @input="(payload: Event) => onInput(payload)"
        />
    </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue';

const inputRef = ref<HTMLInputElement>()

interface Props {
    input: string
}

const props = withDefaults(defineProps<Props>(), {
    input: () => ''
})
const emits = defineEmits(['setInput'])

const onInput = (e: Event) => {
    emits('setInput', (e.target as HTMLInputElement).value)
}
</script>
