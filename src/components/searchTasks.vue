<script>

import roundedButton from './button/roundedButton.vue'
import Edit from './editTask.vue'
import Task from './task.vue'

export default {
    emits: ['add', 'remove', 'done', 'undo', 'edit'],
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
        }
    },
    data() {
        return {
            isModifying: false,
        }
    },
    computed: {
        focusTasks() {
            return this.tasks.filter(p => p.text.indexOf(this.keyWord) !== -1)
        },
    },
    methods: {
        add() {
            this.$emit('add', this.keyWord)
        },
        remove(e) {
            this.$emit('remove', e)
        },
        done(e) {
            this.$emit('done', e)
        },
        undo(e) {
            this.$emit('undo', e)
        },
        edit(e, task) {
            this.$emit('edit', e, task)
        },

    },
    components: {
        edit: Edit,
        roundedButton,
        task: Task,
    }
}
</script>

<template>

    <p v-if="forceVisible && keyWord === ''" class="panel font-bold text-2xl">
        You have not input
    </p>
    
    <div v-if="keyWord !== ''" class="panel">
        
        <!-- Title -->
        <p class="font-bold text-2xl">
            Search
            <mark class="underline">
                {{keyWord}}
            </mark>
        </p>

        <!-- Tasks -->
        <ul class="flex gap-2 flex-col">
            
            <!-- 'No Result' if focusTasks is null -->
            <p v-if="focusTasks.length == 0" class="text-gray-400">No Result</p>
    
            <!-- Suggests -->
            <div v-if="keyWord !== ''" class="flex gap-2 flex-col items-end justify-center pb-4 pl-4">
                
                <!-- Create suggests -->
                <div v-if="tasks.length == 0 || focusTasks.length == 0" class="flex flex-col items-end gap-2">
                    <p class="inline-block">
                        Do you want to create: 
                        <mark class="inline-block underline font-bold">
                            {{keyWord}}
                        </mark> 
                        ?
                    </p>
                    
                    <button @click="add" type="normal">
                        <p>Create</p>
                    </button>
                </div>
                
                <!-- Edit Suggests -->
                <div v-if="focusTasks.length <= 5 && focusTasks.length != 0" class="flex flex-col gap-2 items-end">
                    <p class="inline-block">
                        Do you want to edit: 
                        <mark class="inline-block underline font-bold">
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
                    <edit @apply="edit" :task="focusTasks[focusTasks.length - 1]" :class="{'hidden':!focusTasks[focusTasks.length - 1].isModifying}"></edit>
                </div>
            </div>
    
            <!-- Search results -->
            <!-- Tasks -->
            <task
                v-for="e in focusTasks"  :key="e.id"
                :task="e" @remove="remove" @edit="edit" @done="done"  @undo="undo"
                :hasRemove="true" :hasDone="true" :hasUndo="true" :hasEdit="true">
            </task>
            
        </ul>


    </div>

</template>

<style scoped lang="css">
    button[type=normal] {
        @apply border;
    }
</style>