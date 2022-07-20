import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { resolve } from 'path'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: {
      '/@': resolve(__dirname, 'src')
    }
  },
  base: './',
  server: {
    port: 3000,
    cors: true,
    proxy: {
      '/api': {
        target: 'http://127.0.0.1:3001',
        changeOrigin: true,
        secure: false,
        rewrite: path => path.replace('/api/', '/')
      }
    }
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks(id) {
          // 将 pinia 的全局库实例打包进 vendor，避免和页面一起打包造成资源重复引入
          if (id.includes(resolve(__dirname, '/src/store/index.ts'))) {
            return 'vendor'
          }
        }
      }
    }
  }
})
