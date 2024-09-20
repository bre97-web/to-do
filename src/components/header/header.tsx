import { defineComponent, type PropType, type SlotsType } from 'vue'
import css from './header.module.css'

class HeaderComponent {
    private readonly props = {
        headline: {
            type: String as PropType<string>,
            required: true,
        },
    }

    private readonly slots = {} as SlotsType<{
        start: void
        end: void
    }>

    public readonly component = defineComponent({
        name: 'Header',
        props: this.props,
        slots: this.slots,
        render() {
            return (
                <header class={css.header}>
                    {
                        this.$slots['start'] && (
                            <span class={css.start}>
                                {this.$slots['start']()}
                            </span>
                        )
                    }

                    <span class={css.headline}>{ this.headline }</span>

                    {
                        this.$slots['end'] && (
                            <span class={css.end}>
                                {this.$slots['end']()}
                            </span>
                        )
                    }
                </header>
            )
        }
    })
}

export const Header = new HeaderComponent().component
