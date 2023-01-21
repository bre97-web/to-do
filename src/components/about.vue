<script>
export default {

}
</script>

<template>
    <div class="flex flex-col gap-4 text-right pl-5 pr-5">
        <a href="https://github.com/bre97-web/To-Do/actions"><p>Get the To-Do source code </p></a>
        <a href="https://github.com/bre97-web/To-Do/wiki"><p>How to use, Let's go to wiki</p></a>
    </div>

</template>

<style scoped lang="css">
    a {
        @apply underline text-blue-500 hover:text-blue-900;
        @apply dark:hover:text-blue-100;
    }
    * {
        transition: all 0.1s;
    }
</style>