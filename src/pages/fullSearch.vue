<script>

import edit from '../components/tasks/editTask.vue'
import task from '../components/tasks/task.vue'

import { mapActions, mapGetters } from 'vuex'
import { Transition, TransitionGroup } from 'vue'

export default {
    props: {
        keyWord: {
            required: true,
            type: String
        },
    },
    computed: {
        focusTasks() {
            return this.getAll.filter(p => p.text.indexOf(this.keyWord) !== -1)
        },

        ...mapGetters('tasksStore', ['getAll']),

    },
    methods: {
        ...mapActions('tasksStore', ['add', 'remove', 'done', 'undo', 'pin', 'unpin', 'edit']),
    },
    components: {
        edit,
        task,
    },
}
</script>

<template>


    <div class="panel">
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
            <div v-if="getAll.length == 0 || focusTasks.length == 0" class="flex flex-col items-end gap-2">
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
            <div v-if="focusTasks.length != 0" class="flex flex-col gap-2 items-end">
                <p class="inline-block">
                    Do you want to edit the last task: 
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

        <!-- Search results -->
        <!-- Tasks -->
        <TransitionGroup v-if="keyWord !== ''" name="list" tag="ul" class="flex flex-wrap gap-2 flex-col md:flex-row">
            <task 
                v-for="e in getAll" :key="e.id"
                :task="e"
                :hasRemove="true" :hasDone="true" :hasEdit="true" :hasPin="true" :showEdit="false">
            </task>
        </TransitionGroup>
        <Transition v-else name="list">
            <p>Try to put "Just a momoent, I do my work."</p>
        </Transition>
            
        <!-- 'No Result' if focusTasks is null -->
        <p v-if="focusTasks.length == 0" class="text-gray-400">No Result</p>
    </div>
    

</template>

<style scoped lang="css">
    button[type=normal] {
        @apply border;
    }
</style>