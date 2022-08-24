import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import { resolve } from "path";
import { removeDataTestAttributes } from "./vite.plugins";


export default defineConfig({
  plugins: [
    vue({
      template: {
        compilerOptions: {
          nodeTransforms: [removeDataTestAttributes]
        }
      }
    })
  ],
  resolve: {
    alias: {
      "@": resolve(__dirname, "./src")
    }
  },
  build: {
    lib: {
      entry: resolve(__dirname, "src/lib-main.ts"),
      name: "vue3SimpleCalendar",
      fileName: "vue3SimpleCalendar"
    },
    rollupOptions: {
      external: ["vue"],
      output: {
        globals: {
          vue: "Vue"
        }
      }
    }
  }
});
