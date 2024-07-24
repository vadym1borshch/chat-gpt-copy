import type { Config } from 'tailwindcss'

const config: Config = {

  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],options: {
    safelist: [
      /^h-\[.*\]$/ // Регулярний вираз для збереження класів, що починаються на h-[ і закінчуються ]
    ],
  },
  theme: {
    extend: {
      backgroundImage: {

      },
      keyframes: {
        slideIn: {
          '0%': { transform: 'translateX(-400px)' },
          '100%': { transform: 'translateX(0)' },
        },
        slideOut: {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(400px)' },
        },
      },
      animation: {
        slideIn: 'slideIn 0.5s ease-out forwards',
        slideOut: 'slideOut 0.5s ease-out forwards',
      },
    },
  },
  plugins: [],
}
export default config
