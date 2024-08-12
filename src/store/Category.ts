import { Ref, ref } from "vue"

export type TCategory = string
export interface ICategories {
    get: () => Ref<Array<TCategory>>
    push: (e: TCategory) => void
    remove: (e: TCategory) => void
}

export const DefaultCategories = ['All', 'Important']

abstract class ACCategories implements ICategories {
    protected abstract categories: Ref<Array<TCategory>>
    public abstract get(): Ref<string[]>
    public abstract push(e: TCategory): void
    public abstract remove(e: TCategory): void
}

interface IRollableCategories {
    saveChanges: () => void
}
abstract class ACRollableCategories extends ACCategories implements IRollableCategories {
    protected abstract value: Array<TCategory>
    public abstract saveChanges(): void
}

class CCategories extends ACRollableCategories {
    protected categories: Ref<Array<TCategory>>
    protected value: Array<TCategory>

    public constructor() {
        super()
        let v = JSON.parse(localStorage.getItem('material-todo-categories') ?? JSON.stringify(['Important', 'All']))
        this.categories = ref(v)
        this.value = v
        if (!this.categories.value.includes('Important')) {
            this.push('Important')
        }
        if (!this.categories.value.includes('All')) {
            this.push('All')
        }
        this.saveToLocalStorage()
    }

    public get(): Ref<Array<TCategory>> {
        return this.categories
    }
    public push(e: string): void {
        if (DefaultCategories.includes(e)) return
        this.categories.value.push(e)
    }
    public remove(e: string): void {
        if (DefaultCategories.includes(e)) return
        this.categories.value.splice(this.categories.value.indexOf(e), 1)
    }

    public override saveChanges(): void {
        this.value = this.categories.value
    }

    public saveToLocalStorage() {
        localStorage.setItem('material-todo-categories', JSON.stringify(this.value))
    }
}

export class Categories extends CCategories {
    public constructor() {
        super()
    }
}
