/** @type {import('tailwindcss').Config} */
module.exports = {
    darkMode: ["class"],
    content: [
        "./app/**/*.{ts,tsx,js,jsx,mdx}",
        "./components/**/*.{ts,tsx,js,jsx,mdx}",
        "./lib/**/*.{ts,tsx,js,jsx,mdx}",
        "./app/globals.css"
    ],
    theme: {
        extend: {
            colors: {
                border: "hsl(var(--border))",
                input: "hsl(var(--input))",
                ring: "hsl(var(--ring))",
                background: "hsl(var(--background))",
                foreground: "hsl(var(--foreground))",
                primary: {
                    DEFAULT: "hsl(var(--primary))",
                    foreground: "hsl(var(--primary-foreground))",
                    100: "#F3E5F5",
                    200: "#E1BEE7",
                    300: "#CE93D8",
                    400: "#BA68C8",
                    500: "#AB47BC",
                    600: "#9C27B0",
                    700: "#7B1FA2",
                    800: "#6A1B9A",
                    900: "#4A148C",
                },
                secondary: {
                    DEFAULT: "hsl(var(--secondary))",
                    foreground: "hsl(var(--secondary-foreground))",
                },
                destructive: {
                    DEFAULT: "hsl(var(--destructive))",
                    foreground: "hsl(var(--destructive-foreground))",
                },
                muted: {
                    DEFAULT: "hsl(var(--muted))",
                    foreground: "hsl(var(--muted-foreground))",
                },
                accent: {
                    DEFAULT: "hsl(var(--accent))",
                    foreground: "hsl(var(--accent-foreground))",
                },
                popover: {
                    DEFAULT: "hsl(var(--popover))",
                    foreground: "hsl(var(--popover-foreground))",
                },
                card: {
                    DEFAULT: "hsl(var(--card))",
                    foreground: "hsl(var(--card-foreground))",
                },
                charcoal: {
                    DEFAULT: '#2D2D2D',
                },
            },
            borderRadius: {
                lg: "var(--radius)",
                md: "calc(var(--radius) - 2px)",
                sm: "calc(var(--radius) - 4px)",
            },
            fontFamily: {
                heading: [
                    'var(--font-heading)',
                    'serif',
                ],
                body: [
                    'var(--font-body)',
                    'sans-serif',
                ],
            },
            keyframes: {
                marquee: {
                    '0%': { transform: 'translateX(0%)' },
                    '100%': { transform: 'translateX(-100%)' },
                },
                'marquee-reverse': {
                    '0%': { transform: 'translateX(-100%)' },
                    '100%': { transform: 'translateX(0%)' },
                },
            },
            animation: {
                marquee: 'marquee 60s linear infinite',
                'marquee-reverse': 'marquee-reverse 60s linear infinite',
            },
        },
    },
    plugins: [],
};
