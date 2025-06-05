import React from 'react'
import useFetchData from '../hooks/useFetchData.js'
import { useNavigate } from 'react-router-dom'
import './DashboardPage.css'

// 例として、ダッシュボードに表示するアイテムのAPIエンドポイント
// 実際のDjangoのエンドポイントに合わせて変更してください
const API_URL = '/api/training';

const DashboardPage = () => {
    const { data, loading, error } = useFetchData(API_URL)
    const navigate = useNavigate();

    // APIから取得するデータの例
    const sampleData = {
        trainings: [
            {
                name: "Sample Training",
                goal: "Sample Goal",
                frequency: "3 times a week",
                plan: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
            },
            {
                name: "Sample Training",
                goal: "Sample Goal",
                frequency: "3 times a week",
                plan: "AI generated plan",
            },
            {
                name: "Sample Training",
                goal: "Sample Goal",
                frequency: "3 times a week",
                plan: "AI generated plan",
            },
        ]
    }

    if (loading) {
        return <div className="dashboard-loading">データを読み込み中...</div>
    }

    if (error) {
        return <div className="dashboard-error">エラーが発生しました: {error.message}</div>
    }

    return (<>
        <h2>トレーニングプラン一覧</h2>

        {/* サンプルコード 現状のレスポンス：Hello From the Backend */}
        {data && <p className="api-message">{data.message}</p>}
        {!data && <p>データがありません。</p>}   {/* データがない場合の表示（念のため） */}
            
        <div>
            {/* ★ カード形式のレイアウトに変更 ★ */}
            {sampleData && sampleData.trainings && sampleData.trainings.length > 0 ? (
                <div className="training-cards-container">
                    {sampleData.trainings.map((training) => (
                        <div key={training.id} className="training-card">
                            <div className="card-content-wrapper">
                                <div className="card-info-item name">
                                    <p><strong>トレーニング名:</strong></p>
                                    <p>{training.name}</p> 
                                </div>
                                <div className="card-info-item goal">
                                    <p><strong>目的:</strong></p>
                                    <p>{training.goal}</p>
                                </div>
                                <div className="card-info-item frequency">
                                    <p><strong>頻度:</strong></p>
                                    <p>{training.frequency}</p>
                                </div>
                                <div className="card-info-item plan">
                                    <p><strong>AIからのプラン:</strong></p>
                                    <p className="plan-text">{training.plan}</p>
                                </div>
                            </div>

                            <div className="card-actions">
                                <button
                                    className="card-button edit"
                                    // onClick={() => handleEdit(training.id)}
                                >
                                    変更
                                </button>
                                <button
                                    className="card-button delete"
                                    // onClick={() => handleDelete(training.id)}
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