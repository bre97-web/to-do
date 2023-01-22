<script>

import roundedButton from './button/roundedButton.vue'
import Edit from './editTask.vue'

export default {
    emits: ['remove', 'done', 'undo', 'edit', 'pin', 'unpin'],
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
    },
    methods: {
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
        pin(e) {
            this.$emit('pin', e)
        },
        unpin(e) {
            this.$emit('unpin', e)
        },
    },
        
    components: {
        edit: Edit,
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
            <div class="flex-none flex gap-2 self-end">
                
                <!--REMOVE-->
                <roundedButton v-if="hasRemove" @click="remove(task)" value="Remove" icon="delete_outline" type="risk"></roundedButton>
                
                <!-- Undo -->
                <roundedButton v-if="hasUndo" @click="undo(task)" value="Undo" icon="restore_outline" type="safe"></roundedButton>
                
                <!-- Let isModifying is true -->
                <roundedButton v-if="hasEdit" @click="task.isModifying = true" value="Edit" icon="info_outline" type="info"></roundedButton>
                
                <!-- Pin -->
                <roundedButton v-if="!task.pin" @click="pin(task)" icon="favorite_outline" type="info"></roundedButton>
                <roundedButton v-else @click="unpin(task)" icon="favorite" type="info"></roundedButton>
                
            </div> 
            
        </li>
        
        <!-- EDIT Panel -->
        <edit v-if="hasEdit" @apply="edit" :task="task" :class="{'hidden':!task.isModifying}"></edit>
    </div>
</template>