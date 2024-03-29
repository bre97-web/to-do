<template>
    <md-list v-if="props.list.length !== 0">
        <md-list-item
            v-for="e in todosSorted"
            :key="e.id"
            :class="[e.compeleted && 'line-through grayscale-[0.75] opacity-75']"
        >
            <div slot="headline">{{ e.title }}</div>
            <div slot="supporting-text">{{ e.description }}</div>
            <md-checkbox
                slot="start"
                :checked="e.compeleted"
                @click="() => completeThisTodo(e)"
            ></md-checkbox>
            <md-ripple></md-ripple>

            <div slot="end">
                <md-icon-button @click="() => removeThisTodo(e)">
                    <md-icon>delete</md-icon>
                </md-icon-button>
            </div>
        </md-list-item>
        <md-divider></md-divider>
    </md-list>
    <div
        v-else
        class="my-32 grid place-items-center space-y-4"
    >

        <p class="italic on-surface-variant">All of this list has been completed</p>

        <md-filled-tonal-button
            v-if="props.removable"
            @click="removeThisCategory"
        >
            Delete
            <md-icon slot="icon">delete</md-icon>
        </md-filled-tonal-button>

    </div>
</template>

<script
    setup
    lang="ts"
>
import { ITodo } from '../../store/Todo'
import { TCategory } from '../../store/Category'
import { computed } from 'vue'

const props = defineProps<{
    list: Array<ITodo>
    removable: boolean
    category: TCategory
}>()
const emits = defineEmits<{
    removeThisCategory: [string],
    removeThisTodo: [ITodo]
    completeThisTodo: [ITodo]
}>()

const todosSorted = computed(() => {
    return props.list.sort((x, y) => x.compeleted ? 1 : -1).sort((x, y) => {
        return x.id - y.id
    })
})
const removeThisCategory = () => {
    emits('removeThisCategory', props.category)
}
const removeThisTodo = (item: ITodo) => {
    emits('removeThisTodo', item)
}
const completeThisTodo = (item: ITodo) => {
    emits('completeThisTodo', item)
}
</script>

<style scoped></style>
