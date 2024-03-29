<template>
    <span class="z-50">
        <md-fab id="create-todo-fab" variant="primary" aria-label="Create a todo" label="Create" @click="handleClick">
            <md-icon slot="icon">add</md-icon>
        </md-fab>
        <md-dialog id="create-todo-dialog" @close="handleClose">
            <div slot="headline">Create Todo</div>
            <form method="dialog" slot="content" id="create-todo-dialog-form">
                <md-outlined-text-field id="create-todo-dialog-form-input-title" label="Title"></md-outlined-text-field>
                <md-outlined-text-field id="create-todo-dialog-form-input-description" label="Description"></md-outlined-text-field>
                
                <md-outlined-select id="create-todo-dialog-form-input-category" label="Category">
                    <md-select-option v-for="e in categories" :key="e" :value="e" :selected="props.currentCategory ===e">
                        <div slot="headline">{{ e }}</div>
                    </md-select-option>
                </md-outlined-select>
            </form>
            <div slot="actions">
                <md-text-button form="create-todo-dialog-form" value="cancle">Cancle</md-text-button>
                <md-text-button form="create-todo-dialog-form" value="apply">Apply</md-text-button>
            </div>
        </md-dialog>
    </span>
</template>

<script setup lang="ts">
import { TCategory } from '../../store/Category';
import type { MdDialog, MdOutlinedSelect, MdOutlinedTextField } from '@material/web/all';
import { IsEmptyString, IsSymbolOnly, IsWhitespaceOnly } from '../../utils/Strings';

const props = defineProps<{
    categories: Array<TCategory>
    currentCategory: TCategory
}>()
const emits = defineEmits<{
    'createTodo': [{ title: string, description: string, category: string}]
}>()

const handleClick = () => {
    requestToCreateTodo()
}
const requestToCreateTodo = () => {
    const dialog = document.getElementById('create-todo-dialog') as MdDialog
    dialog.show()
}

const handleClose = (e: Event) => {
    if (!requestToPushTodo()) {
        e.preventDefault()
    }
}
const requestToPushTodo = () => {
    const dialog = document.getElementById('create-todo-dialog') as MdDialog
    const title = document.getElementById('create-todo-dialog-form-input-title') as MdOutlinedTextField
    const description = document.getElementById('create-todo-dialog-form-input-description') as MdOutlinedTextField
    const categorySelect = document.getElementById('create-todo-dialog-form-input-category') as MdOutlinedSelect

    if (dialog.returnValue === 'apply') {
        if (IsEmptyString(title.value) || IsSymbolOnly(title.value) || IsWhitespaceOnly(title.value)) {
            title.error = true
            title.errorText = "The title must consist of letters or numbers, not all spaces, and all symbols."
            return false
        }
        emits('createTodo', {
            title: title.value,
            description: description.value,
            category: categorySelect.value
        })
    }
    title.error = false
    title.reset()
    description.reset()
    return true
}




</script>

<style scoped>
#create-todo-dialog-form {
    @apply flex flex-col gap-4;
}
</style>
