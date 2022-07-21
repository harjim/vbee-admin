/// <reference types="vitest" />
/// <reference types="vite/client" />

import vue from '@vitejs/plugin-vue'
import { resolve } from 'path'
import AutoImport from 'unplugin-auto-import/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'
import Components from 'unplugin-vue-components/vite'
import { defineConfig } from 'vite'
import viteCompression from 'vite-plugin-compression'
import viteImagemin from 'vite-plugin-imagemin'

import {
  createStyleImportPlugin,
  ElementPlusResolve
} from 'vite-plugin-style-import'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    AutoImport({
      imports: ['vue', 'pinia', 'vue-router'],
      resolvers: [ElementPlusResolver()],
      eslintrc: {
        enabled: false,
        filepath: './.eslintrc-auto-import.json',
        globalsPropValue: true
      }
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
    }),
    viteImagemin({
      gifsicle: {
        optimizationLevel: 7,
        interlaced: false
      },
      optipng: {
        optimizationLevel: 7
      },
      mozjpeg: {
        quality: 20
      },
      pngquant: {
        quality: [0.8, 0.9],
        speed: 4
      },
      svgo: {
        plugins: [
          {
            name: 'removeViewBox'
          },
          {
            name: 'removeEmptyAttrs',
            active: false
          }
        ]
      }
    }),
    viteCompression({
      verbose: true,
      disable: false,
      threshold: 10240,
      algorithm: 'gzip',
      ext: '.gz'
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
    outDir: 'dist',
    chunkSizeWarningLimit: 1024,
    minify: 'terser',
    terserOptions: {
      compress: {
        drop_console: true,
        drop_debugger: true
      }
    },
    rollupOptions: {
      output: {
        chunkFileNames: 'js/[name]-[hash].js',
        entryFileNames: 'js/[name]-[hash].js',
        manualChunks (id) {
          if (id.includes(resolve(__dirname, '/src/store/index.ts'))) {
            // 将 pinia 的全局库实例打包进 vendor，避免和页面一起打包造成资源重复引入
            return 'vendor'
          } else if (id.includes('node_modules')) {
            // 超大静态资源拆分
            return id.toString().split('node_modules')[1].split('/')[0].toString()
          }
        }
      }
    }
  },
  test: {
    globals: true,
    environment: 'jsdom',
    reporters: ['text', 'json', 'html']
  }
})
