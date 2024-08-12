import { ColorTokens, TypographyTokens, ElevationTokens, ShapeTokens } from '@glare-labs/tailwindcss-material-tokens/build/index'

/** @type {import('tailwindcss').Config} */
export default {
    content: [
        './index.html',
        './src/**/*.{jsx,tsx,vue}'
    ],
    theme: {
        fontWeight: {
            thin: '100',
            light: '300',
            normal: '400',
            medium: '500',
            bold: '700',
            black: '900'
        },
    },
    plugins: [
        ...ColorTokens.FullTokens,
        ...TypographyTokens.FullTokens,
        ...ElevationTokens.FullTokens,
        ...ShapeTokens.FullTokens,
    ],
}
