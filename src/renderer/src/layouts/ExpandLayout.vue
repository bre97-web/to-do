<template>
    <div>
        <nav v-show="expand === 'less'" class="flex flex-col mt-2">
            <md-outlined-button @click="expand = 'more'">
                More
                <md-icon slot="icon">expand_more</md-icon>
            </md-outlined-button>
        </nav>

        <main v-show="expand === 'more'">
            <slot></slot>
        </main>

        <nav v-show="expand === 'more'" class="flex flex-col mt-2">
            <md-outlined-button @click="expand = 'less'">
                Less
                <md-icon slot="icon">expand_less</md-icon>
            </md-outlined-button>
        </nav>
    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';


type Expand = 'more' | 'less'

const expand = ref<Expand>('less')
</script>

<style scoped>

</style>