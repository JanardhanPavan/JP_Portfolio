/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        background: '#000000',
        surface: '#050505',
        'neon-green': '#00FF88',
        'neon-cyan': '#00CFFF',
        'neon-magenta': '#FF006E',
        'neon-violet': '#A855F7',
        'text-primary': '#F0F0F0',
        'text-muted': '#888888',
      },
      fontFamily: {
        bebas: ['"Bebas Neue"', 'sans-serif'],
        space: ['"Space Grotesk"', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'monospace'],
      },
      backgroundImage: {
        'glass-gradient': 'linear-gradient(135deg, rgba(255,255,255,0.03) 0%, rgba(255,255,255,0.01) 100%)',
      },
      boxShadow: {
        'neon-green': '0 0 10px rgba(0,255,136,0.3)',
        'neon-cyan': '0 0 10px rgba(0,207,255,0.3)',
        'neon-magenta': '0 0 10px rgba(255,0,110,0.3)',
      }
    },
  },
  plugins: [],
}
