import React, { useEffect } from 'react'
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

    useEffect(() => {
        fetchData(API_URL, { method: 'GET' })
    }, [fetchData]) // fetchData がメモ化されているので依存配列に含める

    // Show用の関数
    const handleShow = (id) => {
        // 例: /edit/123 のようなURLに遷移
        navigate(`/result/${id}`)
    }

    // ローディング中の表示
    if (loading) {
        return <div className="dashboard-loading">データを読み込み中...</div>
    }

    // エラー発生時の表示
    if (error) {
        // 本番用：バックエンドとの通信でエラーが発生した場合はこれだけ表示して止める
        // return <div className="dashboard-error">エラーが発生しました: {error.message}</div>

        // 開発用：エラーの詳細をコンソールに出力し、画面には簡単なメッセージを表示
        console.error("DashboardPage Error:", error)
    }

    return (<>
        <h2>トレーニングプラン一覧</h2>
            
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
                            
                            {/* アクションボタン群 */}
                            <div className="card-actions">
                                <button
                                    className="card-button show"
                                    onClick={() => handleShow(training.id)}
                                >
                                    プランを見る
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