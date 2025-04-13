import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";
import tsconfigPaths from "vite-tsconfig-paths";
// https://vitejs.dev/config/
export default defineConfig(({ command, mode }) => {
  // Load env file based on `mode` in the current working directory.
  // Set the third parameter to '' to load all env regardless of the `VITE_` prefix.
  const env = loadEnv(mode, process.cwd(), '');

  return {
    base: "/",
    plugins: [
      react(),
      tsconfigPaths(),
      {
        name: "markdown-transform",
        transform(code, id) {
          if (id.endsWith(".md")) {
            // Wrap in JS string and export
            return `export default ${JSON.stringify(code)};`;
          }
        },
      },
    ],
    server: {
      port: 5173,
      host: true,
      strictPort: true,
    },
    preview: {
      port: 5173,
      host: true,
      strictPort: true,
    },
    resolve: {
      alias: {
        "@": path.resolve(__dirname, "./src"),
      },
    },
    define: {
      __APP_ENV__: JSON.stringify(env.VITE_ENV),
    },
    build: {
      outDir: 'dist',
      sourcemap: mode === 'development',
      // Reduce chunk size warnings threshold
      chunkSizeWarningLimit: 1000,
      rollupOptions: {
        output: {
          manualChunks: {
            vendor: ['react', 'react-dom', 'react-router-dom'],
            firebase: ['firebase/app', 'firebase/auth', 'firebase/firestore'],
          },
        },
      },
    },
  };
});
