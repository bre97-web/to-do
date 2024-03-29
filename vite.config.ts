import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [
        vue({
            template: {
                compilerOptions: {
                    isCustomElement: (tag: string): boolean =>
                        tag.startsWith('md') || tag.startsWith('lottie-player')
                }
            }
        }),
        vueJsx({
            isCustomElement: (tag: string): boolean =>
                tag.startsWith('md-') || tag.startsWith('lottie-player')
        })
    ],
    base: '/to-do',
    build: {
        outDir: './docs',
        emptyOutDir: true,
        assetsDir: 'assets',
        assetsInlineLimit: 4096,
        sourcemap: true,
        manifest: true,
    }
})
