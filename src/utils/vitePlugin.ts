import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import AutoImport from 'unplugin-auto-import/vite'
import IconsResolver from 'unplugin-icons/resolver'
import Icons from 'unplugin-icons/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'
import Components from 'unplugin-vue-components/vite'
import viteCompression from 'vite-plugin-compression'
import viteImagemin from 'vite-plugin-imagemin'
import {
  createStyleImportPlugin,
  ElementPlusResolve
} from 'vite-plugin-style-import'

export default [
  vue(),
  vueJsx(),
  AutoImport({
    imports: ['vue', 'pinia', 'vue-router', '@vueuse/core'],
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
    resolvers: [ElementPlusResolver(), IconsResolver()]
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
  Icons({
    compiler: 'vue3',
    autoInstall: true
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
]
