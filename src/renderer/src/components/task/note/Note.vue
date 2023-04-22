<template>
    <div>
        <div>
            <main>
                <p>{{ props.note }}</p>
            </main>
        </div>
    </div>
</template>

<script setup>

const props = defineProps({
    note: {
        type: String,
        required: true,
        default: ''
    }
})

console.log(props.note);
</script>

<style scoped></style>
