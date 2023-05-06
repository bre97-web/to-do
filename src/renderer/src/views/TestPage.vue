<template>
    <div id="testDiv">

        <div class="controller relative">
            <Dark></Dark>
            <Theme></Theme>
        </div>

        <div class="contenter">
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
                    <i slot="icon" class="material-icons">group</i>
                </md-fab>
                
                <md-fab lowered>
                    <i slot="icon" class="material-icons">group</i>
                </md-fab>
                
                <md-branded-fab label="Test">
                    <i slot="icon" class="material-icons">group</i>
                </md-branded-fab>
                
                <md-branded-fab label="Test" lowered>
                    <i slot="icon" class="material-icons">group</i>
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
                        <md-icon data-variant="icon" class="material-icons" slot="start">group</md-icon>
                    </md-list-item>
                    <md-divider></md-divider>
                    
                    <md-list-item headline="Test">
                        <md-icon data-variant="icon" class="material-icons" slot="start">group</md-icon>
                        <md-icon data-variant="icon" class="material-icons" slot="end">group</md-icon>
                    </md-list-item>
                    <md-divider></md-divider>
                </md-list>
            </div>
            
            <div>
                <md-linear-progress progress="75"></md-linear-progress>
                <md-linear-progress indeterminate></md-linear-progress>
                <md-linear-progress indeterminate fourColors></md-linear-progress>
                <md-circular-progress progress="0.75"></md-circular-progress>
                <md-circular-progress indeterminate></md-circular-progress>
                <md-circular-progress indeterminate fourColor></md-circular-progress>
            </div>
            
            <div>
                <md-menu>
                    <md-menu-item header="Test"></md-menu-item>
                </md-menu>
            </div>
        </div>
    </div>
</template>

<script lang="ts" setup>
import Theme from '@/components/Theme.vue'
import Dark from '@/components/header/Dark.vue'

</script>

<style scoped>
#testDiv {
    @apply flex flex-row items-start justify-center min-h-screen w-full p-16 gap-16;
}
#testDiv > .controller {
    @apply max-w-xs;
}
#testDiv > .contenter {
    @apply flex flex-col gap-4 max-w-lg;
}
#testDiv > div > div {
    @apply flex flex-row gap-4 items-center justify-start flex-wrap;
}
</style>