import type { Config } from "tailwindcss";

const config: Config = {
    content: [
        "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
        "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
        "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    ],
    theme: {
        extend: {
            fontFamily: {
                saira: ["var(--font-saira)"],
                baumans: ["var(--font-baumans)"],
            },
            colors: {
                background: "var(--background)",
                foreground: "var(--foreground)",
                "space-blue": "#031E3C",
                "button-orange": "#FF7A00",
            },
            animation: {
                "pulse-slow": "pulse 4s cubic-bezier(0.4, 0.4, 0.6, 1) infinite;",
            },
        },
    },
    plugins: [],
};
export default config;
