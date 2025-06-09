// frontend/src/hooks/useFetchData.js
import { useState, useCallback } from 'react'

const useFetchData = () => { // URLは後で引数として渡すか、実行時に指定する
    const [data, setData] = useState(null)
    const [loading, setLoading] = useState(false) // 初期状態をfalseに
    const [error, setError] = useState(null)

    // fetchData関数をuseCallbackでメモ化し、依存関係を管理
    const fetchData = useCallback(async (url, options = {}) => {
        setLoading(true)
        setError(null) // 新しいリクエストのたびにエラーをリセット

        try {
            const response = await fetch(url, {
                method: options.method || 'GET', // メソッドが指定されなければGET
                headers: {
                    'Content-Type': 'application/json', // デフォルトでJSONを指定
                    ...options.headers, // 追加のヘッダーがあれば上書き/追加
                },
                body: options.body ? JSON.stringify(options.body) : null, // bodyがあればJSON文字列化
                // その他のfetchオプション（mode, cacheなど）もoptionsから渡せるようにする
                ...options.fetchOptions, 
            })

                if (!response.ok) {
                // HTTPエラーの場合、レスポンスボディも取得して詳細なエラーメッセージを構築
                const errorData = await response.json().catch(() => ({ message: '不明なエラー' }))
                throw new Error(errorData.message || `HTTP error! status: ${response.status}`)
                }

                const result = await response.json()
                setData(result)
                return result // 成功したデータを返す
            } catch (e) {
                setError(e)
                console.error("Fetch error:", e) // デバッグ用にエラーをログ出力
                throw e // エラーを再スローして呼び出し元でキャッチできるようにする
            } finally {
                setLoading(false)   // データ取得完了時にローディング状態をfalseに
            }
    }, []) // 依存配列は空でOK。fetchData自体がメモ化される

    // フックからfetchData関数と状態を返す
    return { data, loading, error, fetchData }
}

export default useFetchData