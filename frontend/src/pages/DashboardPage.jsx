import React, { useEffect } from 'react'
import useFetchData from '../hooks/useFetchData.js'
import { useNavigate } from 'react-router-dom'
import './DashboardPage.css'

// 例として、ダッシュボードに表示するアイテムのAPIエンドポイント
// 実際のDjangoのエンドポイントに合わせて変更してください
const API_URL = '/api/training';

const DashboardPage = () => {
    const { data, loading, error, fetchData } = useFetchData()  // カスタムフックを使用してデータを取得
    const navigate = useNavigate(); // useNavigateフックを使用してページ遷移を管理

    // コンポーネントがマウントされたときにデータを取得
    useEffect(() => {
        fetchData(API_URL, { method: 'GET' }); // URLとGETメソッドを指定して呼び出す
    }, [fetchData]); // fetchDataがメモ化されているので依存配列に含める
    
    // APIから取得するデータの例
    const sampleData = {
        trainings: [
            {
                id: 2,
                name: "3ヶ月ダイエット",
                goal: "やせる",
                exercise: "ランニング、水泳",
                frequency: "月、水、金",
                start_date: "2025-05-29",
                end_date: "2025-08-29",
                plan: [
                {
                    "date": "2025-05-29",
                    "exercise": "<ul><li>ランニング：30分 ジョギングペース</li><li>水泳：20分 ゆっくりとしたペース</li></ul>"
                },
                {
                    "date": "2025-05-31",
                    "exercise": "<ul><li>ランニング：35分 ジョギングペース</li><li>水泳：25分 中程度のペース</li></ul>"
                },
                {
                    "date": "2025-06-02",
                    "exercise": "<ul><li>ランニング：40分 ジョギングペース インターバル走30秒×3回</li><li>水泳：30分 中程度のペース</li></ul>"
                },
                {
                    "date": "2025-06-04",
                    "exercise": "<ul><li>ランニング：45分 ジョギングペース インターバル走45秒×4回</li><li>水泳：35分 中程度のペース</li></ul>"
                },
                {
                    "date": "2025-06-06",
                    "exercise": "<ul><li>ランニング：50分 ジョギングペース インターバル走60秒×5回</li><li>水泳：40分 中程度のペース</li></ul>"
                },
                {
                    "date": "2025-06-09",
                    "exercise": "<ul><li>ランニング：40分 ジョギングペース インターバル走45秒×4回</li><li>水泳：30分 中程度のペース</li></ul>"
                },
                {
                    "date": "2025-06-11",
                    "exercise": "<ul><li>ランニング：45分 ジョギングペース インターバル走60秒×5回</li><li>水泳：35分 中程度のペース</li></ul>"
                },
                {
                    "date": "2025-06-13",
                    "exercise": "<ul><li>ランニング：50分 ジョギングペース インターバル走75秒×6回</li><li>水泳：40分 中程度のペース</li></ul>"
                },
                {
                    "date": "2025-06-16",
                    "exercise": "<ul><li>ランニング：45分 ジョギングペース インターバル走60秒×5回</li><li>水泳：35分 中程度のペース</li></ul>"
                },
                {
                    "date": "2025-06-18",
                    "exercise": "<ul><li>ランニング：50分 ジョギングペース インターバル走75秒×6回</li><li>水泳：40分 中程度のペース</li></ul>"
                },
                {
                    "date": "2025-06-20",
                    "exercise": "<ul><li>ランニング：55分 ジョギングペース インターバル走90秒×7回</li><li>水泳：45分 中程度のペース</li></ul>"
                },
                {
                    "date": "2025-06-23",
                    "exercise": "<ul><li>ランニング：50分 ジョギングペース インターバル走75秒×6回</li><li>水泳：40分 中程度のペース</li></ul>"
                },
                {
                    "date": "2025-06-25",
                    "exercise": "<ul><li>ランニング：55分 ジョギングペース インターバル走90秒×7回</li><li>水泳：45分 中程度のペース</li></ul>"
                },
                {
                    "date": "2025-06-27",
                    "exercise": "<ul><li>ランニング：60分 ジョギングペース インターバル走105秒×8回</li><li>水泳：50分 中程度のペース</li></ul>"
                },
                {
                    "date": "2025-07-01",
                    "exercise": "<ul><li>ランニング：55分 ジョギングペース インターバル走90秒×7回</li><li>水泳：45分 中程度のペース</li></ul>"
                },
                {
                    "date": "2025-07-03",
                    "exercise": "<ul><li>ランニング：60分 ジョギングペース インターバル走105秒×8回</li><li>水泳：50分 中程度のペース</li></ul>"
                },
                {
                    "date": "2025-07-05",
                    "exercise": "<ul><li>ランニング：65分 ジョギングペース インターバル走120秒×9回</li><li>水泳：55分 中程度のペース</li></ul>"
                },
                {
                    "date": "2025-07-07",
                    "exercise": "<ul><li>ランニング：60分 ジョギングペース インターバル走105秒×8回</li><li>水泳：50分 中程度のペース</li></ul>"
                },
                {
                    "date": "2025-07-09",
                    "exercise": "<ul><li>ランニング：65分 ジョギングペース インターバル走120秒×9回</li><li>水泳：55分 中程度のペース</li></ul>"
                },
                {
                    "date": "2025-07-11",
                    "exercise": "<ul><li>ランニング：70分 ジョギングペース インターバル走135秒×10回</li><li>水泳：60分 中程度のペース</li></ul>"
                },
                {
                    "date": "2025-07-14",
                    "exercise": "<ul><li>ランニング：65分 ジョギングペース インターバル走120秒×9回</li><li>水泳：55分 中程度のペース</li></ul>"
                },
                {
                    "date": "2025-07-16",
                    "exercise": "<ul><li>ランニング：70分 ジョギングペース インターバル走135秒×10回</li><li>水泳：60分 中程度のペース</li></ul>"
                },
                {
                    "date": "2025-07-18",
                    "exercise": "<ul><li>ランニング：75分 ジョギングペース インターバル走150秒×11回</li><li>水泳：65分 中程度のペース</li></ul>"
                },
                {
                    "date": "2025-07-21",
                    "exercise": "<ul><li>ランニング：70分 ジョギングペース インターバル走135秒×10回</li><li>水泳：60分 中程度のペース</li></ul>"
                },
                {
                    "date": "2025-07-23",
                    "exercise": "<ul><li>ランニング：75分 ジョギングペース インターバル走150秒×11回</li><li>水泳：65分 中程度のペース</li></ul>"
                },
                {
                    "date": "2025-07-25",
                    "exercise": "<ul><li>ランニング：80分 ジョギングペース インターバル走165秒×12回</li><li>水泳：70分 中程度のペース</li></ul>"
                },
                {
                    "date": "2025-07-28",
                    "exercise": "<ul><li>ランニング：75分 ジョギングペース インターバル走150秒×11回</li><li>水泳：65分 中程度のペース</li></ul>"
                },
                {
                    "date": "2025-07-30",
                    "exercise": "<ul><li>ランニング：80分 ジョギングペース インターバル走165秒×12回</li><li>水泳：70分 中程度のペース</li></ul>"
                },
                {
                    "date": "2025-08-01",
                    "exercise": "<ul><li>ランニング：85分 ジョギングペース インターバル走180秒×13回</li><li>水泳：75分 中程度のペース</li></ul>"
                },
                {
                    "date": "2025-08-04",
                    "exercise": "<ul><li>ランニング：80分 ジョギングペース インターバル走165秒×12回</li><li>水泳：70分 中程度のペース</li></ul>"
                },
                {
                    "date": "2025-08-06",
                    "exercise": "<ul><li>ランニング：85分 ジョギングペース インターバル走180秒×13回</li><li>水泳：75分 中程度のペース</li></ul>"
                },
                {
                    "date": "2025-08-08",
                    "exercise": "<ul><li>ランニング：90分 ジョギングペース インターバル走195秒×14回</li><li>水泳：80分 中程度のペース</li></ul>"
                },
                {
                    "date": "2025-08-11",
                    "exercise": "<ul><li>ランニング：85分 ジョギングペース インターバル走180秒×13回</li><li>水泳：75分 中程度のペース</li></ul>"
                },
                {
                    "date": "2025-08-13",
                    "exercise": "<ul><li>ランニング：90分 ジョギングペース インターバル走195秒×14回</li><li>水泳：80分 中程度のペース</li></ul>"
                },
                {
                    "date": "2025-08-15",
                    "exercise": "<ul><li>ランニング：95分 ジョギングペース インターバル走210秒×15回</li><li>水泳：85分 中程度のペース</li></ul>"
                },
                {
                    "date": "2025-08-18",
                    "exercise": "<ul><li>ランニング：90分 ジョギングペース インターバル走195秒×14回</li><li>水泳：80分 中程度のペース</li></ul>"
                },
                {
                    "date": "2025-08-20",
                    "exercise": "<ul><li>ランニング：95分 ジョギングペース インターバル走210秒×15回</li><li>水泳：85分 中程度のペース</li></ul>"
                },
                {
                    "date": "2025-08-22",
                    "exercise": "<ul><li>ランニング：100分 ジョギングペース インターバル走225秒×16回</li><li>水泳：90分 中程度のペース</li></ul>"
                },
                {
                    "date": "2025-08-25",
                    "exercise": "<ul><li>ランニング：95分 ジョギングペース インターバル走210秒×15回</li><li>水泳：85分 中程度のペース</li></ul>"
                },
                {
                    "date": "2025-08-27",
                    "exercise": "<ul><li>ランニング：100分 ジョギングペース インターバル走225秒×16回</li><li>水泳：90分 中程度のペース</li></ul>"
                }
                ],
            },
            {
                id: 3,
                name: "Sample Training",
                goal: "Sample Goal",
                frequency: "3 times a week",
                plan: [{"date": "2025-01-01", "exercise": "Sample Exercise"}],
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
                                {/* 新しく追加されたexercise, start_date, end_dateも同様に配置可能 */}
                                <div className="card-details-item">
                                    <p><strong>運動内容:</strong></p>
                                    <p>{training.exercise}</p>
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
                                                <p dangerouslySetInnerHTML={{ __html: item.exercise }} />
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