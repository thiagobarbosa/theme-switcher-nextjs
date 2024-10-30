import { defineConfig } from 'tsup'
import { copy } from 'fs-extra'

export default defineConfig({
  entry: [
    'src/cli.ts',
    'src/install.ts'
  ],
  format: ['esm'],
  target: 'es2020',
  dts: true,
  clean: true,
  outDir: 'dist',
  external: ['react', 'react-dom', 'next', 'next-themes', '@phosphor-icons/react'],
  treeshake: true,
  sourcemap: true,
  splitting: true,
  shims: true,
  banner: {
    js: '#!/usr/bin/env node',
  },
  async onSuccess() {
    await Promise.all([
      copy('src/components', 'dist/components'),
      copy('src/lib', 'dist/lib')
    ])
  },
})