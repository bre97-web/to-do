/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ['./**/*.html', './src/**/*.{js,jsx,ts,tsx,vue}'],
    darkMode: 'class',
    theme: {
        fontWeight: {
            thin: '100',
            light: '300',
            normal: '400',
            medium: '500',
            bold: '700',
            black: '900'
        },
        extend: {
            backgroundColor: {
                base: 'var(--color-base)',
                'off-base': 'var(--color-off-base)',
                primary: 'var(--color-primary)',
                secondary: 'var(--color-secondary)',
                muted: 'var(--color-text-muted)'
            },
            textColor: {
                base: 'var(--color-text-base)',
                muted: 'var(--color-text-muted)',
                'muted-hover': 'var(--color-text-muted-hover)',
                primary: 'var(--color-primary)',
                secondary: 'var(--color-secondary)'
            }
        }
    },
    variants: {},
    plugins: []
}
