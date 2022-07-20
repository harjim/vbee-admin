import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { resolve } from 'path'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'
import { createStyleImportPlugin, ElementPlusResolve } from 'vite-plugin-style-import'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    AutoImport({
      imports: ['vue', 'pinia', 'vue-router'],
      resolvers: [ElementPlusResolver()]
    }),
    Components({
      dirs: ['src/components'],
      extensions: ['vue'],
      resolvers: [ElementPlusResolver()]
    }),
    createStyleImportPlugin({
      resolves: [ElementPlusResolve()],
      libs: [
        {
          libraryName: 'element-plus',
          esModule: true,
          resolveStyle: name => {
            return `element-plus/theme-chalk/${name}.css`
          }
        }
      ]
    })
  ],
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
