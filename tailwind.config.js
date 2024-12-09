const plugin = require('tailwindcss/plugin');

module.exports = {
    content: ["./src/**/*.{js,jsx,ts,tsx}"],
    theme: {
        container: {
            center: true,
            padding: '1rem',
        },
        screens: {
            sm: '640px',
            md: '768px',
            lg: '1024px',
            xl: '1250px',
            '2xl': '1280px',
        },
        extend: {
            minWidth: {
                '496': '31rem',
                '640': '40rem'
            },
            maxWidth: {
                '496': '31rem',
                '640': '40rem',
                '1040': '65rem',
                '1440': '90rem'
            },
            minHeight: {
                '496': '31rem',
                '640': '40rem'
            },
            maxHeight: {
                '496': '31rem',
                '640': '40rem'
            },
            spacing: {
                '754': '47rem'
            },
            colors: {
                'light-grey-search': '#dedede',
                'grey': '#454545',
                'grey-hov': '#f6f6f6'
            },
            width: {
                '496': '31rem',
            },
            height: {
                '496': '31rem',
                '356': '22.25rem'
            },
        },
    },
    plugins: [
        plugin(function ({addVariant}) {
            addVariant('current', '&.active');
        }),
        require('tailwind-scrollbar-hide')
    ],
}
