import { FromCollection } from "@/hooks/useTask";
import { LitElement, PropertyValueMap, TemplateResult, html } from "lit";
import { customElement, property, query } from "lit/decorators.js";

@customElement('lit-select-target-collection')
export default class extends LitElement {
    @property() collections = [] as FromCollection[]
    @property({attribute: 'setCurrentCollection'}) setCurrentCollection: any

    protected update(changedProperties: PropertyValueMap<any> | Map<PropertyKey, unknown>): void {
        super.update(changedProperties);

        this.element.children[0].selected = true
    }

    @query('#selector') element

    public override render(): TemplateResult<1> {
        return html`
            <md-outlined-select label="Collection" id="selector">
                <md-select-option disabled value="none" headline="processing (default)"></md-select-option>
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
