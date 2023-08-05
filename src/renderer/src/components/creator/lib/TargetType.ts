/* eslint-disable indent */
import { Type } from '@/hooks/useTask'
import '@material/web/select/outlined-select'
import '@material/web/select/select-option'
import { LitElement, PropertyValueMap, html } from 'lit'
import { customElement, property, query } from 'lit/decorators.js'

@customElement('lit-target-type')
export default class TargetType extends LitElement {
    @property() type = 'task' as Type
    @property() setType: any

    private _setType(e: Type) {
        this.setType(e)
    }

    protected update(changedProperties: PropertyValueMap<any> | Map<PropertyKey, unknown>): void {
        super.update(changedProperties);
        
        (Array.from(this.element.children) as (HTMLElement & {value:string, selected: boolean})[]).map(e => {
            if(e.value === this.type) {
                e.selected = true
            }
        });
    }

    @query('#selector') element

    render() {
        return html`
            <md-outlined-select label="Type" id="selector">
                <md-select-option
                    selected
                    @click=${() => {
                        this._setType('task')
                    }}
                    value="task"
                    headline="Task"
                ></md-select-option>
                <md-select-option
                    @click=${() => {
                        this._setType('goal')
                    }}
                    value="goal"
                    headline="Goal"
                ></md-select-option>
                <md-select-option
                    @click=${() => {
                        this._setType('collection')
                    }}
                    value="collection"
                    headline="Collection"
                ></md-select-option>
            </md-outlined-select>
        `
    }
}
