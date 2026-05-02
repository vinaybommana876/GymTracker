// tailwind.config.js
module.exports = {
  content: [
    "./App.{js,jsx,ts,tsx}",
    "./app/**/*.{js,jsx,ts,tsx}",
    "./components/**/*.{js,jsx,ts,tsx}",
  ],
  presets: [require("nativewind/preset")],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        // light mode tokens
        "bg-root": "#EAF6FF",
        "card-root": "rgba(255,255,255,0.8)",
        "txt-primary": "#05204A",
        accent: "#2563EB",
        // dark mode tokens (we'll use dark: variant)
        // you can reference them with dark:bg-root-dark etc., or use 'dark:' utility in classNames
      },
      borderRadius: {
        xl: "16px",
      },
    },
  },
  plugins: [],
};
