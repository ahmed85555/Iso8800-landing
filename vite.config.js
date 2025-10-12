import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
 
// IMPORTANT: set the base to your repo name
export default defineConfig({
  base: '/iso8800-landing/',  // <-- replace with your repo name
  plugins: [react()],
})