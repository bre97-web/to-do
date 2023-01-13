<script>
import tasks from './components/tasks.vue'
import now from './components/time.vue'

console.log(`
///////////           ///////
    //               //     //
   //       //\\     //     //   //\\
  //        \\//    ///////      \\//

`);

export default {
  components: {
    tasks,
    now
  }
}
</script>

<template>
  <now></now>
  <tasks></tasks>
</template>