import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { viteSingleFile } from "vite-plugin-singlefile"

// https://vitejs.dev/config/
// https://www.npmjs.com/package/vite-plugin-singlefile

export default defineConfig({
  plugins: [react(), viteSingleFile()],
})
