<script>

import roundedButton from './button/roundedButton.vue'
import edit from './editTask.vue'

import PubSub from 'pubsub-js'

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
    },
    methods: {
        done(e) {
            PubSub.publish('done', e)
        },
        undo(e) {
            PubSub.publish('undo', e)
        },
        remove(e) {
            PubSub.publish('remove', e)
        },
        pin(e) {
            PubSub.publish('pin', e)
        },
        unpin(e) {
            PubSub.publish('unpin', e)
        },
    },
        
    components: {
        edit,
        roundedButton,
    }

}
</script>

<template>
    <div>
        <li class="border rounded-md flex flex-wrap gap-2 flex-row md:flex-col items-center justify-start p-2">
            <div class="flex-grow flex flex-row gap-2 items-center justify-center md:self-start">
                <!-- Done button -->
                <input type="radio" v-if="hasDone && !task.done" @click="done(task)" :name="task.id" value="1" class="flex-none w-5 h-5 border border-black">
                
                <!-- Tasks text -->
                <p class="flex-grow font-medium" :class="{'line-through':task.done}">
                    {{task.text}}
                </p>
                
            </div>    
            
            <!-- Buttons -->
            <div class="flex flex-wrap gap-2 self-end">
                
                <!--REMOVE-->
                <roundedButton v-if="hasRemove" @click="remove(task)" value="Remove" icon="delete_outline" type="risk"></roundedButton>
                
                <!-- Undo -->
                <roundedButton v-if="hasUndo" @click="undo(task)" value="Undo" icon="restore_outline" type="safe"></roundedButton>
                
                <!-- Let isModifying is true -->
                <roundedButton v-if="hasEdit" @click="task.isModifying = true" value="Edit" icon="info_outline" type="info"></roundedButton>
                
                <!-- Pin -->
                <roundedButton v-show="hasPin && !task.pin" @click="pin(task)" icon="favorite_outline" type="medium" class=""></roundedButton>
                <roundedButton v-show="hasPin && task.pin" @click="unpin(task)" icon="favorite" type="love"></roundedButton>

                    
            </div> 
            
        </li>
        
        <!-- EDIT Panel -->
        <edit v-if="hasEdit && task.isModifying" :task="task"></edit>
    </div>
</template>