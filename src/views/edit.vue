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
            tmp: {
                id: this.task.id,
                text: this.task.text,
                notes: this.task.notes,
                date: this.task.date,
                done: this.task.done,
                pin: this.task.pin,
            },
        }
    },
    methods: {
        ...mapActions('TasksStore', ['edit']),

        /**
         * 执行edit。
         */
        commit() {
            setTimeout(() => {
                this.edit({e:this.task, task:this.tmp})
                this.close()
            }, 250)
            
            
        },
        /**
         * 取消所有操作，执行edit。
         */
        cancel() {
            this.close()
        },
        close() {
            this.$router.back()
        }
    }
}
</script>

<template>
    <div class="fixed left-0 top-0 w-full h-full z-50 bg-white dark:bg-gray-900">
        <transition name="body" appear>
            <!-- Dialog Window -->
            <dialog open class="w-full md:max-w-md lg:max-w-lg xl:max-w-xl flex flex-col items-start justify-between gap-2 bg-transparent text-black dark:text-white">
                
                <header>
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
                                    <input v-model="tmp.text" type="text" minlength="1" maxlength="999" class="border outline-none w-full h-10">
                                </td>
                            </tr>



                            <tr>
                                <td>
                                    <label>Notes</label>
                                </td>
                                <td>
                                    <input v-model="tmp.notes" type="text" minlength="1" maxlength="999" class="border outline-none w-full h-10">
                                </td>
                            </tr>
        
                            
                            
                            <tr>
                                <td>
                                    <label>Date</label>
                                </td>
                                <td>
                                    <input v-model="tmp.date" type="date" class="border outline-none w-full h-10">
                                </td>
                            </tr>
                            
                            <tr>
                                <td>
                                    <label>Done</label>
                                </td>
                                <td>
                                    <input v-model="tmp.done" type="checkbox" name="done" class="block h-10 w-10">
                                </td>
                            </tr>
    
                            <tr>
                                <td>
                                    <label>Pin</label>
                                </td>
                                <td>
                                    <input v-model="tmp.pin" type="checkbox" name="pin" class="block h-10 w-10">
                                </td>
                            </tr>
                            
                            
                            
                            <!-- The TimeId can not change -->
                            <tr class="line-through">
                                <td>
                                    <label class="text-gray-400">TimeId</label>
                                </td>
                                <td>
                                    <input v-model="tmp.id" type="text" disabled class="border outline-none w-full h-10">
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

    button {
        @apply rounded-full py-2 px-4 text-black dark:text-white;
    }
    button[type='risk'] {
        @apply hover:bg-red-500 dark:bg-red-900 bg-opacity-25;
    }
    button[type='safe'] {
        @apply hover:bg-green-500 dark:bg-green-900 bg-opacity-25;
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