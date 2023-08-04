import { FromCollection } from "@/hooks/useTask";
import { LitElement, TemplateResult, html } from "lit";
import { customElement, property } from "lit/decorators.js";

@customElement('lit-select-target-collection')
export default class extends LitElement {
    @property() collections = [] as FromCollection[]
    @property({attribute: 'setCurrentCollection'}) setCurrentCollection: any
    public override render(): TemplateResult<1> {
        return html`
            <md-outlined-select label="Collection">
                ${this.collections.map(e => html`
                    <md-select-option
                        @click=${() => this.setCurrentCollection(e)}
                        value=${e}
                        headline=${e}
                    ></md-select-option>
                `)}
            </md-outlined-select>
        `
    }
}