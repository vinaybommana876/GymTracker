import { Platform } from "react-native";

/**
 * Full design token system (converted from your Tailwind CSS variables)
 */

const lightTheme = {
  // base
  background: "#ffffff",
  foreground: "#000b1a",

  // surfaces
  card: "#ffffff",
  cardForeground: "#000b1a",
  popover: "#ffffff",
  popoverForeground: "#000b1a",

  // semantic
  primary: "#0d3973",
  primaryForeground: "#ffffff",
  secondary: "#f0f6ff",
  secondaryForeground: "#0d3973",
  muted: "#f1f5f9",
  mutedForeground: "#64748b",
  accent: "#f0f6ff",
  accentForeground: "#0059cc",
  destructive: "#ef4444",
  destructiveForeground: "#f8fafc",

  // ui
  border: "#e2e8f0",
  input: "#e2e8f0",
  ring: "#0059cc",

  // charts
  chart1: "#0059cc",
  chart2: "#3385ff",
  chart3: "#80b3ff",
  chart4: "#b3d1ff",
  chart5: "#e6efff",

  // sidebar
  sidebar: "#f8fafc",
  sidebarForeground: "#1e293b",
  sidebarPrimary: "#0059cc",
  sidebarPrimaryForeground: "#ffffff",
  sidebarAccent: "#ebf2ff",
  sidebarAccentForeground: "#0059cc",
  sidebarBorder: "#e2e8f0",
  sidebarRing: "#0059cc",

  // legacy compatibility (IMPORTANT)
  text: "#000b1a",
  icon: "#64748b",
  tint: "#0d3973",
  tabIconDefault: "#64748b",
  tabIconSelected: "#0d3973",
};

const darkTheme = {
  background: "#020817",
  foreground: "#f8fafc",

  card: "#020817",
  cardForeground: "#f8fafc",
  popover: "#020817",
  popoverForeground: "#f8fafc",

  primary: "#76a0e5",
  primaryForeground: "#000b1a",
  secondary: "#0f1e3d",
  secondaryForeground: "#f8fafc",
  muted: "#1e293b",
  mutedForeground: "#94a3b8",
  accent: "#1e293b",
  accentForeground: "#f8fafc",
  destructive: "#7f1d1d",
  destructiveForeground: "#f8fafc",

  border: "#1e293b",
  input: "#1e293b",
  ring: "#4d90ff",

  chart1: "#4d90ff",
  chart2: "#3b82f6",
  chart3: "#1d4ed8",
  chart4: "#003185",
  chart5: "#001a47",

  sidebar: "#010409",
  sidebarForeground: "#f8fafc",
  sidebarPrimary: "#4d90ff",
  sidebarPrimaryForeground: "#000b1a",
  sidebarAccent: "#0f1e3d",
  sidebarAccentForeground: "#f8fafc",
  sidebarBorder: "#1e293b",
  sidebarRing: "#4d90ff",

  // legacy compatibility
  text: "#f8fafc",
  icon: "#94a3b8",
  tint: "#ffffff",
  tabIconDefault: "#94a3b8",
  tabIconSelected: "#ffffff",
};

/**
 * Export unified Colors object
 */
export const Colors = {
  light: lightTheme,
  dark: darkTheme,
};

/**
 * Fonts (unchanged)
 */
export const Fonts = Platform.select({
  ios: {
    sans: "system-ui",
    serif: "ui-serif",
    rounded: "ui-rounded",
    mono: "ui-monospace",
  },
  default: {
    sans: "normal",
    serif: "serif",
    rounded: "normal",
    mono: "monospace",
  },
  web: {
    sans: "system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif",
    serif: "Georgia, 'Times New Roman', serif",
    rounded:
      "'SF Pro Rounded', 'Hiragino Maru Gothic ProN', Meiryo, 'MS PGothic', sans-serif",
    mono: "SFMono-Regular, Menlo, Monaco, Consolas, 'Liberation Mono', 'Courier New', monospace",
  },
});