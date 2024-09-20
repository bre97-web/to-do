<template>
    <!-- Create Todo -->
    <md-fab
        class="create-todo-fab"
        id="open-create-todo-dialog"
        ref="openCreateTodoDialogRef"
    >
        <md-icon slot="icon">add</md-icon>
    </md-fab>

    <!-- Create Todo Dialog -->
    <Teleport to="body">
        <md-dialog ref="createTodoDialogRef">
            <span slot="headline">Create todo</span>
            <form
                slot="content"
                method="dialog"
                id="create-todo-dialog"
            >
                <md-outlined-text-field
                    name="headline"
                    label="Title"
                ></md-outlined-text-field>
                <md-outlined-text-field
                    name="description"
                    label="Description"
                ></md-outlined-text-field>
                <md-outlined-select
                    name="collection-name"
                    label="Collection Name"
                >
                    <md-select-option
                        v-for="collection of tabs"
                        :aria-label="collection.label"
                        :value="collection.label"
                    >
                        <span slot="headline">{{ collection.label }}</span>
                    </md-select-option>
                </md-outlined-select>
                <label
                    name="is-pinned"
                    class="between"
                >
                    Pinned
                    <md-switch></md-switch>
                </label>
            </form>
            <div slot="actions">
                <md-text-button
                    form="create-todo-dialog"
                    value="cancel"
                >Cancel</md-text-button>
                <md-text-button
                    form="create-todo-dialog"
                    value="apply"
                >Apply</md-text-button>
            </div>
        </md-dialog>
    </Teleport>
</template>

<script setup lang="ts">
import type { MdDialog, MdFab, MdOutlinedSelect } from '@material/web/all'
import { computed, inject, onMounted, ref } from 'vue'
import { TodoEntity, TodoListServiceSymbol, type TodoListService } from '../../services/todo-list.service'
import { TodoTabsServiceSymbol, type TodoTabsService } from '../../services/todo-tabs.service'

const todoList = inject<TodoListService>(TodoListServiceSymbol)!
const todoTabs = inject<TodoTabsService>(TodoTabsServiceSymbol)!

const tabs = computed(() => todoTabs.tabs.value)

const createTodoDialogRef = ref<MdDialog | null>(null)
const openCreateTodoDialogRef = ref<MdFab | null>(null)

onMounted(() => {
    const select = (createTodoDialogRef.value?.querySelector('[name="collection-name"]') as MdOutlinedSelect)
    select.select('All')

    openCreateTodoDialogRef.value?.addEventListener('click', () => {
        createTodoDialogRef.value?.show()
    })
    createTodoDialogRef.value?.addEventListener('cancel', (e: Event) => {
        e.preventDefault()
    })
    createTodoDialogRef.value?.addEventListener('open', () => {
        const form = createTodoDialogRef.value?.querySelector('form')!
        form.reset()
    })
    createTodoDialogRef.value?.addEventListener('close', () => {
        const form = createTodoDialogRef.value?.querySelector('form')!
        if (createTodoDialogRef.value?.returnValue === 'apply') {
            const formData = {} as Record<'headline' | 'description' | 'collection-name' | 'is-pinned', any>
            for (const element of form.elements) {
                if (element.getAttribute('name')) {
                    (formData as Record<string, unknown>)[element.getAttribute('name')!] = (element as HTMLInputElement).value!
                }
            }
            todoList.create(new TodoEntity({
                isCompleted: false,
                isPinned: formData['is-pinned'],
                data: {
                    collectionName: formData['collection-name'],
                    description: formData.description,
                    headline: formData.headline
                }
            }))
        }
    })
})
</script>

<style scoped>
#create-todo-dialog {
    display: grid;
    grid-auto-columns: 1fr;
    grid-auto-rows: 64px;
    gap: 8px;

    &>.between {
        display: flex;
        justify-content: space-between;
    }
}
</style>
