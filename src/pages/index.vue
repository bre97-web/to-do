<template>
    <Product>

        <md-tabs
            class="tabs"
            ref="tabsRef"
        >
            <template v-for="tab of tabs">
                <md-primary-tab :data-collection-name="tab.label">{{ tab.label }}</md-primary-tab>
            </template>

            <CreateCollectionTab></CreateCollectionTab>
        </md-tabs>

        <div class="tab-panel">
            <template v-if="currentCollectionTodos.length !== 0">
                <md-list class="todo-list">
                    <md-list-item
                        class="todo-list-item"
                        v-for="todo in currentCollectionTodos"
                        :class="todo.isCompleted && 'completed'"
                        :key="todo.data.creationTimestamp"
                    >
                        <md-checkbox
                            slot="start"
                            @click="() => setCompleteField(todo)"
                            :checked="todo.isCompleted"
                        ></md-checkbox>
                        <span
                            slot="headline"
                            class="headline"
                        >{{ todo.data.headline }}</span>
                        <span
                            slot="supporting-text"
                            class="description"
                        >{{ todo.data.description }}</span>
                        <md-icon-button
                            slot="end"
                            @click="() => removeTodoItem(todo)"
                        >
                            <md-icon>delete</md-icon>
                        </md-icon-button>
                    </md-list-item>
                </md-list>
            </template>
            <template v-else-if="currentCollectionName !== 'All'">
                <div class="empty-alert">
                    <md-icon>done_all</md-icon>
                    <span class="title">All done.</span>

                    <md-text-button @click="removeCurrentTab">
                        Remove This Collection
                        <md-icon slot="icon">delete_forever</md-icon>
                    </md-text-button>
                </div>
            </template>
        </div>


        <span class="create-todo-fab">
            <CreateTodoFab></CreateTodoFab>
        </span>
    </Product>
</template>

<script setup lang="ts">
import type { MdPrimaryTab, MdTabs } from '@material/web/all'
import { computed, inject, onMounted, ref } from 'vue'
import CreateCollectionTab from '../components/create-collection/CreateCollectionTab.vue'
import CreateTodoFab from '../components/create-todo/CreateTodoFab.vue'
import Product from '../layouts/Product.vue'
import { TodoListServiceSymbol, type ITodo, type TodoListService } from '../services/todo-list.service'
import { TodoTabsServiceSymbol, type TodoTabsService } from '../services/todo-tabs.service'

const todoTabs = inject<TodoTabsService>(TodoTabsServiceSymbol)!
const todoList = inject<TodoListService>(TodoListServiceSymbol)!

const setCompleteField = (todo: ITodo) => {
    todoList.setCompleteField(todo, !todo.isCompleted)
}
const removeTodoItem = (todo: ITodo) => {
    todoList.remove(todo)
}
const removeCurrentTab = () => {
    const index = todoTabs.tabs.value.findIndex(e => e.label === currentCollectionName.value)
    todoTabs.remove({ label: currentCollectionName.value })
    currentCollectionName.value = index - 1 !== -1 && todoTabs.tabs.value.length >= 2 ? todoTabs.tabs.value[index - 1].label : todoTabs.tabs.value[0].label
}

const currentCollectionName = ref<string>('All')
const allTodos = computed(() => todoList.todos.value)
const currentCollectionTodos = computed(() => allTodos.value.filter(e => e.data.collectionName === currentCollectionName.value))

const tabs = computed(() => todoTabs.tabs.value)
const tabsRef = ref<MdTabs | null>(null)

onMounted(() => {
    tabsRef.value?.addEventListener('click', (event: Event) => {
        if ((event.target as MdPrimaryTab).getAttribute('is-tab')) {
            event.preventDefault()
        } else {
            currentCollectionName.value = (event.target as MdPrimaryTab).getAttribute('data-collection-name')!
        }
    })
})
</script>

<style scoped>
.todo-list {
    .todo-list-item {
        --md-checkbox-container-shape: 12px;
        --md-checkbox-container-size: 22px;
        --md-checkbox-icon-size: 22px;

        &.completed>:is(.headline, .description) {
            text-decoration: line-through;
        }
    }
}

.tabs {
    @media (max-width: 600px) {
        --md-primary-tab-container-color: var(--md-sys-color-surface-container);
    }
}

.create-todo-fab {
    z-index: 0;
    position: absolute;
    right: 28px;
    bottom: 28px;
}

.empty-alert {
    display: flex;
    flex-direction: column;

    align-items: center;
    justify-content: center;

    margin-top: 64px;

    &>md-icon {
        --md-icon-size: 128px;
        @apply text-primary;
    }

    &>.title {
        @apply text-on-surface text-title-medium text-center;
    }
}
</style>
