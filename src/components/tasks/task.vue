<script>

import edit from './editTask.vue'

import { mapActions } from 'vuex'

export default {
    props: {
        'task':{},
        'hasRemove': {
            type:Boolean,
            default: false,
        },
        'hasDone': {
            type:Boolean,
            default: false,
        },
        'hasUndo': {
            type:Boolean,
            default: false,
        },
        'hasEdit': {
            type:Boolean,
            default: false,
        },
        'hasPin': {
            type:Boolean,
            default: false,
        },
        'showEdit': {
            type:Boolean,
            default: true,
        },
    },
    methods: {
        ...mapActions('tasksStore', ['remove', 'done', 'undo', 'pin', 'unpin']),    
    },
        
    components: {
        edit,
    }

}
</script>

<template>
    <div>
        <li class="border rounded-md flex flex-wrap flex-row md:flex-col items-center justify-start p-2 pl-4">
            
            <div class="flex flex-row flex-shrink flex-grow items-center justify-start self-start gap-5 md:max-w-sm">
                
                <!-- Done button -->
                <input type="radio" v-if="hasDone && !task.done" @click="done(task)" :name="task.id" value="1" class="flex-none self-start mt-2 w-5 h-5 border border-black">
                
                
                <div class="flex flex-row gap-2 items-center justify-center text-ellipsis break-all">
                    
                    <!-- Tasks text and notes -->
                    <p class="flex-grow font-medium" :class="{'line-through':task.done}">
                        <strong>{{task.text}}</strong>
                        <p>{{task.notes}}</p>
                    </p>
                    
                </div>    

            </div>
            
            <!-- Buttons -->
            <div class="flex flex-wrap flex-shrink-0 gap-2 justify-center items-center md:self-end">
                
                <!--REMOVE-->
                <button v-if="hasRemove" @click="remove(task)" type="risk" class="flex flex-row items-center">
                    <i class="material-icons flex-none self-center w-2 mr-4">delete_outline</i> 
                    <p class="hidden">Remove</p>
                </button>

                <!-- Undo -->
                <button v-if="hasUndo" v-show="task.done" @click="undo(task)" :disabled="!task.done" type="safe" class="flex flex-row items-center">
                    <i class="material-icons flex-none self-center w-2 mr-4">restore_outline</i> 
                    <p class="hidden">Undo</p>
                </button>

                <!-- Let isModifying is true -->
                <button v-if="hasEdit" @click="task.isModifying = true" type="info" class="flex flex-row items-center">
                    <i class="material-icons flex-none self-center w-2 mr-4">info_outline</i> 
                    <p class="hidden">Edit</p>
                </button>

                <!-- Pin -->
                <button v-show="hasPin && !task.pin" @click="pin(task)" type="medium" class="flex flex-row items-center">
                    <i class="material-icons flex-none self-center w-2 mr-4">favorite_outline</i> 
                    <p class="hidden">Pin</p>
                </button>
                <button v-show="hasPin && task.pin" @click="unpin(task)" type="love" class="flex flex-row items-center">
                    <i class="material-icons flex-none self-center w-2 mr-4">favorite</i> 
                    <p class="hidden">Unpin</p>
                </button>
                    
            </div> 
            
        </li>
        
        <!-- EDIT Panel -->
        <edit v-if="hasEdit && showEdit && task.isModifying" :task="task"></edit>
    </div>
</template>