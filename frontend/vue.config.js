const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
    transpileDependencies: true,
    devServer: {
        port: 8000, // ★ここを8081など、Djangoの8080と異なるポートに設定
        // ホスト名を指定する場合（任意、通常はlocalhostでOK）
        // host: 'localhost',
        // プロキシ設定（Django APIへのリクエストを転送するため）
        proxy: {
            '/api': { // '/api' から始まるリクエストをプロキシする
                target: 'http://localhost:8080', // Django バックエンドのURLとポート
                changeOrigin: true, // オリジンを変更してCORS問題を回避
            }
        }
    }  
})
