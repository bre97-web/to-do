<script>
export default {
    props: ['task'],
    data() {
        return {
            id: this.task.id,
            text: this.task.text,
            date: this.task.date,
            done: this.task.done,
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

            this.task.isModifying = false

            this.$emit('apply', this.task, {
                id: this.id,
                text: this.text,
                date: this.date,
                done: this.done,
            })
        },
        /**
         * 取消所有操作，还原数据并执行'apply'事件
         */
        cancel() {
            this.id = this.default.id
            this.text = this.default.text
            this.date = this.default.date
            this.done = this.task.done
            this.commit()
        }
    }
}
</script>

<template>


    <div>
        
        <div class="noAnimation fixed top-0 left-0 bg-black w-screen h-screen opacity-25 z-30"></div>
        <dialog open class="fixed top-5 lg:top-40 left-0 w-3/4 max-w-lg rounded-3xl shadow-xl z-30 bg-white dark:bg-slate-800 text-black dark:text-white">
    
            <p class="font-bold text-4xl p-3 pt-1">Task Editor</p>

            <table class="m-3 mb-20 w-5/6 h-44">
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
                            <input v-model="done" type="checkbox" class="block h-10 w-10">
                        </td>
                    </tr>
                    
                    
                    
                    <!-- The TimeId can not change -->
                    <tr>
                        <td>
                            <label class="text-gray-400">TimeId</label>
                        </td>
                        <td>
                            <input v-model="id" type="text" disabled class="border outline-none w-full h-10">
                        </td>
                    </tr>
                </tbody>
            </table>


    
            <div class="absolute bottom-5 right-5 flex gap-2 font-bold">
                <button @click="cancel" type="risk">Cancel</button>
                <button @click="commit" type="safe">Apply</button>
            </div>
        </dialog>

    </div>
</template>

<style scoped lang="css">
    .noAnimation {
        transition: none;
    }


</style>