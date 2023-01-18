<script setup>

var flag = false

function dark() {
    if(!flag) {
        document.documentElement.classList.add('dark')
    } else {
        document.documentElement.classList.remove('dark')
    }

    flag = !flag
}
</script>

<template>
    <div>
        <button @click="dark()" class="flex-none border h-10 w-28 rounded-md bg-black text-white dark:bg-white dark:text-black">Dark Mode</button>
    </div>
</template>