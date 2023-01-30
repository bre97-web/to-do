<script>

import edit from './editTask.vue'
import task from './task.vue'
import TaskPanel from './taskPanel.vue'

import { mapActions } from 'vuex'

export default {
    props: {
        tasks: {
            required: true
        },
        keyWord: {
            required: true,
            type: String
        },
        forceVisible: {
            required: false,
            type:Boolean,
            default: false,
        },
    },
    computed: {
        focusTasks() {
            return this.tasks.filter(p => p.text.indexOf(this.keyWord) !== -1)
        },
    },
    methods: {
        ...mapActions('tasksStore', ['add', 'remove', 'done', 'undo', 'pin', 'unpin', 'edit']),
    },
    components: {
        edit,
        task,
        TaskPanel
    }
}
</script>

<template>

    <div>
        <!-- Title when keyWord is null -->
        <p v-show="forceVisible && keyWord === ''" class="panel font-bold text-2xl">
            You have not input
        </p>

        <div v-if="keyWord !== ''" class="">
            
            <!-- Tasks -->
            <!-- Search results -->
            <TaskPanel :tasks="focusTasks" :forceVisible="true" :hasDone="true" :hasRemove="true" :hasPin="true" :hasUndo="true" :hasEdit="true">

                <template v-slot:title>
                    
                    
                    <!-- Title -->
                    <p class="font-bold text-2xl break-all">
                        Search
                        <mark class="underline">
                            {{keyWord}}
                        </mark>
                    </p>

                    <!-- Suggests -->
                    <div v-if="keyWord !== ''" class="flex gap-2 flex-col items-center self-end justify-center pb-4 pl-4">
                        
                        <!-- Create suggests -->
                        <div v-if="tasks.length == 0 || focusTasks.length == 0" class="flex flex-col items-end gap-2">
                            <p class="inline-block">
                                Do you want to create: 
                                <mark class="inline-block underline font-bold break-all">
                                    {{keyWord}}
                                </mark> 
                                ?
                            </p>
                            
                            <button @click="add(keyWord)" type="normal">
                                <p>Create</p>
                            </button>
                        </div>
                        
                        <!-- Edit Suggests -->
                        <div v-if="focusTasks.length <= 5 && focusTasks.length != 0" class="flex flex-col gap-2 items-end">
                            <p class="inline-block">
                                Do you want to edit: 
                                <mark class="inline-block underline font-bold break-all">
                                    {{focusTasks[focusTasks.length - 1].text}}
                                </mark> 
                                ?
                            </p>
                            <!-- Edit and remove -->
                            <div class="flex gap-2">
                                <button @click="focusTasks[focusTasks.length - 1].isModifying = true" type="normal">
                                    <p>Edit</p>
                                </button>
                                <button @click="remove(focusTasks[focusTasks.length - 1])" type="normal">
                                    <p>Delete</p>
                                </button>
                            </div>
                            
                        </div>

                    </div>
                </template>
                


                <!-- 'No Result' if focusTasks is null -->
                <template v-slot:alt>
                    <p v-if="focusTasks.length == 0" class="text-gray-400">No Result</p>
                </template>
            </TaskPanel>
        </div>
    </div>
    

</template>

<style scoped lang="css">
    button[type=normal] {
        @apply border;
    }
</style>