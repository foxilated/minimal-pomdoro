import type { NavigationGuard } from 'vue-router'
export type MiddlewareKey = string
declare module "/home/khaled/stuff/code/minimal-pomdoro/node_modules/.pnpm/nuxt@3.6.1_@types+node@18.16.18/node_modules/nuxt/dist/pages/runtime/composables" {
  interface PageMeta {
    middleware?: MiddlewareKey | NavigationGuard | Array<MiddlewareKey | NavigationGuard>
  }
}