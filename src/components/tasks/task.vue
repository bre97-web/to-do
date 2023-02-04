<script>
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
        ...mapActions('TasksStore', ['remove', 'done', 'undo', 'pin', 'unpin']),    
    },
}
</script>

<template>
    <li class="border rounded-md flex flex-wrap flex-row md:flex-col items-start px-4 py-2 hover:shadow-md">
        
        <div class="flex flex-row flex-grow items-center gap-4">
            
            <!-- Done button -->
            <input type="radio" v-if="hasDone && !task.done" @click="done(task)" :name="task.id" value="1" class="w-5 h-5 border border-black">
            
            <div class="flex flex-row gap-2 items-center justify-center text-ellipsis break-all">    
                <!-- Tasks text and notes -->
                <p class="flex-grow font-medium" :class="{'line-through':task.done}">
                    <strong>{{task.text}}</strong>
                    <p>{{task.notes}}</p>
                </p>                    
            </div>    

        </div>
        

        <!-- Buttons -->
        <div class="linkGroup">
            
            <!--REMOVE-->
            <button v-if="hasRemove" @click="remove(task)">
                <i class="material-icons">delete_outline</i> 
            </button>

            <!-- Undo -->
            <button v-if="hasUndo" @click="undo(task)">
                <i class="material-icons">restore</i> 
            </button>

            <!-- Edit route -->
            <router-link v-if="hasEdit" :to="{
                path: '/edit',
                query: {
                    task: JSON.stringify(this.task),
                },
            }" class="link">
                <i class="material-icons">info_outline</i> 
            </router-link>

            <!-- Pin -->
            <button v-show="hasPin && !task.pin" @click="pin(task)">
                <i class="material-icons">favorite_outline</i> 
            </button>
            <button v-show="hasPin && task.pin" @click="unpin(task)">
                <i class="material-icons">favorite</i> 
            </button>
                
        </div> 
    </li>
</template>

<style scoped lang="css">
    .linkGroup {
        @apply flex items-center justify-center gap-1 flex-wrap;
    }
    .linkGroup button,
    .linkGroup .link {
        @apply px-4 py-2 rounded-full hover:bg-gray-100 active:bg-gray-300 dark:hover:bg-gray-700 dark:active:bg-gray-500;
    }
    .linkGroup button i,
    .linkGroup .link i {
        @apply flex-grow flex items-center justify-center;
    }
</style>