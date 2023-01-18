<script>
export default {
    props: ['value', 'icon', 'type'],
}
</script>

<template>
    <button :type="type">
        <i class="material-icons w-5">{{icon}}</i> 
        <p class="hidden sm:block">{{ value }}</p>
    </button>
</template>