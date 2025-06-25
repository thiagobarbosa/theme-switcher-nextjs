import { defineConfig } from 'tsup'

export default defineConfig({
  entry: ['src/index.ts'],
  format: ['esm', 'cjs'],
  target: 'es2020',
  dts: true,
  clean: true,
  outDir: 'dist',
  external: ['react', 'react-dom', 'next', 'next-themes'],
  treeshake: false, // Disable treeshaking to preserve directives
  sourcemap: true,
  splitting: false,
  banner: {
    js: '"use client"',
  },
})