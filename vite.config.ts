import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import tailwindcss from '@tailwindcss/vite'
import { TanStackRouterVite } from '@tanstack/router-plugin/vite'
import path from "node:path"


// https://vite.dev/config/
export default defineConfig({
  plugins: [react()
    , tailwindcss(),
    TanStackRouterVite({ target: 'react', autoCodeSplitting: true }),
  ],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  server: {
    port: 3000,
    open: true,
  },
  build: {
    outDir: 'dist',
    sourcemap: true,
    rollupOptions: {
      input: {
        main: path.resolve(__dirname, 'index.html'),
        about: path.resolve(__dirname, 'src/routes/about.tsx'),
        product: path.resolve(__dirname, 'src/routes/product.tsx'),
        solution: path.resolve(__dirname, 'src/routes/solution.tsx'),
        details: path.resolve(__dirname, 'src/routes/details.tsx'),
      },
      output: {
        entryFileNames: '[name].js',
        chunkFileNames: '[name].js',
        assetFileNames: '[name].[ext]',
      },
    },
  },
})
