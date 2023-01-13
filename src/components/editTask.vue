<script>
export default {
    props: ['task', 'modifying'],
    data() {
        return {
            text: this.task.text,
        }
    },

    methods: {
        commit() {

            if(this.text == '' || this.text.length < 1) {
                return 
            }

            this.$emit('apply', this.task, this.text)
        },
        cancel() {
            this.text = this.task.text
            this.commit()
        }
    }
}
</script>

<template>

    <div :class="{'hidden':!modifying}">
        
        <div class="fixed top-0 left-0 bg-black w-screen h-screen opacity-25 z-30"></div>
        <dialog open class="fixed top-5 lg:top-40 left-0 w-3/4 max-w-lg rounded-3xl shadow-xl z-30">
    
            <p class="font-bold text-4xl p-3 pt-1">Task Editor</p>

            <table class="m-3 w-5/6 border-collapse lg:border-separate lg:border-spacing-3">
                <tbody>
                    <tr>
                        <td>
                            <label>TimeId</label>
                        </td>
                        <td>
                            <input v-model="this.task.id" type="text" minlength="1" maxlength="999" disabled class="border outline-none w-full h-10">
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <label>Text</label>
                        </td>
                        <td>
                            <input v-model="text" type="text" minlength="1" maxlength="999" class="border outline-none w-full h-10">
                        </td>
                    </tr>
                </tbody>
            </table>


    
            <div class="absolute bottom-5 right-5">
                <button @click="cancel" class="rounded-full w-20 h-10 hover:bg-purple-50 focus:ring active:bg-purple-100">Cancel</button>
                <button @click="commit" class="rounded-full w-20 h-10 hover:bg-purple-50 focus:ring active:bg-purple-100">Apply</button>
            </div>
        </dialog>

    </div>
</template>