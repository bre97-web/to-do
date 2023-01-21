<script>
export default {
    props: ['value', 'icon', 'type'],
}
</script>

<template>
    <button :type="type" class="flex flex-row items-center">
        <i class="material-icons flex-none self-center w-2 mr-4">{{icon}}</i> 
        <p class="hidden">{{ value }}</p>
    </button>
</template>