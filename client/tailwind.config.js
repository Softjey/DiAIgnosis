import { nextui } from '@nextui-org/theme';

/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./*.{html,js}",
    "./src/**/*.{js,ts,jsx,tsx}",
    "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}"
  ],
  theme: {
    extend: {},
  },
  darkMode: "class",
  plugins: [nextui({
    defaultTheme: 'light',
    themes: {
      light: {
        colors: {
          primary: {
            DEFAULT: "#45D483",
            foreground: "#fff",
          },
          focus: "#000"
        },
      },
      highContrast: {
        colors: {
          primary: {
            DEFAULT: "#FFFFFF",
            foreground: "#000000",
          },
          focus: "#FFFF00",
          background: "#000000",
          text: "#FFFFFF"
        },
      }
    }
  })],
}