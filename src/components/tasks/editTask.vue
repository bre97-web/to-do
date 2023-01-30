<script>

import { mapActions } from 'vuex'

export default {
    props: {
        task: {
            required: true,
        },
    },
    data() {
        return {
            id: this.task.id,
            text: this.task.text,
            notes: this.task.notes,
            date: this.task.date,
            done: this.task.done,
            pin: this.task.pin,

            isShow: true,
        }
    },

    methods: {
        ...mapActions('tasksStore', ['edit']),

        /**
         * 执行edit。
         */
        commit() {
            this.isShow = false

            setTimeout(() => {
                this.edit({
                    e:this.task, 
                    task: {
                        id: this.id,
                        text: this.text,
                        notes: this.notes,
                        date: this.date,
                        done: this.done,
                        pin: this.pin,
                        isModifying: false,
                    }
                })
            }, 250)
            
        },
        /**
         * 取消所有操作，还原数据并执行edit。
         */
        cancel() {
            this.id   = this.task.id
            this.text = this.task.text
            this.notes = this.task.notes
            this.date = this.task.date
            this.done = this.task.done
            this.pin  = this.task.pin
            this.commit()
        }
    }
}
</script>

<template>


    <div>
        <!-- Mask-->
        <Transition name="mask" appear>
            <div v-show="isShow" class="bg-black opacity-50 noAnimation fixed top-0 left-0 w-screen h-screen z-30"></div>

        </Transition>

        <transition name="body" appear>
            <!-- Dialog Window -->
            <dialog open v-show="isShow" class="fixed top-40 left-0 w-3/4 max-w-lg flex flex-col items-start justify-between gap-2 rounded-3xl shadow-xl pl-4 z-30 bg-white dark:bg-slate-800 text-black dark:text-white">
                
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
                                    <label>Notes</label>
                                </td>
                                <td>
                                    <input v-model="notes" type="text" minlength="1" maxlength="999" class="border outline-none w-full h-10">
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


        </transition>

    </div>
</template>

<style scoped lang="css">
    input {
        @apply rounded-md bg-gray-50 dark:bg-gray-700 dark:text-white dark:border-none;
    }

    .noAnimation {
        transition: none;
    }

    .body-enter-active {
        animation: leadingBody 0.25s;
    }
    .body-leave-active {
        animation: leadingBody 0.25s reverse;
    }

    @keyframes leadingBody {
        0% {
            opacity: 0;
            top: 20%;
        } 25% {
            opacity: 0.25;
        }
        100% {
            opacity: 1;
        }
    }

    .mask-enter-active {
        animation: leadingMask 0.25s;
    }
    .mask-leave-active {
        animation: leadingMask 0.25s reverse;
    }

    @keyframes leadingMask {
        0% {
            opacity: 0;
        } 100% {
            opacity: 0.5;
        }
    }

</style>