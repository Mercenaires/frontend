import daisyui from "daisyui"; // Importer DaisyUI en tant que module

/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"], // Définir les fichiers à scanner
  darkMode: "class", // Activer le mode sombre basé sur la classe
  theme: {
    extend: {
      fontFamily: {
        parisienne: ["Parisienne", "cursive"], // Ajouter la police Parisienne
      },
      colors: {
        primary: "#00C2FF", // Couleur principale
        secondary: "#DD0BFF", // Couleur secondaire
        dark: "#111111", // Couleur sombre pour le mode dark
      },
      container: {
        center: true, // Centrer les conteneurs
        padding: {
          DEFAULT: "1rem",
          sm: "3rem",
        },
      },
      animation: {
        'fade-in': 'fade-in 1s ease-out forwards', // Animation fade-in
        'fade-out': 'fade-out 1s ease-out forwards', // Animation fade-out
        'move-bg': 'move-bg 30s linear infinite', // Animation de mouvement du blob
      },
      keyframes: {
        'fade-in': {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        'fade-out': {
          '0%': { opacity: '1' },
          '100%': { opacity: '0' },
        },
        'move-bg': {
          '0%': { transform: 'translateX(0) translateY(0) scale(1)' },
          '50%': { transform: 'translateX(-5%) translateY(-5%) scale(1.05)' },
          '100%': { transform: 'translateX(0) translateY(0) scale(1)' },
        },
      },
    },
  },
  plugins: [
    daisyui, // Utiliser DaisyUI avec import
  ],
  daisyui: {
    themes: ["light", "night"], // Activer les thèmes light et night
  },
};
