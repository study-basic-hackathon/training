// frontend/src/hooks/useFetchData.js
import { useState, useEffect } from 'react'

const useFetchData = (url) => {
    const [data, setData] = useState(null)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)

    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true)    // データ取得開始時にローディング状態をtrueに
                const response = await fetch(url)

                // レスポンスがOKでない場合のエラーハンドリング
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`)
                }

                const result = await response.json()
                setData(result) // データをセット
            } catch (e) {
                setError(e) // エラーをセット
            } finally {
                setLoading(false)   // データ取得完了時にローディング状態をfalseに
            }
        }

        fetchData()
    }, [url]) // urlが変わるたびに再実行

    return { data, loading, error }
}

export default useFetchData