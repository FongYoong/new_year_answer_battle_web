import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { viteSingleFile } from "vite-plugin-singlefile"
import { ViteEjsPlugin } from "vite-plugin-ejs";
import { resolve } from 'path'
import assets from "./app_configs/assets.config.json"
import general from "./app_configs/general.config.json"

const rootDirectory = resolve(__dirname);

for (const [key, value] of Object.entries(assets)) {
    const path = value.path ? value.path : resolve(rootDirectory, value.default)
    assets[key] = path;
}

console.log(rootDirectory)
console.log(assets)
console.log(general)

// https://vitejs.dev/config/
// https://www.npmjs.com/package/vite-plugin-singlefile
export default defineConfig({
    plugins: [
        react(),
        viteSingleFile(),
        ViteEjsPlugin({
            title: general.title
        }),
    ],
    resolve:{
        alias: assets,
    },
    define: {
        // Node.js global to browser globalThis
        // Added this to resolve 'global' issue with React Joyride
        global: 'globalThis',
    },
})
