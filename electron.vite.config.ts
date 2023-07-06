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
                        isCustomElement: (tag: string): boolean =>
                            tag.startsWith('md') || tag.startsWith('lit') || tag.startsWith('ninja') || tag.startsWith('lottie-player')
                    }
                }
            }),
            vueJsx({
                isCustomElement: (tag: string): boolean =>
                    tag.startsWith('md-') || tag.startsWith('lit')
            })
        ],
        root: './src/renderer/',
        base: '/',
        build: {
            outDir: './docs',
            emptyOutDir: true,
            assetsDir: 'assets',
            assetsInlineLimit: 4096,
            sourcemap: true,
            manifest: true,
            minify: 'esbuild',
            chunkSizeWarningLimit: 500
        }
    }
})
