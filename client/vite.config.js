import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
//プロシキ：クライアント（PCやスマホ）の代わりにインターネット上のWebサイトへアクセスする「代理」サーバー
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/api': 'http://localhost:3000',
    },
  },
})
