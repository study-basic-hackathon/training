import React, { useEffect, useState } from 'react'
import useFetchData from '../hooks/useFetchData.js'
import { useNavigate } from 'react-router-dom'
import './DashboardPage.css'

// 例として、ダッシュボードに表示するアイテムのAPIエンドポイント
// 実際のDjangoのエンドポイントに合わせて変更してください
const API_URL = '/api/training/'

const DashboardPage = () => {
    // データを取得するためのカスタムフック
    const { data, loading, error, fetchData } = useFetchData()
    // ページ遷移を管理するためのフック
    const navigate = useNavigate()

    // APIリクエストの成功/失敗メッセージとエラーを管理するステート
    const [apiStatus, setApiStatus] = useState({ success: false, message: '', error: null })

    // コンポーネントがマウントされたときにデータを取得
    // または、データ作成/削除後にデータを再取得するために呼び出す
    const fetchTrainingPlans = () => {
        fetchData(API_URL, { method: 'GET' })
    }

    useEffect(() => {
        fetchTrainingPlans()
    }, [fetchData]) // fetchData がメモ化されているので依存配列に含める

    // ★トレーニングプランを削除する関数★
    const handleDelete = async (id) => {
        if (!window.confirm('本当にこのトレーニングプランを削除しますか？')) {
            return // ユーザーがキャンセルした場合
        }

        setApiStatus({ success: false, message: '削除中...', error: null }) // ★apiStatus に変更★

        try {
            // DELETEリクエストを送信
            // DELETEの場合、通常ボディは不要で、レスポンスもNo Content (204) です。
            const response = await fetchData(`${API_URL}${id}/`, {
                method: 'DELETE',
            })

            if (response && response.message) { // useFetchData が 204 でメッセージを返す場合
                setApiStatus({ success: true, message: response.message, error: null })
                fetchTrainingPlans() // 削除後、データを再取得してリストを更新
            } else if (response === null) { // useFetchData が 204 で null を返す場合
                setApiStatus({ success: true, message: 'プランが正常に削除されました。', error: null }) // ★apiStatus に変更★
                fetchTrainingPlans() // 削除後、データを再取得してリストを更新
            }
             else {
                const errorData = response || { message: '不明なエラー' }
                setApiStatus({ success: false, message: 'プラン削除に失敗しました。', error: errorData })
            }

        } catch (err) {
            setApiStatus({ success: false, message: 'ネットワークエラーまたはサーバーエラー。', error: err })
            console.error("DELETEエラー:", err)
        }
    }

    // 編集用の関数
    const handleEdit = (id) => {
        // 例: /edit/123 のようなURLに遷移
        navigate(`/edit/${id}`)
    }

    if (loading) {
        return <div className="dashboard-loading">データを読み込み中...</div>
    }

    if (error) {
        return <div className="dashboard-error">エラーが発生しました: {error.message}</div>
    }

    return (<>
        <h2>トレーニングプラン一覧</h2>

        {/* APIリクエストのステータス表示 */}
        {apiStatus.message && ( // ★apiStatus に変更★
            <p className={apiStatus.success ? "text-green-500" : "text-red-500"}>
                {apiStatus.message}
                {apiStatus.error && `: ${JSON.stringify(apiStatus.error)}`}
            </p>
        )}
            
        <div>
            {/* ★ カード形式のレイアウト ★ */}
            {data && data.length > 0 ? (
                <div className="training-cards-container">
                    {data.map((training) => (
                        <div key={training.id} className="training-card">
                           {/* ★トレーニング名はカードの最上部に配置し、一行全体を使う★ */}
                            <h3>{training.name}</h3> 

                            {/* ★頻度と目的を横並びにするラッパー★ */}
                            <div className="card-details-row">
                                {/* 目的 */}
                                <div className="card-details-item">
                                    <p><strong>目的:</strong></p>
                                    <p>{training.goal}</p>
                                </div>
                                {/* 頻度 */}
                                <div className="card-details-item">
                                    <p><strong>頻度:</strong></p>
                                    <p>{training.frequency}</p>
                                </div>
                                {/* 新しく追加されたexercise, start_date, end_dateも同様に配置可能 */}
                                <div className="card-details-item">
                                    <p><strong>運動内容:</strong></p>
                                    <p>{training.exercises}</p>
                                </div>
                                <div className="card-details-item">
                                    <p><strong>開始日:</strong></p>
                                    <p>{training.start_date}</p>
                                </div>
                                <div className="card-details-item">
                                    <p><strong>終了日:</strong></p>
                                    <p>{training.end_date}</p>
                                </div>
                            </div>

                            {/* ★AIからのプランをその下に配置★ */}
                            <div className="card-plan-section">
                                <p><strong>AIからのプラン:</strong></p>
                                <ul className="plan-list">
                                    {training.plan && training.plan.map((item, index) => {
                                        const days = ['日', '月', '火', '水', '木', '金', '土']
                                        const dateObj = new Date(item.date)
                                        const day = days[dateObj.getDay()]
                                        return (
                                            <li key={index} className='plan-item'>
                                                <p className="plan-item-date">{item.date} ({day}):</p>
                                                <p dangerouslySetInnerHTML={{ __html: item.exercise }} />
                                            </li>
                                        )
                                    })}
                                </ul>
                            </div>
                            
                            {/* アクションボタン群 */}
                            <div className="card-actions">
                                <button
                                    className="card-button edit"
                                    onClick={() => handleEdit(training.id)}
                                >
                                    変更
                                </button>
                                <button
                                    className="card-button delete"
                                    onClick={() => handleDelete(training.id)}
                                >
                                    削除
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            ) : (
                <p className="no-training-message">トレーニングプランがありません。新規作成しましょう！</p>
            )}

            <button
                onClick={() => navigate('/create')}
                className="new-plan-button"
            >
                新規作成
            </button>
        </div>
    </>)
}

export default DashboardPage