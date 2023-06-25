/* eslint-disable indent */
import { Type } from '@/hooks/useItem'
import '@material/web/select/outlined-select'
import '@material/web/select/select-option'
import { LitElement, html } from 'lit'
import { customElement, property } from 'lit/decorators.js'

@customElement('lit-target-type')
export default class TargetType extends LitElement {
    @property() setType: any

    private _setType(e: Type) {
        this.setType(e)
    }

    render() {
        return html`
            <md-outlined-select label="Type">
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
            </md-outlined-select>
        `
    }
}
