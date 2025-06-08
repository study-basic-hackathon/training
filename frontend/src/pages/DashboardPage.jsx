import React from 'react'
import useFetchData from '../hooks/useFetchData.js'
import { useNavigate } from 'react-router-dom'
import './DashboardPage.css'

// 例として、ダッシュボードに表示するアイテムのAPIエンドポイント
// 実際のDjangoのエンドポイントに合わせて変更してください
const API_URL = '/api/training';

const DashboardPage = () => {
    const { data, loading, error } = useFetchData(API_URL)  // カスタムフックを使用してデータを取得
    const navigate = useNavigate(); // useNavigateフックを使用してページ遷移を管理

    // APIから取得するデータの例
    const sampleData = {
        trainings: [
            {
                id: 1,
                name: "３か月で-5kg減量するぞ！",
                goal: "減量",
                excercise: "筋トレ、ランニング",
                frequency: "月、水、金",
                start_date: "2025-7-01",
                end_date: "2025-9-30",
                plan:[
                { "date": "2025-07-01", "excersize": "<ul><li>スクワット：10回 × 3セット</li><li>プッシュアップ（膝つきでも可）：10回 × 3セット</li><li>バックエクステンション：10回 × 3セット</li><li>プランク：30秒 × 3セット</li></ul>" },
                { "date": "2025-07-04", "excersize": "ランニング：30分" },
                { "date": "2025-07-07", "excersize": "<ul><li>ランジ：左右各10回 × 3セット</li><li>ダンベルロウ（ペットボトルでも可）：左右各10回 × 3セット</li><li>ヒップリフト：15回 × 3セット</li><li>サイドプランク：左右各20秒 × 3セット</li></ul>" },
                { "date": "2025-07-09", "excersize": "ランニング：30分" },
                { "date": "2025-07-11", "excersize": "<ul><li>スクワット：12回 × 3セット</li><li>プッシュアップ：12回 × 3セット</li><li>バックエクステンション：12回 × 3セット</li><li>プランク：40秒 × 3セット</li></ul>" },
                { "date": "2025-07-14", "excersize": "ランニング：30分" },
                { "date": "2025-07-16", "excersize": "<ul><li>ランジ：左右各12回 × 3セット</li><li>ダンベルロウ：左右各12回 × 3セット</li><li>ヒップリフト：18回 × 3セット</li><li>サイドプランク：左右各30秒 × 3セット</li></ul>" },
                { "date": "2025-07-18", "excersize": "ランニング：30分" },
                { "date": "2025-07-21", "excersize": "<ul><li>スクワット：15回 × 3セット</li><li>プッシュアップ：15回 × 3セット</li><li>バックエクステンション：15回 × 3セット</li><li>プランク：50秒 × 3セット</li></ul>" },
                { "date": "2025-07-23", "excersize": "ランニング：30分" },
                { "date": "2025-07-25", "excersize": "<ul><li>ランジ：左右各15回 × 3セット</li><li>ダンベルロウ：左右各15回 × 3セット</li><li>ヒップリフト：20回 × 3セット</li><li>サイドプランク：左右各40秒 × 3セット</li></ul>" },
                { "date": "2025-07-28", "excersize": "ランニング：30分" },
                { "date": "2025-07-30", "excersize": "<ul><li>スクワット：15回 × 3セット</li><li>プッシュアップ：15回 × 3セット</li><li>バックエクステンション：15回 × 3セット</li><li>プランク：60秒 × 3セット</li></ul>" }
                ],
            },
            {
                id: 2,
                name: "Sample Training",
                goal: "Sample Goal",
                frequency: "3 times a week",
                plan: [{"date": "2025-01-01", "excersize": "Sample Exercise"}],
            },
            {
                id: 3,
                name: "Sample Training",
                goal: "Sample Goal",
                frequency: "3 times a week",
                plan: [{"date": "2025-01-01", "excersize": "Sample Exercise"}],
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
            {/* ★ カード形式のレイアウト ★ */}
            {sampleData && sampleData.trainings && sampleData.trainings.length > 0 ? (
                <div className="training-cards-container">
                    {sampleData.trainings.map((training) => (
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
                                {/* 新しく追加されたexcercise, start_date, end_dateも同様に配置可能 */}
                                <div className="card-details-item">
                                    <p><strong>運動内容:</strong></p>
                                    <p>{training.excercise}</p>
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
                                    {training.plan.map((item, index) => {
                                        const days = ['日', '月', '火', '水', '木', '金', '土'];
                                        const dateObj = new Date(item.date);
                                        const day = days[dateObj.getDay()];
                                        return (
                                            <li key={index} className='plan-item'>
                                                <p className="plan-item-date">{item.date} ({day}):</p>
                                                <p dangerouslySetInnerHTML={{ __html: item.excersize }} />
                                            </li>
                                        );
                                    })}
                                </ul>
                            </div>
                            
                            {/* アクションボタン群 */}
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