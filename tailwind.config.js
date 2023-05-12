/** @type {import('tailwindcss').Config} */
module.exports = {
    darkMode: 'class',
    content: [
        './src/components/**/*.{js,ts,jsx,tsx,mdx}',
        './src/app/**/*.{js,ts,jsx,tsx,mdx}'
    ],
    theme: {
        colors: {
            transparent: 'transparent',
            white: '#FFFFFF',
            black: '#000000',
            primary: '#7640F1',
            'dark-gray': '#252525',
            'light-gray': '#ECECEC'
        }
    },
    plugins: [require('@tailwindcss/typography')]
}
