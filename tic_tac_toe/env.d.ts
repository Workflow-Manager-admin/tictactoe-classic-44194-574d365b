/// <reference types="vite/client" />

// Allow importing .vue files with TypeScript
declare module '*.vue' {
  import { DefineComponent } from 'vue'
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const component: DefineComponent<object, object, unknown>
  export default component
}
