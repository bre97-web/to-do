<template>
    <div class="fixedWindow top-0 left-0 w-full h-full bg-black/25">
        <div class="relative w-2/3 max-w-4xl mx-auto m-8 bg-white border shadow rounded-xl px-8 py-4">
            
            <!-- Back to /home -->
            <nav class="absolute right-4">
                <md-text-button 
                    @click="() => {
                        router.push('/home')
                    }"
                >
                    <md-icon slot="icon" class="material-icons">arrow_back</md-icon>
                    Back
                </md-text-button>
            </nav>

            <header>
                <h1>Goals</h1>
                <p></p>
            </header>

            <main class="my-8">
                <div class="flex ">
                    <Card>
                        <template #header>
                            <img src="pexels-susan-flores.jpg" alt="">
                        </template>
                        <template #content>
                            <h1>Test</h1>
                            <p>Test</p>
                        </template>
                    </Card>
                </div>
            </main>
        </div>
    </div>
</template>

<script lang="ts" setup>
import { useRouter } from 'vue-router'
import Card from './lib/Card.vue'

/**
 * 用于返回按钮，路由到/home
 */
const router = useRouter()
</script>
