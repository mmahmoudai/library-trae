import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  // Allow JSX syntax in .js files within src/
  esbuild: {
    loader: 'jsx',
    // Ensure esbuild handles .js and .jsx before import analysis
    include: /src\/.*\.[jt]sx?$/,
  },
  server: {
    port: 5173
  }
});