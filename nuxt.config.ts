// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  ssr: false,
  compatibilityDate: "2025-05-15",
  devtools: { enabled: true },
  modules: [
    "@nuxt/eslint",
    "@nuxt/icon",
    "@nuxt/ui",
    "@nuxt/image",
    "@pinia/nuxt",
  ],
  imports: {
    dirs: ["./store/**"],
  },
  css: ["~/assets/css/main.css"],
  runtimeConfig: {
    public: {
      appwriteEndpoint: process.env.NUXT_PUBLIC_APPWRITE_ENDPOINT,
      appwriteProjectId: process.env.NUXT_PUBLIC_APPWRITE_PROJECT_ID
    }
  },
  ui: {
    theme: {
      colors: [
        "primary",
        "secondary",
        "success",
        "error",
        "neutral",
        "light",
        "dark",
      ],
    },
  },
});

// console.log(useColorMode);