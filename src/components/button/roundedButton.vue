<script>
export default {
    props: ['value', 'icon', 'type'],
}
</script>

<template>
    <button :type="type" class="flex flex-row items-center md:justify-start">
        <i class="material-icons flex-none self-center w-2 mr-4">{{icon}}</i> 
        <p class="hidden sm:block flex-shrink xl:hidden">{{ value }}</p>
    </button>
</template>