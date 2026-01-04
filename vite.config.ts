import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import path from 'node:path';
import { createSvgIconsPlugin } from 'vite-plugin-svg-icons'

// https://vite.dev/config/
export default defineConfig({
  plugins: [vue(),createSvgIconsPlugin({
      iconDirs: [path.resolve(process.cwd(), 'icons')],
      symbolId: 'icon-[dir]-[name]',
    })],
  build: {
    rollupOptions: {
      output: {
        entryFileNames: `index.bundle.js`,
        assetFileNames: (assetInfo) => {
          if (assetInfo.names && assetInfo.names.some(name=>name.endsWith(".css"))) {
            return 'index.bundle.css';
          }
          return 'assets/[name].[ext]';
        },
        // 2. 这里的重点：手动拆分第三方库
        manualChunks: {
            vue:['vue'],
            localforage:['localforage']
        },
        // 3. 修改分包的文件名格式，使其更清晰
        chunkFileNames: 'assets/[name].js',
      }
    },
    
  }
})
