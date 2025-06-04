/// <reference types="vite/client" />

// Allow importing .vue files with TypeScript
declare module '*.vue' {
  import { DefineComponent } from 'vue'
  const component: DefineComponent<{}, {}, any>
  export default component
}
