import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";

export default defineConfig({
  plugins: [react()],
  server: {
    // This ensures that Vite correctly serves index.html for unknown routes in development
    historyApiFallback: true,
  },
  build: {
    outDir: "dist", // Change this to your desired output directory
  },
});
