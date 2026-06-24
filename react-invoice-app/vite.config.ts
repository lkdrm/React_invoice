/// <reference types="vitest" />
import { defineConfig } from "vitest/config";
import react from "@vitejs/plugin-react";

export default defineConfig({
  base: "/React_invoice/",
  plugins: [react()],
  test: {
    globals: false,
    environment: "node",
  },
});