import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
 
export default defineConfig({
  base: '/Iso8800-landing/', // must match repo name exactly (case-sensitive)
  plugins: [react()],
})