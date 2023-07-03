import { ComputedRef, Ref } from 'vue'
export type LayoutKey = "default"
declare module "/home/khaled/stuff/code/minimal-pomdoro/node_modules/.pnpm/nuxt@3.6.1_@types+node@18.16.18/node_modules/nuxt/dist/pages/runtime/composables" {
  interface PageMeta {
    layout?: false | LayoutKey | Ref<LayoutKey> | ComputedRef<LayoutKey>
  }
}