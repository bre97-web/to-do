<template>
    <div id="testDiv">
        <header class="text-center my-4 space-y-4">
            <md-icon class="material-icons scale-[2]">waving_hand</md-icon>
            <h1 class="font-black text-4xl text-center">Welcome to the TestPage</h1>
            <md-divider></md-divider>
        </header>

        <div class="controller">
            <DarkSwitch></DarkSwitch>
            <ThemeColors></ThemeColors>
        </div>

        <div class="font">
            <p class="font-black">No one shall be subjected to arbitrary arrest.</p>
            <p class="font-bold">No one shall be subjected to arbitrary arrest.</p>
            <p class="font-medium">No one shall be subjected to arbitrary arrest.</p>
            <p class="font-normal">No one shall be subjected to arbitrary arrest.</p>
            <p class="font-light">No one shall be subjected to arbitrary arrest.</p>
            <p class="font-thin">No one shall be subjected to arbitrary arrest.</p>
            <p class="font-black">人人生而自由，在尊严和权利上一律平等。</p>
            <p class="font-bold">人人生而自由，在尊严和权利上一律平等。</p>
            <p class="font-medium">人人生而自由，在尊严和权利上一律平等。</p>
            <p class="font-normal">人人生而自由，在尊严和权利上一律平等。</p>
            <p class="font-light">人人生而自由，在尊严和权利上一律平等。</p>
            <p class="font-thin">人人生而自由，在尊严和权利上一律平等。</p>
        </div>

        <div class="md">
            <h1>Material Web Components Test Page</h1>
            <div>
                <md-filled-button>Test</md-filled-button>
                <md-outlined-button>Test</md-outlined-button>
                <md-elevated-button>Test</md-elevated-button>
                <md-text-button>Test</md-text-button>
                <md-tonal-button>Test</md-tonal-button>
            </div>

            <div>
                <md-fab>
                    <md-icon slot="icon">group</md-icon>
                </md-fab>

                <md-fab lowered>
                    <md-icon slot="icon">group</md-icon>
                </md-fab>

                <md-branded-fab label="Test">
                    <md-icon slot="icon">group</md-icon>
                </md-branded-fab>

                <md-branded-fab label="Test" lowered>
                    <md-icon slot="icon">group</md-icon>
                </md-branded-fab>
            </div>

            <div>
                <md-filled-text-field label="Test"></md-filled-text-field>
                <md-outlined-text-field label="Test"></md-outlined-text-field>
            </div>

            <div>
                <md-navigation-bar></md-navigation-bar>

                <md-navigation-bar>
                    <md-navigation-tab label="Test"></md-navigation-tab>
                    <md-navigation-tab label="Test"></md-navigation-tab>
                </md-navigation-bar>
            </div>

            <div>
                <md-switch></md-switch>
                <md-checkbox></md-checkbox>
                <md-radio></md-radio>
            </div>

            <div>
                <md-list>
                    <md-list-item headline="Test"></md-list-item>
                    <md-divider></md-divider>

                    <md-list-item headline="Test">
                        <md-icon slot="start">group</md-icon>
                    </md-list-item>
                    <md-divider></md-divider>

                    <md-list-item headline="Test">
                        <md-icon slot="start">group</md-icon>
                        <md-icon slot="end">group</md-icon>
                    </md-list-item>
                    <md-divider></md-divider>
                </md-list>
            </div>

            <div>
                <md-linear-progress progress="75"></md-linear-progress>
                <md-linear-progress indeterminate></md-linear-progress>
                <md-linear-progress indeterminate four-colors></md-linear-progress>
                <md-circular-progress progress="0.75"></md-circular-progress>
                <md-circular-progress indeterminate></md-circular-progress>
                <md-circular-progress indeterminate four-color></md-circular-progress>
            </div>

            <div>
                <md-menu>
                    <md-menu-item header="Test"></md-menu-item>
                </md-menu>
            </div>
        </div>
    </div>
</template>

<script lang="tsx" setup>
import { ThemeColors } from '@/components/setting/lib/ThemeColors'
import DarkSwitch from '@/components/dark/DarkSwitch.vue'
</script>

<style scoped>
#testDiv {
    @apply flex flex-col max-w-md mx-auto gap-8 mt-8;
}
#testDiv > div.controller {
    @apply max-w-xs relative;
}
#testDiv > div.font {
    @apply text-start;
}
#testDiv > div.md > div {
    @apply relative flex flex-row gap-2 items-start justify-start my-4;
}
</style>
