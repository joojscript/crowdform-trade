import react from "@vitejs/plugin-react";
import { defineConfig } from "vitest/config";

export default defineConfig({
  plugins: [react()],
  test: {
    globals: true,
    environment: "jsdom",
    coverage: {
      reporter: ["text", "html"],
    },
    setupFiles: ["./tests/setup.ts"],
    css: {
      modules: {
        classNameStrategy: "non-scoped",
      },
    },
  },
});
