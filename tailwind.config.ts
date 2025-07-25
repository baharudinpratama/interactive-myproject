import type { Config } from "tailwindcss";

const { heroui } = require("@heroui/react");

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./node_modules/@heroui/theme/dist/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      screens: {
        xs: '320px',
      },
      colors: {
        background: "var(--orange-50)",
        foreground: "var(--grey-dark-active)",
        dark: {
          secondary: "var(--dark-secondary)",
        },
        green: {
          DEFAULT: "var(--green)",
        },
        grey: {
          DEFAULT: "var(--grey)",
          25: "var(--grey-25)",
          active: "var(--grey-active)",
          dark: {
            active: "var(--grey-dark-active)",
          },
          light: {
            active: "var(--grey-light-active)",
          },
          lighter: "var(--grey-lighter)",
        },
        light: {
          alt: "var(--light-alt)",
          primary: "var(--light-primary)",
          secondary: "var(--light-secondary)",
        },
        orange: {
          50: "var(--orange-50)",
        },
        red: {
          DEFAULT: "var(--red)",
          active: "var(--red-active)",
          light: {
            DEFAULT: "var(--red-light)",
            active: "var(--red-light-active)",
            hover: "var(--red-light-hover)",
          },
        },
        secondary: "var(--secondary)",
        white: {
          DEFAULT: "var(--white)",
          active: "var(--white-active)",
          alt: {
            active: "var(--white-alt-active)",
            hover: "var(--white-alt-hover)",
          },
          dark: "var(--white-dark)",
          hover: "var(--white-hover)",
          light: {
            active: "var(--white-light-active)",
          },
          normal: "var(--white-normal)",
        },
        yellow: {
          DEFAULT: "var(--yellow)",
          400: "var(--yellow-400)",
          500: "var(--yellow-500)",
          600: "var(--yellow-600)",
          active: "var(--yellow-active)",
          hover: "var(--yellow-hover)",
          light: {
            DEFAULT: "var(--yellow-light)",
            active: "var(--yellow-light-active)",
          },
        }
      },
      fontSize: {
        base: ["14px", { lineHeight: "150%" }]
      },
    },
  },
  darkMode: "class",
  plugins: [
    heroui(),
  ],
};
export default config;
