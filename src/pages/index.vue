<template>
    <Header></Header>
    <DataProvider v-slot="{ categories }">
        <TodoTabs
            :categories="categories.get().value"
            @update-current-category="updateCurrentCategory"
            @create-category="(categoryName: string) => {
                categories.push(categoryName)
                categories.saveChanges()
                categories.saveToLocalStorage()
            }"
        ></TodoTabs>
        <TodoList
            :category="currentCategory" 
            :removable="!DefaultCategories.includes(currentCategory)" 
            :list="currentListItems"
            @remove-this-category="(name: string) => {
                categories.remove(name)
                categories.saveChanges()
                categories.saveToLocalStorage()
            }"
            @remove-this-todo="removeTodo"
            @complete-this-todo="(todo: ITodo) => {
                todo.compeleted = !todo.compeleted
                TodoManager.getInstance().saveChanges()
            }"
        ></TodoList>

        <CreateTodoFab
            class="right-8 fixed bottom-8"
            :categories="categories.get().value"
            :current-category="currentCategory"
            @create-todo="createTodo"
        ></CreateTodoFab>
    </DataProvider>
</template>

<script setup lang="ts">
import DataProvider from '../components/todo/DataProvider.vue';
import TodoTabs from '../components/todo/TodoTabs.vue';
import TodoList from '../components/todo/TodoList.vue';
import { computed, ref } from 'vue';
import {DefaultCategories} from '../store/Category'
import { ITodo, TodoManager } from '../store/Todo'
import CreateTodoFab from '../components/todo/CreateTodoFab.vue';
import { useTodo } from '../store/Todo';
import Header from '../components/header/Header.vue';


const currentCategory = ref<string>('All')
const updateCurrentCategory = (category: string) => {
    currentCategory.value = category
}

const currentListItems = computed(() => {
    if(currentCategory.value === 'All') {
        return TodoManager.getInstance().get().value
    }
    return TodoManager.getInstance().get().value.filter(e => e.category === currentCategory.value)
})

const createTodo = ({title, description, category}: { title: string, description: string, category: string}) => {
    TodoManager.getInstance().push(useTodo({
        title,
        description,
        category,
        compeleted: false,
    }))
    TodoManager.getInstance().saveChanges()
}
const removeTodo = (todo: ITodo) => {
    TodoManager.getInstance().remove(todo)
    TodoManager.getInstance().saveChanges()
}
</script>

<style scoped>

</style>
