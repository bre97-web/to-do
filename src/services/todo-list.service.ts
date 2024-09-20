import type { PartialDeep } from 'type-fest'
import { ref, type Ref } from 'vue'
import { makeUuid } from '../utils/uuid'

export interface ITodo {
    isCompleted: boolean
    isPinned: boolean
    data: ITodoData
}

export interface ITodoData {
    headline: string
    description: string
    steps: Iterable<ITodoStep>
    collectionName: string
    creationTimestamp: number
    uuid: string
}

export interface ITodoStep {
    headline: string
    isCompleted: boolean
}

export class TodoStepEntity implements ITodoStep {
    private _headline: string
    private _isCompleted: boolean

    constructor(params?: Partial<ITodoStep>) {
        this._headline = params?.headline ?? 'Untitled step'
        this._isCompleted = params?.isCompleted ?? false
    }

    public get headline(): string {
        return this._headline
    }
    public get isCompleted(): boolean {
        return this._isCompleted
    }
}

export class TodoStepsEntity implements Iterable<ITodoStep> {
    private stepsArray: Array<ITodoStep>

    constructor(stepArray: Array<ITodoStep>) {
        this.stepsArray = stepArray
    }

    [Symbol.iterator](): Iterator<ITodoStep, any, any> {
        let index = 0
        return ({
            next: (): IteratorResult<ITodoStep, undefined> => {
                if (index >= this.stepsArray.length) {
                    return ({
                        value: undefined,
                        done: true
                    })
                }
                return ({
                    value: this.stepsArray[index++],
                    done: false
                })
            },
            return: (): IteratorResult<ITodoStep> => {
                return ({
                    value: undefined,
                    done: true,
                })
            }
        })
    }

}

export class TodoEntity implements ITodo {
    public isCompleted: boolean
    public isPinned: boolean
    public data: ITodoData

    constructor(params?: PartialDeep<ITodo>) {
        this.isCompleted = params?.isCompleted ?? false
        this.isPinned = params?.isPinned ?? false
        this.data = {
            collectionName: 'All',
            creationTimestamp: new Date().getTime(),
            description: '',
            headline: 'Untitled',
            steps: new TodoStepsEntity([]),
            uuid: makeUuid(),
        }
        for (const prop of Object.entries(params?.data ?? {})) {
            // @ts-ignore
            this.data[prop[0]] = prop[1]
        }
    }
}

export interface ITodoService {
    create: (todo: ITodo) => void
    remove: (todo: ITodo) => void
    setCompleteField: (todo: ITodo, value: boolean) => void
    todos: Ref<Array<ITodo>>
}

export const TodoListServiceSymbol: unique symbol = Symbol('__todo-list')

export class TodoListService implements ITodoService {
    private readonly _todos: Ref<Array<ITodo>>

    constructor(todos?: Array<ITodo>) {
        this._todos = ref(todos ?? [])
        if (this.todos.value && this.todos.value.length === 0) {
            this.create(
                new TodoEntity({
                    data: {
                        headline: 'Example 1', collectionName: 'All',
                    }
                })
            )

        }
    }

    public create(todo: ITodo): void {
        this.todos.value.push(todo)
        this.saveChanges()
    }

    public setCompleteField(todo: ITodo, value: boolean): void {
        todo.isCompleted = value
        this.saveChanges()
    }

    public remove(todo: ITodo) {
        this.todos.value.splice(this.todos.value.findIndex(e => e === todo), 1)
        this.saveChanges()
    }
    public get todos(): Ref<Array<ITodo>> {
        return this._todos
    }

    private saveChanges() {
        localStorage.setItem(TodoListServiceSymbol.toString(), JSON.stringify(this._todos.value))
    }
    public static loadChanges() {
        return JSON.parse(localStorage.getItem(TodoListServiceSymbol.toString()) ?? '[]') as Array<ITodo> | undefined
    }
}
