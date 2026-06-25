import { defineConfig } from "vite";
import { tanstackStart } from "@tanstack/react-start/plugin/vite";
import viteReact from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import tsConfigPaths from "vite-tsconfig-paths";
import { nitro } from "nitro/vite";

export default defineConfig({
  plugins: [
    tailwindcss(),
    tsConfigPaths({ projects: ["./tsconfig.json"] }),
    tanstackStart({
      // Redireciona o entry do servidor para src/server.ts (wrapper de erro SSR).
      server: { entry: "server" },
      importProtection: {
        behavior: "error",
        client: {
          files: ["**/server/**"],
          specifiers: ["server-only"],
        },
      },
    }),
    // Build de deploy para a Vercel (gera .vercel/output via Build Output API).
    // Zero-config: a Vercel detecta o output automaticamente na integração Git.
    nitro({
      preset: "vercel",
    }),
    viteReact(),
  ],
});
