import { defineConfig } from 'tsup';

export default defineConfig({
  entry: ['src/index.ts'],
  outDir: 'dist',
  format: 'esm',
  target: 'esnext',
  minify: true,
  clean: true,
  outExtension: () => ({ js: '.js' }),
});
