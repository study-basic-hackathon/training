import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
    plugins: [react()],
    server: {
        // open: true を明示的に指定すると、自動でブラウザが開きます。
        open: true,
        // 特定のURLを開きたい場合は以下のように指定
        // open: '/some-path', // 例: http://localhost:5173/some-path を開く
        // ポートを指定する場合 (既に説明済み)
        // port: 3000,
        proxy: {
          // '/api' で始まるリクエストを http://localhost:8080 に転送する
          '/api': {
            target: 'http://localhost:8080', // DjangoバックエンドのURL
            changeOrigin: true, // オリジンを変更して、ターゲットサーバーがオリジンとして認識できるようにする
            // rewrite: (path) => path.replace(/^\/api/, ''), // プロキシする際に '/api' を取り除くかどうか
                                                           // DjangoのURLに '/api' が含まれない場合は必要
                                                           // 例: /api/training/items が /training/items になる
          },
          // もし DjangoのURLが /api/training/items のように、すでに /api を含んでいる場合は、
          // rewrite を省略するか、'/api' を残すように調整します。
          // 例: DjangoのURLが http://localhost:8080/api/training/items の場合
          // '/api': {
          //   target: 'http://localhost:8080',
          //   changeOrigin: true,
          // },
        },
    },
})
