<template>
    <div id="testDiv">
        <header class="text-center my-4 space-y-4">
            <md-icon class="material-icons  scale-[2]">waving_hand</md-icon>
            <h1 class="font-black text-4xl text-center">Welcome to the TestPage</h1>
            <md-divider></md-divider>
        </header>


        <div class="controller">
            <lit-dark-switch></lit-dark-switch>
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

        <div>
            <md-outlined-text-field
                label="Push to Focus Pinia Test"
                :value="input"
                @input="input = $event.target.value"
            ></md-outlined-text-field>
            <md-tonal-button @click="store.push({
                title: input,
                subtitle: '',
                tags: [],
                steps: [{
                text: '',
                done: false
                }],
                note: '',
                type: 'task'
                }, TASKS_TYPE.FOCUS)"
            >Push</md-tonal-button>

            <ul>
                <li><h1>Focus</h1></li>
                <li v-for="(e, index) in store.getFocus" :key="index">
                    {{ e }}
                    <md-text-button @click="store.remove(e, TASKS_TYPE.FOCUS)">Remove</md-text-button>
                    <md-text-button @click="store.move(e, TASKS_TYPE.FOCUS, TASKS_TYPE.RECYCLE)">Delete</md-text-button>
                </li>
            </ul>

            <ul>
                <li><h1>Normal</h1></li>
                <li v-for="(e, index) in store.getNormal" :key="index">
                    {{ e }}
                    <md-text-button @click="store.remove(e, TASKS_TYPE.NORMAL)">Remove</md-text-button>
                </li>
            </ul>

            <ul>
                <li><h1>Recycle</h1></li>
                <li v-for="(e, index) in store.getRecycle" :key="index">
                    {{ e }}
                    <md-text-button @click="store.remove(e, TASKS_TYPE.RECYCLE)">Remove</md-text-button>
                </li>
            </ul>
        </div>
    </div>
</template>

<script lang="tsx" setup>
import { ThemeColors } from '@/components/setting/lib/ThemeColors'
import '@/components/dark/DarkSwitch'

import '@material/web/checkbox/checkbox'
import '@material/web/radio/radio'
import '@material/web/switch/switch'
import '@material/web/button/text-button'
import '@material/web/button/elevated-button'
import '@material/web/button/outlined-button'
import '@material/web/button/tonal-button'
import '@material/web/button/filled-button'
import '@material/web/textfield/filled-text-field'
import '@material/web/textfield/outlined-text-field'
import '@material/web/dialog/dialog'
import '@material/web/list/list'
import '@material/web/list/list-item'
import '@material/web/divider/divider'
import '@material/web/iconbutton/standard-icon-button'
import '@material/web/navigationbar/navigation-bar'
import '@material/web/navigationtab/navigation-tab'
import '@material/web/fab/branded-fab'
import '@material/web/linearprogress/linear-progress'
import '@material/web/circularprogress/circular-progress'
import { ref, watch } from 'vue'
import { TASKS_TYPE, useTaskStore } from '@/store/index'


/**
 * Pinia Test
 */
const input = ref('')
const store = useTaskStore()

watch(store.tasks, () => {
    console.log(store.tasks);
    
})
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