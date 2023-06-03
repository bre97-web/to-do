import { Type } from '@/hooks/useList/lib/useItem'
import '@material/web/select/outlined-select'
import '@material/web/select/select-option'
import { LitElement, html } from 'lit'
import { customElement, property } from 'lit/decorators.js'


@customElement('lit-target-type')
export default class TargetType extends LitElement {

    @property() setType = (value: Type | null) => {}

    render() {
        return html`
            <md-outlined-select
                label="Type"
                required
            >
                <md-select-option @click=${() => {
                    this.setType('task')    
                }} value="task" headline="Task"></md-select-option>
                <md-select-option @click=${() => {
                    this.setType('goal')    
                }} value="goal" headline="Goal"></md-select-option>
            </md-outlined-select>
        `
    }
}
