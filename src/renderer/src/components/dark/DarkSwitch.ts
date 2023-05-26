import useTheme from '@/hooks/useTheme'
import { LitElement, html } from 'lit'

import '@material/web/switch/switch'

interface Switch {
    selected: boolean
}


const theme = useTheme()

class DarkSwitch extends LitElement {

    private selected = theme.getCurrent().isDark
    private setSelected(e: Event) {
        this.selected = (e.target as HTMLElement & Switch).selected
        
        theme.set({
            isDark: this.selected
        })
    }

    render() {
        return html`
            <md-switch
                selected=${this.selected}
                @click=${this.setSelected}
            ></md-switch>
        `
    }
}

window.customElements.define('lit-dark-switch', DarkSwitch)

export default DarkSwitch