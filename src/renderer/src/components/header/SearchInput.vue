<template>
    <div class="relative w-full flex items-center justify-center">
        <i class="material-icons relative left-10">search</i>
        <input
            ref="inputRef"
            :value:="props.input"
            type="text"
            placeholder="Search"
            @input="update"
        />
    </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue';

const inputRef = ref()
const props = defineProps({
    input: {
        type: String,
        default: ''
    }
})
const emits = defineEmits(['setInput'])

const update = () => {
    emits('setInput', inputRef.value)
}
</script>
