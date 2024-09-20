import { EMaterialContrastLevel, EMaterialVariant, MaterialTokens, type TMaterialContrastLevel, type TMaterialVariant } from '@glare-labs/material-tokens-generator'
import { Hct } from '@material/material-color-utilities'
import { defineComponent, type PropType, type SlotsType } from 'vue'

class MaterialThemeProviderComponent {
    private readonly props = {
        isDark: {
            type: Boolean as PropType<boolean>,
            default: false,
        },
        hctToInt: {
            type: Number as PropType<number>,
            default: 4278453252,
        },
        contrastLevel: {
            type: Number as PropType<number | TMaterialContrastLevel>,
            default: EMaterialContrastLevel.Default,
        },
        variant: {
            type: Number as PropType<number | TMaterialVariant>,
            default: EMaterialVariant.Content,
        },
    }

    private readonly slots = {} as SlotsType<{
        default: void
    }>

    public component = defineComponent({
        name: 'MaterialThemeProvider',
        props: this.props,
        slots: this.slots,
        methods: {
            createStyleElement() {
                if((this.$el as HTMLElement).querySelector('#material-theme-styles')) {
                    return
                }
                const styleElement = document.createElement('style')
                styleElement.setAttribute('id', 'material-theme-styles');
                (this.$el as HTMLElement).appendChild(styleElement)
            },
            createStyle() {
                const cssText = new MaterialTokens(Hct.fromInt(this.hctToInt), {
                    contrastLevel: this.contrastLevel,
                    isDark: this.isDark,
                    variant: this.variant as TMaterialVariant,
                }).getCssText();
                return cssText
            },
            setStyle(styleElement: HTMLElement, cssText: string) {
                styleElement.textContent = `.material-theme-provider-scoped, :root {${cssText}}`
            }
        },
        mounted() {
            this.createStyleElement()
            this.setStyle((this.$el as HTMLElement).querySelector('#material-theme-styles')!, this.createStyle())
        },
        updated() {
            this.createStyleElement()
            this.setStyle((this.$el as HTMLElement).querySelector('#material-theme-styles')!, this.createStyle())
        },
        render() {
            return (
                <div class="material-theme-provider-scoped">
                    {this.$slots['default'] && this.$slots.default()}
                </div>
            )
        }
    })
}

export const MaterialThemeProvider = new MaterialThemeProviderComponent().component
