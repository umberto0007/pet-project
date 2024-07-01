module.exports = {
    content: ["./src/**/*.{js,jsx,ts,tsx}"],
    theme: {
        container: {
            center: true,
            padding: '1rem',
        },
        screens: {
            sm: "640px",
            md: "768px",
            lg: "1024px",
            xl: "1250px",
            "2xl": "1280px",
        },
        extend: {
            maxWidth: {
                '1440': '90rem'
            },
            fontFamily: {
                'roboto': ['Roboto', 'sans-serif']
            },
            spacing: {
                '754': '47rem',
            },
            colors: {
                'light-grey': '#dedede',
                'grey': '#454545'
            }
        },
    },
    plugins: [],
}
