import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path';


// https://vitejs.dev/config/
export default defineConfig({
  resolve: {
    alias: [
      {
        find: "@data",
        replacement: path.resolve(__dirname, "./data/"),
      },
      {
        find: "@src",
        replacement: path.resolve(__dirname, "./src/"),
      },
      {
        find: "@hooks",
        replacement: path.resolve(__dirname, "./src/hooks"),
      },
      {
        find: "@assets",
        replacement: path.resolve(__dirname, "./src/assets"),
      },
      {
        find: "@customtypes",
        replacement: path.resolve(__dirname, "./src/types"),
      },
      {
        find: "@pages",
        replacement: path.resolve(__dirname, "./src/pages"),
      },
      {
        find: "@layouts",
        replacement: path.resolve(__dirname, "./src/layouts"),
      },
      {
        find: "@components",
        replacement: path.resolve(__dirname, "./src/components"),
      },
    ],
  },
  plugins: [react()],
})
