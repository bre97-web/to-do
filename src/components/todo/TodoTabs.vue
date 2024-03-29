<template>
    <md-tabs
        style="--md-primary-tab-container-color: var(--md-sys-color-surface-container-high);" 
        @change="handleChange"
    >
        <md-primary-tab v-for="e in props.categories" :key="e">{{ e }}</md-primary-tab>
        
        <md-primary-tab inline-icon :isTab="false" @click="handleClick">
            Add
            <md-icon slot="icon">add</md-icon>

        </md-primary-tab>
        <md-dialog id="create-cateory-dialog" @close="handleClose">
            <div slot="headline">
                Add Catagory
            </div>
            <form method="dialog" slot="content" id="create-category-dialog-form">
                <md-outlined-text-field
                    id="create-category-dialog-form-input"
                    label="Catagory Name"
                ></md-outlined-text-field>
            </form>
            <div slot="actions">
                <md-text-button form="create-category-dialog-form" value="cancle">Cancle</md-text-button>
                <md-text-button form="create-category-dialog-form" value="apply">Apply</md-text-button>
            </div>
        </md-dialog>
    </md-tabs>
</template>

<script setup lang="ts">
import { TCategory } from '../../store/Category'
import type { MdDialog, MdOutlinedTextField, MdPrimaryTab, MdTabs } from '@material/web/all';
import { IsEmptyString, IsSymbolOnly, IsWhitespaceOnly } from '../../utils/Strings';

const props = defineProps<{
    categories: Array<TCategory>
}>()
const emits = defineEmits<{
    'updateCurrentCategory': [string]
    'createCategory': [string]
}>()

const handleChange = (e: Event) => {
    const dialog = document.getElementById('create-cateory-dialog') as MdDialog
    if(dialog.open) return
    const tabs = (e.target) as MdTabs
    emits('updateCurrentCategory', props.categories[tabs.activeTabIndex])
}

const handleClick = async () => {
    const dialog = document.getElementById('create-cateory-dialog') as MdDialog
    await dialog.show()
}

const handleClose = (e: Event) => {
    if(!requestToPushCategory()) {
        e.preventDefault()
    }
}
const requestToPushCategory = () => {
    const dialog = document.getElementById('create-cateory-dialog') as MdDialog
    const input = document.getElementById('create-category-dialog-form-input') as MdOutlinedTextField
    
    const isApplied = dialog.returnValue === 'apply'
    if(isApplied) {
        const category = input.value
        if(props.categories.includes(category)) {
            input.error = true
            input.errorText = "The category name cannot be the same as an existing name."
            return false
        } else if(IsEmptyString(category) || IsWhitespaceOnly(category) || IsSymbolOnly(category)) {
            input.error = true
            input.errorText = "The category name must consist of letters or numbers, not all spaces, and all symbols."
            return false
        } else {
            emits('createCategory', category)
        }
    }
    input.error = false
    input.reset()
    return true
}
</script>

<style scoped>

</style>