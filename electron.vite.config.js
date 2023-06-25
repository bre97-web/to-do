import { resolve } from 'path'
import { defineConfig, externalizeDepsPlugin } from 'electron-vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'

export default defineConfig({
    main: {
        plugins: [externalizeDepsPlugin()]
    },
    preload: {
        plugins: [externalizeDepsPlugin()]
    },
    renderer: {
        resolve: {
            alias: {
                '@': resolve('./src/renderer/src')
            }
        },
        plugins: [
            vue({
                template: {
                    compilerOptions: {
                        isCustomElement: (tag) =>
                            tag.startsWith('md') || tag.startsWith('lit') || tag.startsWith('ninja')
                    }
                }
            }),
            vueJsx()
        ],
        base: './',
        build: {
            outDir: './docs'
        }
    }
})
