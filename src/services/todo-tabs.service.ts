import { ref, type Ref } from 'vue'

export interface ITodoTab {
    label: string
}

export interface ITodoTabsService {
    create: (tab: ITodoTab) => void
    remove: (tab: ITodoTab) => void
    tabs: Ref<Array<ITodoTab>>
}

export const TodoTabsServiceSymbol: unique symbol = Symbol('__todo-tabs')

export class TodoTabsService implements ITodoTabsService {
    private readonly _tabs: Ref<Array<ITodoTab>>

    constructor(tabs?: Array<ITodoTab>) {
        this._tabs = ref<Array<ITodoTab>>(tabs ?? [])

        if (this.tabs.value.length === 0) {
            this.tabs.value.push({
                label: 'All'
            })
            this.tabs.value.push({
                label: 'Pinned'
            })
        }
    }

    public create(tab: ITodoTab) {
        this.tabs.value.push(tab)
        this.saveChanges()
    }
    public remove(tab: ITodoTab) {
        this.tabs.value.splice(this.tabs.value.findIndex(e => e.label === tab.label), 1)
        this.saveChanges()
    }

    public get tabs(): Ref<ITodoTab[], ITodoTab[]> {
        return this._tabs
    }

    private saveChanges() {
        localStorage.setItem(TodoTabsServiceSymbol.toString(), JSON.stringify(this.tabs.value))
    }
    public static loadChanges() {
        return JSON.parse(localStorage.getItem(TodoTabsServiceSymbol.toString()) ?? '[]') as Array<ITodoTab> | undefined
    }
}
