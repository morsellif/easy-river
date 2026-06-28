// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  modules: ['@vueuse/nuxt', '@pinia/nuxt', '@nuxt/eslint'],
  srcDir: './src/',
  css: ['~/assets/css/main.css'],
  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {},
      ...(process.env.NODE_ENV === 'production' ? { cssnano: {} } : {}),
    },
  },
  ssr: true,
  devtools: { enabled: true },
  typescript: {
    tsConfig: {
      include: ['types/*.d.ts'],
    },
  },
  app: {
    head: {
      charset: 'utf-8',
      viewport: 'width=device-width, initial-scale=1.0, viewport-fit=cover',
    },
  },
  nitro: {
    preset: 'cloudflare_module',
    storage: {
      cache: {
        driver: 'cloudflare-kv-binding',
        binding: 'KV_EASY-RIVER_CACHE_BUCKET',
      },
    },
  },
});
