// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: "2025-07-15",
  devtools: { enabled: true },
  app: {
    pageTransition: { name: "page", mode: "out-in" },
    head: {
      link: [
        { rel: "icon", type: "image/png", href: "/favicon.png" },
      ],
    },
  },
  css: ["~/assets/css/main.css"],

  modules: [
    "@nuxt/fonts",
    "@nuxtjs/i18n",
    "@nuxtjs/tailwindcss",
    "@pinia/nuxt",
    "@primevue/nuxt-module",
  ],

  i18n: {
    locales: [
      { code: "ar", file: "ar.json", name: "اللغة العربية", dir: "rtl" },
      { code: "en", file: "en.json", name: "English", dir: "ltr" },
      { code: "ur", file: "ur.json", name: "لغة الاردو", dir: "rtl" },
    ],
    defaultLocale: "ar",
    langDir: "locales",
    strategy: "no_prefix",
  },
});
