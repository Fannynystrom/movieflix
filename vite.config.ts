// import { defineConfig } from "vite";
// import react from "@vitejs/plugin-react";

// // https://vitejs.dev/config/
// export default defineConfig({
//   plugins: [react()],
// });
import { defineConfig } from "vitest/config"; // Använd Vitest's konfigurationsmetod
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  test: {
    globals: true, // Använd globala testfunktioner som describe, test, etc.
    environment: "jsdom", // Simulerar en DOM-miljö för React-komponenter
    setupFiles: "./setupVitest.ts", // Setup-fil för Vitest
  },
});
