<template>
    <div class="scroll">
        <div class="header header-part">
            <md-icon-button @click="router.back()">
                <md-icon>arrow_back</md-icon>
            </md-icon-button>
        </div>

        <div class="settings-set">
            <h1>Theme</h1>
            <div class="set">
                <p>Dark</p>
                <md-switch
                    :selected="theme.isDark"
                    @change="e => theme.setIsDark((e.target as MdSwitch).selected)"
                ></md-switch>
            </div>
            <md-divider></md-divider>

            <div class="set">
                <p>Contrast level</p>
                <md-slider
                    labeled
                    min="-1"
                    max="1"
                    step="0.1"
                    :value="theme.contrastLevel"
                    @input="e => theme.setContrastLevel((e.target as MdSlider).value!)"
                ></md-slider>
            </div>
            <md-divider></md-divider>

            <h1>Color</h1>
            <div class="set">
                <p>Source color</p>
                <div class="flex flex-col">
                    <md-slider
                        labeled
                        min="0"
                        max="255"
                        step="1"
                        :value="rgb[0]"
                        @input="e => {rgb[0] = ((e.target as MdSlider).value!)}"
                    ></md-slider>
                    <md-slider
                        labeled
                        min="0"
                        max="255"
                        step="1"
                        :value="rgb[1]"
                        @input="e => {rgb[1] = ((e.target as MdSlider).value!)}"
                    ></md-slider>
                    <md-slider
                        labeled
                        min="0"
                        max="255"
                        step="1"
                        :value="rgb[2]"
                        @input="e => {rgb[2] = ((e.target as MdSlider).value!)}"
                    ></md-slider>
                </div>
            </div>
            <md-divider></md-divider>

        </div>

    </div>
</template>

<script setup lang="ts">
import { type MdSlider, type MdSwitch } from '@material/web/all';
import { useThemeStore } from '../../store/useThemeStore';
import { computed, ref, watch } from 'vue';
import {type TColor} from '@glare-labs/material-tokens-generator/build/index'
import {useRouter} from 'vue-router'

const router = useRouter()
const theme = useThemeStore()

const rgb = ref([0, 0, 0])
const rgbString = computed<TColor>(() => `rgb(${rgb.value[0]}, ${rgb.value[1]}, ${rgb.value[2]})`)
watch(rgb.value, () => {
    theme.setSourceColor(rgbString.value)
})
</script>

<style scoped>
.scroll {
    @apply relative surface on-surface;
}
.header-part {
    @apply sticky top-0 surface-container-high z-50;
}

.header {
    @apply flex items-center p-2;
}
.settings-set {
    @apply flex flex-col w-full container mx-auto;
}

.settings-set > .set {
    @apply flex items-center py-2 px-4;
}
.settings-set > h1 {
    @apply font-bold text-2xl p-4;
}
.set > p {
    @apply flex-grow flex-shrink;
}

</style>