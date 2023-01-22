<script>
export default {
    props: ['task'],
    /**
     * apply用于提交对prop task的修改
     */
    emits:['apply'],
    data() {
        return {
            id: this.task.id,
            text: this.task.text,
            date: this.task.date,
            done: this.task.done,
            pin: this.task.pin,
            default: this.task,
        }
    },

    methods: {
        /**
         * 执行'apply'事件
         */
        commit() {

            if(this.text == '' || this.text.length < 1) {
                return 
            }

            this.$emit('apply', this.task, {
                id:   this.id,
                text: this.text,
                date: this.date,
                done: this.done,
                pin:  this.pin,
                isModifying: false,
            })
        },
        /**
         * 取消所有操作，还原数据并执行'apply'事件
         */
        cancel() {
            this.id   = this.default.id
            this.text = this.default.text
            this.date = this.default.date
            this.done = this.default.done
            this.pin  = this.default.pin
            this.commit()
        }
    }
}
</script>

<template>


    <div>
        
        <!-- Mask-->
        <div class="noAnimation fixed top-0 left-0 bg-black w-screen h-screen opacity-25 z-30"></div>
        
        <!-- Dialog Window -->
        <dialog open class="fixed top-1 sm:top-20 lg:top-40 left-0 w-3/4 max-w-lg flex flex-col items-start justify-between gap-2 rounded-3xl shadow-xl pl-4 z-30 bg-white dark:bg-slate-800 text-black dark:text-white">
            
            <header class="">
                <p class="font-bold text-2xl">Task Editor</p>
            </header>

            <body class="overflow-y-scroll flex-grow">
                <table>
                    <tbody>                    
                        <tr>
                            <td>
                                <label>Text</label>
                            </td>
                            <td>
                                <input v-model="text" type="text" minlength="1" maxlength="999" class="border outline-none w-full h-10">
                            </td>
                        </tr>
    
                        
                        
                        <tr>
                            <td>
                                <label>Date</label>
                            </td>
                            <td>
                                <input v-model="date" type="date" class="border outline-none w-full h-10">
                            </td>
                        </tr>
                        
                        <tr>
                            <td>
                                <label>Done</label>
                            </td>
                            <td>
                                <input v-model="done" type="checkbox" name="done" class="block h-10 w-10">
                            </td>
                        </tr>

                        <tr>
                            <td>
                                <label>Pin</label>
                            </td>
                            <td>
                                <input v-model="pin" type="checkbox" name="pin" class="block h-10 w-10">
                            </td>
                        </tr>
                        
                        
                        
                        <!-- The TimeId can not change -->
                        <tr class="line-through">
                            <td>
                                <label class="text-gray-400">TimeId</label>
                            </td>
                            <td>
                                <input v-model="id" type="text" disabled class="border outline-none w-full h-10">
                            </td>
                        </tr>
                    </tbody>
                </table>
            </body>

            <footer class="flex-no self-end">
                <div class="flex gap-2 font-bold place-content-end">
                    <button @click="cancel" type="risk">Cancel</button>
                    <button @click="commit" type="safe">Apply</button>
                </div>
            </footer>
    
        </dialog>

    </div>
</template>

<style scoped lang="css">
 input {
    @apply rounded-md bg-gray-50 dark:bg-gray-700 dark:text-white dark:border-none;
 }

 .noAnimation {
    transition: none;
 }

</style>