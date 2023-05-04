<template>
    <div class="relative w-full flex items-center justify-center">
        <i class="material-icons relative left-10">search</i>
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
    emits('setInput', e.target === null ? '' : e.target.value)
}
</script>
