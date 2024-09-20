import { EMaterialContrastLevel, EMaterialVariant, type TMaterialContrastLevel, type TMaterialVariant } from '@glare-labs/material-tokens-generator'
import { Hct } from '@material/material-color-utilities'
import { reactive, type Reactive } from 'vue'

export interface IMaterialThemeConfigurationService {
    configuration: Reactive<{
        contrastLevel: TMaterialContrastLevel
        hct: Hct
        isDark: boolean
        variant: TMaterialVariant
    }>
    contrastLevel: TMaterialContrastLevel
    hct: Hct
    isDark: boolean
    variant: TMaterialVariant
}

export const MaterialThemeConfigurationServiceSymbol: unique symbol = Symbol('__material-theme-configuration')

export class MaterialThemeConfigurationService implements IMaterialThemeConfigurationService {
    public readonly configuration: Reactive<{
        contrastLevel: TMaterialContrastLevel
        hct: Hct
        isDark: boolean
        variant: TMaterialVariant
    }>

    constructor(configuration?: Partial<IMaterialThemeConfigurationService>) {
        this.configuration = reactive({
            contrastLevel: configuration?.contrastLevel ?? EMaterialContrastLevel.Default,
            hct: Hct.from(
                configuration?.hct?.hue ?? 10,
                configuration?.hct?.chroma ?? 50,
                configuration?.hct?.tone ?? 90
            ),
            isDark: configuration?.isDark ?? false,
            variant: configuration?.variant ?? EMaterialVariant.Content,
        })
    }

    public get contrastLevel(): TMaterialContrastLevel {
        return this.configuration.contrastLevel
    }
    public set contrastLevel(value: TMaterialContrastLevel) {
        this.configuration.contrastLevel = value
        this.saveChanges()
    }

    public get hct(): Hct {
        // @ts-ignore
        return this.configuration.hct
    }
    public set hct(value: Hct) {
        this.configuration.hct = value
        this.saveChanges()
    }

    public get isDark(): boolean {
        return this.configuration.isDark
    }
    public set isDark(value: boolean) {
        this.configuration.isDark = value
        this.saveChanges()
    }

    public get variant(): TMaterialVariant {
        return this.configuration.variant
    }
    public set variant(value: TMaterialVariant) {
        this.configuration.variant = value
        this.saveChanges()
    }

    private saveChanges() {
        localStorage.setItem(MaterialThemeConfigurationServiceSymbol.toString(), JSON.stringify(this.configuration))
    }
    public static loadChanges() {
        return JSON.parse(localStorage.getItem(MaterialThemeConfigurationServiceSymbol.toString()) ?? '{}') as Partial<IMaterialThemeConfigurationService> | undefined
    }
}

export const MaterialVariants = {
    Monochrome: 0,
    Neutral: 1,
    TonalSpot: 2,
    Vibrant: 3,
    Expressive: 4,
    Fidelity: 5,
    Content: 6,
    // Rainbow: 7,
    // FruitSalad: 8
}
