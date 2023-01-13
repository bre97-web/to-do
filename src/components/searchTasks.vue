<script>

import Edit from './editTask.vue'

export default {
    emits: ['add', 'remove', 'done', 'undo', 'edit'],
    data() {
        return {
            isModifying: false,
        }
    },
    props: {
        tasks: {
            required: true
        },
        keyWord: {
            required: true,
            type: String
        },
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
        edit(e, text) {
            this.isModifying = false,
            this.$emit('edit', e, text)
        },
        openEditor() {
            this.isModifying = true
        },
    },
    components: {
        edit: Edit
    }
}
</script>

<template>
    <ul v-if="keyWord !== ''" class="p-5 border rounded-xl shadow-sm flex flex-col gap-4 flex-wrap font-regular w-5/6 sm:rounded-xl lg:max-w-2xl mx-auto">    
        
        <p class="pt-2 pl-4 font-bold text-2xl">
            Search
            <mark class="underline">
                {{keyWord}}
            </mark>
        </p>

        
        <p v-if="focusTasks.length == 0" class="text-gray-500 pb-4 pl-4">No Result</p>


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
                
                <button @click="add" class="border w-20 h-10 rounded-md shadow hover:shadow-md active:shadow-xl">Create</button>
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
                <button @click="openEditor" class="border w-20 h-10 rounded-md shadow hover:shadow-md active:shadow-xl">Edit</button>
                <edit @apply="edit" :task="focusTasks[focusTasks.length - 1]" :modifying="isModifying" :class="{'hidden':!isModifying}"></edit>
            </div>
        </div>

        <!-- Search results -->
        <li v-for="e in focusTasks" :key="e.id" class="pb-4 pl-4">
            
            <div class="flex items-center gap-2">
                <input v-if="!e.done" type="radio" @click="done(e)" :name="e.id" value="1" class="flex-none w-5 h-5 border border-black">
                
                <p class="flex-grow font-medium" :class="{'line-through':e.done}">
                    {{e.text}}
                </p>
    
                <div class="flex-none flex gap-2">
                    <button @click="remove(e)" class="h-10 w-20 flex items-center justify-center rounded-full hover:bg-red-50 active:bg-red-500 active:text-white">Delete</button>
                    <button v-if="e.done" @click="undo(e)" class="h-10 w-20 flex items-center justify-center rounded-full hover:bg-blue-50 active:bg-blue-500 focus:ring active:text-white">Undo</button>
                </div>

            </div>
            
        </li>
        

    </ul>


</template>