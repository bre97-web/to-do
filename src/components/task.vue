<script>

import roundedButton from './button/roundedButton.vue'
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
        ...mapActions(['remove', 'done', 'undo', 'pin', 'unpin']),    
    },
        
    components: {
        edit,
        roundedButton,
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
                <roundedButton v-if="hasRemove" @click="remove(task)" value="Remove" icon="delete_outline" type="risk"></roundedButton>
                
                <!-- Undo -->
                <roundedButton v-if="hasUndo" v-show="task.done" @click="undo(task)" :disabled="!task.done" value="Undo" icon="restore_outline" type="safe"></roundedButton>
                
                <!-- Let isModifying is true -->
                <roundedButton v-if="hasEdit" @click="task.isModifying = true" value="Edit" icon="info_outline" type="info"></roundedButton>
                
                <!-- Pin -->
                <roundedButton v-show="hasPin && !task.pin" @click="pin(task)" icon="favorite_outline" type="medium"></roundedButton>
                <roundedButton v-show="hasPin && task.pin" @click="unpin(task)" icon="favorite" type="love"></roundedButton>

                    
            </div> 
            
        </li>
        
        <!-- EDIT Panel -->
        <edit v-if="hasEdit && showEdit && task.isModifying" :task="task"></edit>
    </div>
</template>