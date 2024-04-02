/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ['./src/**/*.{js,jsx,ts,tsx}'],
    theme: {
        extend: {
            colors: {
                loader: 'rgba(217, 217, 217, 0.50)',
                'half-white': 'rgba(255, 255, 255, 0.5)',
                'half-black': 'rgba(0, 0, 0, 0.5)',
            },
            backgroundImage: {
                highlight: 'var(--primary-highlight)',
            },
            backgroundColor: {
                mask: '#040942F2',
                'half-black': 'rgba(0, 0, 0, 0.5)',
                'quater-black': 'rgba(0, 0, 0, 0.25)',
                success: '#28A744',
                error: '#FC6D4B',
                info: '#26C6DA',
                warning: '#FECE31',
            },
            boxShadow: {
                '2x2': '2px 2px 4px 0px rgba(0, 0, 0, 0.25)',
            },
            fontSize: {
                small: 'var(--font-small)',
                base: 'var(--font-base)',
                medium: 'var(--font-medium)',
                large: 'var(--font-large)',
                header: 'var(--font-header)',
            },
            borderRadius: {
                inherit: 'inherit',
            },
            keyframes: {
                'light-zoom': {
                    '100%': { scale: '1.2 1', opacity: 1 },
                },
                'hand-scale': {
                    '100%': { scale: '1.2', opacity: 1 },
                },
                'logo-blur': {
                    '0%': { scale: '0.75', filter: 'blur(32px)' },
                    '100%': {
                        scale: '1',
                        filter: 'blur(0) drop-shadow(0 0 10px #26C6DA)',
                    },
                },
                'loading-bar': {
                    '0%': { width: '20%' },
                    '100%': { width: '100%' },
                },
                blink: {
                    '0%, 40%, 80%': {
                        'outline-color': 'var(--color)',
                        'box-shadow':
                            'inset 0 0 0.5rem 0.1rem var(--color), 0 0 0.5rem 0.1rem var(--color)',
                    },
                    '20%, 60%, 100%': {
                        'outline-color': 'transparent',
                        'box-shadow': 'none',
                    },
                },
                'toast-in': {
                    '0%': {
                        transform: 'translateX(100%)',
                    },
                    '50%, 75%': { transform: 'translateX(-10%)' },
                    '100%': {
                        transform: 'translateX(0%)',
                    },
                },
            },
            animation: {
                'light-zoom': 'light-zoom 3000ms ease-out forwards',
                'logo-blur': 'logo-blur 1000ms ease-out forwards',
                'hand-scale': 'hand-scale 3000ms ease-out forwards',
                'loading-bar': 'loading-bar 3000ms ease-in-out forwards',
                blink: 'blink 2400ms linear forwards',
                'toast-in': 'toast-in 300ms linear forwards',
            },
            transitionTimingFunction: {
                linear: 'linear',
            },
        },
    },
    plugins: [],
};
