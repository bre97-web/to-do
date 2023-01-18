<script>

import roundedButton from './button/roundedButton.vue'
import Edit from './editTask.vue'

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
        }
    },
        
    components: {
        edit: Edit,
        roundedButton,
    }

}
</script>

<template>
    <li class="border rounded-md flex flex-wrap gap-2 flex-row lg:flex-col items-center justify-start p-2">
        <div class="flex-grow flex flex-row gap-2 items-center justify-center lg:self-start">
            <!-- Done button -->
            <input type="radio" v-if="hasDone && !task.done" @click="done(task)" :name="task.id" value="1" class="flex-none w-5 h-5 border border-black">
            
            <!-- Tasks text -->
            <p class="flex-grow font-medium" :class="{'line-through':task.done}">
                {{task.text}}
            </p>
        </div>    
        
        <!-- Buttons -->
        <div class="flex-none flex gap-2 lg:self-start">
            <!--REMOVE-->
            <roundedButton v-if="hasRemove" @click="remove(task)" value="Remove" icon="delete_outline" type="risk"></roundedButton>
    
            <!-- Undo -->
            <roundedButton v-if="hasUndo" @click="undo(task)" value="Undo" icon="restore_outline" type="safe"></roundedButton>

            <!-- Let isModifying is true -->
            <roundedButton v-if="hasEdit" @click="task.isModifying = true" value="Edit" icon="info_outline" type="info"></roundedButton>
            
            <!-- EDIT Panel -->
            <edit @apply="edit" :task="task" :class="{'hidden':!task.isModifying}"></edit>
        </div> 
    </li>
</template>