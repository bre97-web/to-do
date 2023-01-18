<script>
import tasks from './components/tasks.vue'
import now from './components/time.vue'
import about from './components/about.vue'

console.log(`
///////////           ///////
    //               //     //
   //       //\\     //     //   //\\
  //        \\//    ///////      \\//

`);

export default {
  data() {
    return {
      page: '0'
    }
  },
  components: {
    tasks,
    now,
    about,
  }
}
</script>

<template>
  <div class="flex w-full min-h-screen flex-col xl:flex-row items-center justify-between pb-20 xl:mt-16 dark:bg-gray-900 dark:text-white">
    <div class="xl:top-16 sticky self-start w-5/6 max-w-3xl mx-auto xl:mx-0 xl:w-64 pt-10 xl:pl-5 xl:pr-5">
      
      <!-- Time -->
      <now></now>
      
    </div>

    <div class="flex-grow flex-shrink w-full h-full xl:max-w-3xl">
      <tasks></tasks>

    </div>

    <div class="xl:top-16 sticky self-start w-64 pt-10 hidden xl:block">
      <about></about>
    </div>
  </div>
</template>

<style lang="css">
  ::-webkit-scrollbar {
    display: none;
  }

  .sticky {
    position: static;
  }
  @media (min-width:1280px) {
    .sticky {
      position: sticky;
    }
  }
</style>