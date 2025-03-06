import { heroui } from "@heroui/theme";
import { customTheme } from "./src/customTheme";
/** @type {import('tailwindcss').Config} */

export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "./node_modules/@heroui/theme/dist/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
  },
  darkMode: "class",
  plugins: [
    heroui({
      layout: {
        disabledOpacity: "0.3", // opacity-[0.3]
        radius: {
          small: "2px", // rounded-small
          medium: "4px", // rounded-medium
          large: "6px", // rounded-large
        },
        borderWidth: {
          small: "1px", // border-small
          medium: "1px", // border-medium
          large: "2px", // border-large
        },
      },
      themes: {
        light: {
          colors: {
            // default: {
            //   50: "#fafafa",
            //   100: "#f2f2f3",
            //   200: "#ebebec",
            //   300: "#e3e3e6",
            //   400: "#dcdcdf",
            //   500: "#d4d4d8",
            //   600: "#afafb2",
            //   700: "#8a8a8c",
            //   800: "#656567",
            //   900: "#404041",
            //   DEFAULT: "#d4d4d8",
            //   foreground: "#000"
            // },
            primary: {
              50: "#fae9ea",
              100: "#f3cacc",
              200: "#ecabae",
              300: "#e68c91",
              400: "#df6d73",
              500: "#d84e55",
              600: "#b24046",
              700: "#8c3337",
              800: "#672528",
              900: "#41171a",
              DEFAULT: "#d84e55",
              foreground: "#fff",
            },
            secondary: {
              50: "#fff4df",
              100: "#ffe4b3",
              200: "#ffd486",
              300: "#ffc559",
              400: "#ffb52d",
              500: "#ffa500",
              600: "#d28800",
              700: "#a66b00",
              800: "#794e00",
              900: "#4d3200",
              DEFAULT: "#ffa500",
              foreground: "#000",
            },
            success: {
              DEFAULT: "#17c964",
              foreground: "#000",
            },
            warning: {
              DEFAULT: "#f5a524",
              foreground: "#000",
            },
            danger: {
              DEFAULT: "#f31260",
              foreground: "#fff",
            },
            background: "#ffffff",
            foreground: "#000000",
            focus: "#006FEE",
            overlay: "#000000",
          },
        },
        dark: {
          colors: {
            // default: {
            //   50: "#e7e7e8",
            //   100: "#c5c5c8",
            //   200: "#a4a4a7",
            //   300: "#828287",
            //   400: "#616166",
            //   500: "#3f3f46",
            //   600: "#34343a",
            //   700: "#29292e",
            //   800: "#1e1e21",
            //   900: "#131315",
            //   DEFAULT: "#3f3f46",
            //   foreground: "#fff"
            // },
            primary: {
              DEFAULT: "#d84e55",
              foreground: "#fff",
            },
            secondary: {
              DEFAULT: "#ffa500",
              foreground: "#000",
            },
            success: {
              DEFAULT: "#17c964",
              foreground: "#000",
            },
            warning: {
              DEFAULT: "#f5a524",
              foreground: "#000",
            },
            danger: {
              DEFAULT: "#f31260",
              foreground: "#fff",
            },
            background: "#000000",
            foreground: "#ffffff",
            focus: "#006FEE",
            overlay: "#ffffff",
          },
        },
      },
    }),
  ],
};
