import { defineConfig } from "vite";
import { resolve } from 'path';
import dts from 'vite-plugin-dts';
import pkg from './package.json' assert { type: 'json' }

export default defineConfig ({
  plugins: [dts()],
  build: {
    lib: {
      entry: resolve(__dirname, "./src/index.ts"),
      name: 'react-dynamic-form',
      fileName: 'react-dynamic-form',
      formats: ['es'],
    },
    plugins: [dts()],
    target: 'esnext', 
    rollupOptions: {
      external: [
        ...Object.keys(pkg.dependencies), // don't bundle dependencies
        /^node:.*/, // don't bundle built-in Node.js modules (use protocol imports!)
      ],
    },
  },
});