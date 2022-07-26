/// <reference types="vitest" />
/// <reference types="vite/client" />

import { isProd, loadEnv } from '/@/utils/viteHelp'
import vitePlugin from '/@/utils/vitePlugin'
import { resolve } from 'path'
import { ConfigEnv, UserConfig } from 'vite'

const viteConfig = ({ mode }: ConfigEnv): UserConfig => {
  const {
    VITE_PORT,
    VITE_OPEN,
    VITE_BASE_PATH,
    VITE_OUT_DIR,
    VITE_PROXY_URL
  } = loadEnv(mode)

  const alias = {
    '/@': resolve(__dirname, 'src'),
    'vue-i18n': isProd(mode)
      ? 'vue-i18n/dist/vue-i18n.cjs.prod.js'
      : 'vue-i18n/dist/vue-i18n.cjs.js'
  }

  let proxy = {}
  if (VITE_PROXY_URL) {
    proxy = {
      '/api': {
        target: VITE_PROXY_URL,
        changeOrigin: true,
        secure: false,
        rewrite: path => path.replace('/api/', '/')
      }
    }
  }

  const css = {
    preprocessorOptions: {
      scss: {
        additionalData: '@use "/@/style/element/element.scss" as *;'
      }
    }
  }

  const build = {
    outDir: VITE_OUT_DIR,
    sourcemap: false,
    chunkSizeWarningLimit: 1024,
    emptyOutDir: true,
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
  }

  return {
    plugins: vitePlugin,
    root: process.cwd(),
    resolve: { alias },
    base: VITE_BASE_PATH,
    server: {
      host: '0.0.0.0',
      port: VITE_PORT,
      open: VITE_OPEN,
      proxy
    },
    css,
    build,
    test: {
      globals: true,
      environment: 'jsdom',
      reporters: ['text', 'json', 'html'],
      coverage: {
        all: true
      }
    }
  }
}

export default viteConfig
