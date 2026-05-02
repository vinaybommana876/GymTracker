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
        // ===== BASE =====
        background: "#ffffff",
        foreground: "#000b1a",

        // ===== SURFACES =====
        card: "#ffffff",
        "card-foreground": "#000b1a",
        popover: "#ffffff",
        "popover-foreground": "#000b1a",

        // ===== SEMANTIC =====
        primary: "#0d3973",
        "primary-foreground": "#ffffff",

        secondary: "#f0f6ff",
        "secondary-foreground": "#0d3973",

        muted: "#f1f5f9",
        "muted-foreground": "#64748b",

        accent: "#f0f6ff",
        "accent-foreground": "#0059cc",

        destructive: "#ef4444",
        "destructive-foreground": "#f8fafc",

        // ===== UI =====
        border: "#e2e8f0",
        input: "#e2e8f0",
        ring: "#0059cc",

        // ===== SIDEBAR =====
        sidebar: "#f8fafc",
        "sidebar-foreground": "#1e293b",
        "sidebar-primary": "#0059cc",
        "sidebar-primary-foreground": "#ffffff",
        "sidebar-accent": "#ebf2ff",
        "sidebar-accent-foreground": "#0059cc",
        "sidebar-border": "#e2e8f0",
        "sidebar-ring": "#0059cc",

        // ===== CHART =====
        chart1: "#0059cc",
        chart2: "#3385ff",
        chart3: "#80b3ff",
        chart4: "#b3d1ff",
        chart5: "#e6efff",

        // ===== DARK MODE (IMPORTANT) =====
        // NativeWind uses `dark:` prefix, so we define same keys
        "dark-background": "#020817",
        "dark-foreground": "#f8fafc",

        "dark-card": "#020817",
        "dark-card-foreground": "#f8fafc",

        "dark-primary": "#76a0e5",
        "dark-primary-foreground": "#000b1a",

        "dark-secondary": "#0f1e3d",
        "dark-secondary-foreground": "#f8fafc",

        "dark-muted": "#1e293b",
        "dark-muted-foreground": "#94a3b8",

        "dark-accent": "#1e293b",
        "dark-accent-foreground": "#f8fafc",

        "dark-border": "#1e293b",
        "dark-input": "#1e293b",
        "dark-ring": "#4d90ff",
      },

      borderRadius: {
        xl: 16,
        lg: 12,
        md: 8,
        sm: 6,
      },

      fontFamily: {
        sans: ["System"],
        serif: ["Georgia"],
        mono: ["monospace"],
      },
    },
  },

  plugins: [],
};