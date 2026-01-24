import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import path from 'node:path';
import { createSvgIconsPlugin } from 'vite-plugin-svg-icons'

// https://vite.dev/config/
export default defineConfig({
    resolve: {
        alias: {
            '@': path.resolve(__dirname, './src'),
            '@c': path.resolve(__dirname, './src/components'),
            '@a': path.resolve(__dirname, './src/api/'),
            '@t': path.resolve(__dirname, './src/api/types.ts'),
        },
    },
    plugins: [vue(), createSvgIconsPlugin({
        iconDirs: [path.resolve(process.cwd(), 'icons')],
        symbolId: 'icon-[dir]-[name]',
    })],
    build: {
        rollupOptions: {
            output: {
                entryFileNames: `index.bundle.js`,
                assetFileNames: (assetInfo) => {
                    if (assetInfo.names && assetInfo.names.some(name => name.endsWith(".css"))) {
                        return 'index.bundle.css';
                    }
                    return 'assets/[name].[ext]';
                },
            }
        },

    }
})
