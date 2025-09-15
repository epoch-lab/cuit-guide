/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly NODE_ENV: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
  glob(pattern: string): Record<string, () => Promise<any>>
}
