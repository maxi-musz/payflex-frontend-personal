import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#014DAF',
        primary_hover: '#418beb',
        secondary: '#CCE2FF',
        secondary_light: '#ecf3fc',
        secondary_lighter: '#D0D5DD',
        customGray: '#E2E2E2',
        textGray: '#6b7280',
        textGrayDarker: '#121212',
        delete: '#b91c1c',
        delete_hover: '#dc2626',
        dark_orange: '#431407',
        yellowish: '#cee1af90',
        yellowish_hover: '#cee9a490',
      },
      boxShadow: {
        'custom-xl': '0 8px 12px -3px rgba(153, 79, 133, 0.2), 0 3px 5px -2px rgba(153, 79, 133, 0.15)',
      },
      borderRadius: {
        'radius-4': '4px',
        'radius-8': '8px',
        'radius-12': '12px',
      },
    },
  },
  plugins: [],
};
export default config;
