import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));

export default defineConfig({
  plugins: [react()],
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, "index.html"),
        sobre: resolve(__dirname, "sobre/index.html"),
        servicos: resolve(__dirname, "servicos/index.html"),
        portfolio: resolve(__dirname, "portfolio/index.html"),
        contato: resolve(__dirname, "contato/index.html"),
        clinicas: resolve(__dirname, "clinicas/index.html"), // campanha temporária
        placa: resolve(__dirname, "placa/index.html") // plaquinha NFC
      }
    }
  },
  server: {
    host: "127.0.0.1",
    port: 5173
  },
  preview: {
    host: "127.0.0.1",
    port: 4173
  }
});
