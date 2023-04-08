<template>
    <div class="relative w-full flex items-center justify-center">
        <i class="material-icons relative left-10">search</i>
        <input
            :value:="props.input"
            type="text"
            placeholder="Search"
            @input="emits('setInput', $event.target.value)"
        />
    </div>
</template>

<script setup>
const props = defineProps({
    input: {
        type: String,
        default: ''
    }
})
const emits = defineEmits(['setInput'])
</script>
