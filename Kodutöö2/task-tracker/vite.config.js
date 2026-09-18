import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  base: 'https://github.com/piperal/kodt-d/tree/main/Kodut%C3%B6%C3%B62/task-tracker',
});