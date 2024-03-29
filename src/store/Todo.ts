import { Ref, ref } from "vue"
import { TCategory } from "./Category"
import { GenerateUuid } from "../utils/Uuid"
import { GetMilliseconds } from "../utils/Times"

export interface ITodo {
    title: string
    description: string
    category: string
    compeleted: boolean
    uuid: string
    id: number
}

class Todo implements ITodo {
    public title: string
    public description: string
    public category: TCategory
    public compeleted: boolean
    public uuid: string
    public id: number
    
    public constructor(
        options: Partial<ITodo>
    ) {
        this.title = options.title ?? 'untitled'
        this.description = options.description ?? ''
        this.category = options.category ?? 'Todo'
        this.compeleted = options.compeleted ?? false
        this.uuid = GenerateUuid()
        this.id = GetMilliseconds()
    }
}

export interface ITodoManager {
    get: () => Ref<Array<ITodo>>
    push: (e: ITodo) => void
    remove: (e: ITodo) => void
}

export class TodoManager implements ITodoManager {
    private static instance: null | TodoManager = null
    private todos: Ref<Array<ITodo>>
    
    private constructor() {
        let v = localStorage.getItem('material-todo-todos-manager')
        this.todos = ref(JSON.parse(v ?? JSON.stringify([])))
        if(v === null) {
            this.saveChanges()
        }
    }

    public static getInstance() {
        if(this.instance === null) {
            this.instance = new TodoManager()
        }

        return this.instance
    }

    public get() {
        return this.todos
    }
    public push(e: ITodo) {
        this.todos.value.push(e)
    }
    public remove(e: ITodo) {
        this.todos.value.splice(this.todos.value.indexOf(e), 1)
    }

    public saveChanges() {
        localStorage.setItem('material-todo-todos-manager', JSON.stringify(this.todos.value))
    }
}

export function useTodo(options: Partial<ITodo>): ITodo {
    return new Todo(options)
}