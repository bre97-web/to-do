<template>
    <Product>

        <div class="bg-primary-container shape-large m-4 p-8">
            <h1 class="text-on-primary-container text-display-large font-black">Settings</h1>
        </div>

        <Accordions>
            <Accordion
                headline="Theme"
                description="Desc"
                :default-open="false"
            >
                <form
                    class="setting-form"
                    @input="themeFormChange"
                >

                    <label class="between">
                        <span class="title">Dark Mode</span>
                        <md-switch
                            name="is-dark"
                            :selected="theme.configuration.isDark"
                        ></md-switch>
                    </label>

                    <md-divider></md-divider>

                    <label class="col">
                        <span class="title">Variant</span>
                        <md-outlined-select
                            name="variant"
                            label="Variant"
                        >
                            <md-select-option
                                v-for="v of Object.entries(MaterialVariants)"
                                :value="v[1]"
                                :key="v[1]"
                            >{{ v[0] }}</md-select-option>
                        </md-outlined-select>
                    </label>

                    <md-divider></md-divider>

                    <label class="col">
                        <span class="title">Contrast Level</span>
                        <md-slider
                            name="contrast-level"
                            labeled
                            min="-1"
                            max="1"
                            step="0.5"
                            :value="theme.configuration.contrastLevel"
                        ></md-slider>
                    </label>

                    <label class="col">
                        <span class="title">Hue</span>
                        <md-slider
                            name="hue"
                            labeled
                            min="0"
                            max="360"
                            step="1"
                            :value="theme.configuration.hct.hue"
                        ></md-slider>
                    </label>
                    <label class="col">
                        <span class="title">Chroma</span>
                        <md-slider
                            name="chroma"
                            labeled
                            min="0"
                            max="150"
                            step="1"
                            :value="theme.configuration.hct.chroma"
                        ></md-slider>
                    </label>
                    <label class="col">
                        <span class="title">Tone</span>
                        <md-slider
                            name="tone"
                            labeled
                            min="0"
                            max="100"
                            step="1"
                            :value="theme.configuration.hct.tone"
                        ></md-slider>
                    </label>

                </form>
            </Accordion>

            <Accordion
                headline="Local Storage & Cache"
                description="Desc"
            >
                <form class="setting-form">
                    <div class="between">
                        <span class="title">Delete this website data</span>
                        <md-outlined-button @click="deleteWebsiteData">Clear</md-outlined-button>
                    </div>
                </form>
            </Accordion>

        </Accordions>
    </Product>
</template>

<script setup lang="ts">
import type { TMaterialVariant } from '@glare-labs/material-tokens-generator'
import type { MdOutlinedSelect, MdSlider, MdSwitch } from '@material/web/all'
import { inject } from 'vue'
import Accordion from '../components/accordion/Accordion.vue'
import Accordions from '../components/accordion/Accordions.vue'
import Product from '../layouts/Product.vue'
import { MaterialThemeConfigurationServiceSymbol, MaterialVariants, type MaterialThemeConfigurationService } from '../services/material-theme-configuration.service'

const theme = inject<MaterialThemeConfigurationService>(MaterialThemeConfigurationServiceSymbol)!
const themeFormChange = (e: Event) => {
    const target = e.target
    const name = (target as HTMLInputElement).getAttribute('name')

    if (name === 'is-dark') {
        theme.isDark = (target as MdSwitch).selected
    } else if (name === 'contrast-level') {
        theme.contrastLevel = (target as MdSlider).value!
    } else if (name === 'variant') {
        theme.variant = Number((target as MdOutlinedSelect).value) as TMaterialVariant
    } else if (name === 'hue') {
        theme.hct.hue = (target as MdSlider).value!
    } else if (name === 'chroma') {
        theme.hct.chroma = (target as MdSlider).value!
    } else if (name === 'tone') {
        theme.hct.tone = (target as MdSlider).value!
    }
}

const deleteWebsiteData = () => {
    localStorage.clear()
    sessionStorage.clear()
}
</script>

<style scoped>
.setting-form {
    display: flex;
    flex-direction: column;
    gap: 16px;

    @media (min-width: 1200px) {
        max-width: 1200px;
        margin: auto;
    }

    &>.between {
        display: flex;
        justify-content: space-between;
    }

    &>.col {
        display: flex;
        flex-direction: column;
        gap: 8px;
    }

    & .title {
        @apply text-label-large text-on-secondary-container;
    }
}
</style>
