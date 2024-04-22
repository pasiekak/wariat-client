import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import viteTsconfigPaths from "vite-tsconfig-paths";
import { loadConfig } from "browserslist";

export default defineConfig(({ command }) => {
  const browsers = loadConfig({
    path: ".",
    env: command === "build" ? "production" : "development",
  });

  return {
    base: "",
    plugins: [react(), viteTsconfigPaths()],
    server: {
      open: true,
      port: 3000,
      proxy: {
        "/api": {
          target: "http://localhost:5000",
          changeOrigin: true,
        },
      },
    },
    build: {
      target: browsers,
    },
  };
});
