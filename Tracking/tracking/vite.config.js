// vite.config.js
import { defineConfig } from 'vite';

export default defineConfig({
  optimizeDeps: {
    include: [
      'react',
      'react-dom',
      'react-router-dom', // ตรวจสอบว่าได้รวม react-router-dom ลงในรายการนี้หรือไม่
    ],
  },
});
