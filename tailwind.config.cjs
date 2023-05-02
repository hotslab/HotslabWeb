/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
    },
  },
  daisyui: {
    styled: true,
    themes: [
      "black",
      {
        hotslabBlack: {

          "primary": "#dc2626",
          "secondary": "#0369a1",
          "accent": "#16a34a",
          "neutral": "#120C12",
          "base-100": "#000000",
          "info": "#34d399",
          "success": "#86efac",
          "warning": "#fde047",
          "error": "#ef4444",
        },
      },
    ],
    base: true,
    utils: true,
    logs: true,
    rtl: false,
    prefix: "",
    darkTheme: "dark",
  },
  plugins: [require("daisyui")],
}
