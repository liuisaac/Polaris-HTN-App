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
                bebas: ["var(--font-bebas)"],
            },
            colors: {
                background: "var(--background)",
                foreground: "var(--foreground)",
                "space-blue": "#031E3C",
                "button-orange": "#FF7A00",
            },
        },
    },
    plugins: [],
};
export default config;
