/** @type {import('tailwindcss').Config} */
import { colors } from "./styles/Colors";

module.exports = {
    content: [
        "./App.{js,jsx,ts,tsx}",
        "./components/**/*.{js,jsx,ts,tsx}",
        "./pages/**/*.{js,jsx,ts,tsx}",
        //...
    ],
    theme: {
        extend: {
            colors: {
                primary: colors.primary,
                secondary: colors.secondary,
                accent: colors.accent,
            },
        },
    },
    plugins: [],
}

