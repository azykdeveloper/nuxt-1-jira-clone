// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: "2025-05-15",
  devtools: { enabled: false },
  modules: ["@nuxt/eslint", "@nuxt/icon", "@nuxt/ui", "@nuxt/image"],
  css: ["~/assets/css/main.css"],
  ui: {
    theme: {
      colors: [
        "primary",
        "secondary",
        "info",
        "success",
        "warning",
        "error",
        "accent",
        "neutral",
        "light",
        "dark",
      ],
    },
  },
});

// console.log(useColorMode);