import { EMaterialContrastLevel, type TMaterialContrastLevel, type TColor, EMaterialVariant, type TMaterialVariant } from "@glare-labs/material-tokens-generator";
import { defineStore } from "pinia";

export const useThemeStore = defineStore('todo-theme-store', {
    state: () => ({
        isDark: false,
        sourceColor: '#2A6B3C' as TColor,
        contrastLevel: EMaterialContrastLevel.Default as TMaterialContrastLevel,
        variant: EMaterialVariant.VIBRANT as TMaterialVariant,
    }),
    actions: {
        setIsDark(isDark: boolean) {
            this.isDark = isDark
        },
        setSourceColor(sourceColor: TColor) {
            this.sourceColor = sourceColor
        },
        setContrastLevel(contrastLevel: TMaterialContrastLevel) {
            this.contrastLevel = contrastLevel
        },
        setVariant(variant: TMaterialVariant) {
            this.variant = variant
        }
    },
    persist: true,
})
