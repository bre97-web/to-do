<template>
    <div class="relative w-full flex items-center justify-center">
        <i class="material-icons relative left-10">search</i>
        <input
            ref="inputRef"
            :value:="props.input"
            type="text"
            placeholder="Search"
            @input="
                (e: InputEvent) => {
                    return (payload: Event) => {
                        emits('setInput', e.data)
                        payload.preventDefault()
                    }
                }
            "
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
</script>
