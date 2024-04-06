// import { defineConfig } from 'vite'
// import react from '@vitejs/plugin-react'

// // https://vitejs.dev/config/
// export default defineConfig({
//   plugins: [react()],
//   testMatch: ['**/tests/**/*.test.js'],
// });

/// <reference types="vitest" />
/// <reference types="vite/client" />

// import { defineConfig } from 'vite'
// import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
// export default defineConfig({
//   plugins: [react()],
//     test: {
//       globals: true,
//       // environment: 'jsdom',
//     }
// })
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server:{
    proxy:{
    '/api':{
      target:'http://localhost:5000/api',
      changeOrigin:true,
      rewrite:(path)=> path.replace(/^\/api/,''),
    },
  },
  },
});

 