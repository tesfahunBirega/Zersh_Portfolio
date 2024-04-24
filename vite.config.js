
import { defineConfig } from 'vite';
import dotenv from 'dotenv';
import react from '@vitejs/plugin-react'

dotenv.config();

export default defineConfig({
  plugins: [react()],
  define: {
    'import.meta.env.ENV': JSON.stringify(process.env.ENV),
    'import.meta.env.BASE_URL_DEV': JSON.stringify(process.env.BASE_URL_DEV),
    'import.meta.env.BASE_URL_PROD': JSON.stringify(process.env.BASE_URL_PROD)
  }

});
