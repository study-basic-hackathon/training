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
    
    // APIから取得するデータの例
    // const sampleData = {
    //     trainings: [
    //         {
    //             id: 2,
    //             name: "3ヶ月ダイエット",
    //             goal: "やせる",
    //             exercise: "ランニング、水泳",
    //             frequency: "月、水、金",
    //             start_date: "2025-05-29",
    //             end_date: "2025-08-29",
    //             plan: [
    //             {
    //                 "date": "2025-05-29",
    //                 "exercise": "<ul><li>ランニング：30分 ジョギングペース</li><li>水泳：20分 ゆっくりとしたペース</li></ul>"
    //             },
    //             {
    //                 "date": "2025-05-31",
    //                 "exercise": "<ul><li>ランニング：35分 ジョギングペース</li><li>水泳：25分 中程度のペース</li></ul>"
    //             },
    //             {
    //                 "date": "2025-06-02",
    //                 "exercise": "<ul><li>ランニング：40分 ジョギングペース インターバル走30秒×3回</li><li>水泳：30分 中程度のペース</li></ul>"
    //             },
    //             {
    //                 "date": "2025-06-04",
    //                 "exercise": "<ul><li>ランニング：45分 ジョギングペース インターバル走45秒×4回</li><li>水泳：35分 中程度のペース</li></ul>"
    //             },
    //             {
    //                 "date": "2025-06-06",
    //                 "exercise": "<ul><li>ランニング：50分 ジョギングペース インターバル走60秒×5回</li><li>水泳：40分 中程度のペース</li></ul>"
    //             },
    //             {
    //                 "date": "2025-06-09",
    //                 "exercise": "<ul><li>ランニング：40分 ジョギングペース インターバル走45秒×4回</li><li>水泳：30分 中程度のペース</li></ul>"
    //             },
    //             {
    //                 "date": "2025-06-11",
    //                 "exercise": "<ul><li>ランニング：45分 ジョギングペース インターバル走60秒×5回</li><li>水泳：35分 中程度のペース</li></ul>"
    //             },
    //             {
    //                 "date": "2025-06-13",
    //                 "exercise": "<ul><li>ランニング：50分 ジョギングペース インターバル走75秒×6回</li><li>水泳：40分 中程度のペース</li></ul>"
    //             },
    //             {
    //                 "date": "2025-06-16",
    //                 "exercise": "<ul><li>ランニング：45分 ジョギングペース インターバル走60秒×5回</li><li>水泳：35分 中程度のペース</li></ul>"
    //             },
    //             {
    //                 "date": "2025-06-18",
    //                 "exercise": "<ul><li>ランニング：50分 ジョギングペース インターバル走75秒×6回</li><li>水泳：40分 中程度のペース</li></ul>"
    //             },
    //             {
    //                 "date": "2025-06-20",
    //                 "exercise": "<ul><li>ランニング：55分 ジョギングペース インターバル走90秒×7回</li><li>水泳：45分 中程度のペース</li></ul>"
    //             },
    //             {
    //                 "date": "2025-06-23",
    //                 "exercise": "<ul><li>ランニング：50分 ジョギングペース インターバル走75秒×6回</li><li>水泳：40分 中程度のペース</li></ul>"
    //             },
    //             {
    //                 "date": "2025-06-25",
    //                 "exercise": "<ul><li>ランニング：55分 ジョギングペース インターバル走90秒×7回</li><li>水泳：45分 中程度のペース</li></ul>"
    //             },
    //             {
    //                 "date": "2025-06-27",
    //                 "exercise": "<ul><li>ランニング：60分 ジョギングペース インターバル走105秒×8回</li><li>水泳：50分 中程度のペース</li></ul>"
    //             },
    //             {
    //                 "date": "2025-07-01",
    //                 "exercise": "<ul><li>ランニング：55分 ジョギングペース インターバル走90秒×7回</li><li>水泳：45分 中程度のペース</li></ul>"
    //             },
    //             {
    //                 "date": "2025-07-03",
    //                 "exercise": "<ul><li>ランニング：60分 ジョギングペース インターバル走105秒×8回</li><li>水泳：50分 中程度のペース</li></ul>"
    //             },
    //             {
    //                 "date": "2025-07-05",
    //                 "exercise": "<ul><li>ランニング：65分 ジョギングペース インターバル走120秒×9回</li><li>水泳：55分 中程度のペース</li></ul>"
    //             },
    //             {
    //                 "date": "2025-07-07",
    //                 "exercise": "<ul><li>ランニング：60分 ジョギングペース インターバル走105秒×8回</li><li>水泳：50分 中程度のペース</li></ul>"
    //             },
    //             {
    //                 "date": "2025-07-09",
    //                 "exercise": "<ul><li>ランニング：65分 ジョギングペース インターバル走120秒×9回</li><li>水泳：55分 中程度のペース</li></ul>"
    //             },
    //             {
    //                 "date": "2025-07-11",
    //                 "exercise": "<ul><li>ランニング：70分 ジョギングペース インターバル走135秒×10回</li><li>水泳：60分 中程度のペース</li></ul>"
    //             },
    //             {
    //                 "date": "2025-07-14",
    //                 "exercise": "<ul><li>ランニング：65分 ジョギングペース インターバル走120秒×9回</li><li>水泳：55分 中程度のペース</li></ul>"
    //             },
    //             {
    //                 "date": "2025-07-16",
    //                 "exercise": "<ul><li>ランニング：70分 ジョギングペース インターバル走135秒×10回</li><li>水泳：60分 中程度のペース</li></ul>"
    //             },
    //             {
    //                 "date": "2025-07-18",
    //                 "exercise": "<ul><li>ランニング：75分 ジョギングペース インターバル走150秒×11回</li><li>水泳：65分 中程度のペース</li></ul>"
    //             },
    //             {
    //                 "date": "2025-07-21",
    //                 "exercise": "<ul><li>ランニング：70分 ジョギングペース インターバル走135秒×10回</li><li>水泳：60分 中程度のペース</li></ul>"
    //             },
    //             {
    //                 "date": "2025-07-23",
    //                 "exercise": "<ul><li>ランニング：75分 ジョギングペース インターバル走150秒×11回</li><li>水泳：65分 中程度のペース</li></ul>"
    //             },
    //             {
    //                 "date": "2025-07-25",
    //                 "exercise": "<ul><li>ランニング：80分 ジョギングペース インターバル走165秒×12回</li><li>水泳：70分 中程度のペース</li></ul>"
    //             },
    //             {
    //                 "date": "2025-07-28",
    //                 "exercise": "<ul><li>ランニング：75分 ジョギングペース インターバル走150秒×11回</li><li>水泳：65分 中程度のペース</li></ul>"
    //             },
    //             {
    //                 "date": "2025-07-30",
    //                 "exercise": "<ul><li>ランニング：80分 ジョギングペース インターバル走165秒×12回</li><li>水泳：70分 中程度のペース</li></ul>"
    //             },
    //             {
    //                 "date": "2025-08-01",
    //                 "exercise": "<ul><li>ランニング：85分 ジョギングペース インターバル走180秒×13回</li><li>水泳：75分 中程度のペース</li></ul>"
    //             },
    //             {
    //                 "date": "2025-08-04",
    //                 "exercise": "<ul><li>ランニング：80分 ジョギングペース インターバル走165秒×12回</li><li>水泳：70分 中程度のペース</li></ul>"
    //             },
    //             {
    //                 "date": "2025-08-06",
    //                 "exercise": "<ul><li>ランニング：85分 ジョギングペース インターバル走180秒×13回</li><li>水泳：75分 中程度のペース</li></ul>"
    //             },
    //             {
    //                 "date": "2025-08-08",
    //                 "exercise": "<ul><li>ランニング：90分 ジョギングペース インターバル走195秒×14回</li><li>水泳：80分 中程度のペース</li></ul>"
    //             },
    //             {
    //                 "date": "2025-08-11",
    //                 "exercise": "<ul><li>ランニング：85分 ジョギングペース インターバル走180秒×13回</li><li>水泳：75分 中程度のペース</li></ul>"
    //             },
    //             {
    //                 "date": "2025-08-13",
    //                 "exercise": "<ul><li>ランニング：90分 ジョギングペース インターバル走195秒×14回</li><li>水泳：80分 中程度のペース</li></ul>"
    //             },
    //             {
    //                 "date": "2025-08-15",
    //                 "exercise": "<ul><li>ランニング：95分 ジョギングペース インターバル走210秒×15回</li><li>水泳：85分 中程度のペース</li></ul>"
    //             },
    //             {
    //                 "date": "2025-08-18",
    //                 "exercise": "<ul><li>ランニング：90分 ジョギングペース インターバル走195秒×14回</li><li>水泳：80分 中程度のペース</li></ul>"
    //             },
    //             {
    //                 "date": "2025-08-20",
    //                 "exercise": "<ul><li>ランニング：95分 ジョギングペース インターバル走210秒×15回</li><li>水泳：85分 中程度のペース</li></ul>"
    //             },
    //             {
    //                 "date": "2025-08-22",
    //                 "exercise": "<ul><li>ランニング：100分 ジョギングペース インターバル走225秒×16回</li><li>水泳：90分 中程度のペース</li></ul>"
    //             },
    //             {
    //                 "date": "2025-08-25",
    //                 "exercise": "<ul><li>ランニング：95分 ジョギングペース インターバル走210秒×15回</li><li>水泳：85分 中程度のペース</li></ul>"
    //             },
    //             {
    //                 "date": "2025-08-27",
    //                 "exercise": "<ul><li>ランニング：100分 ジョギングペース インターバル走225秒×16回</li><li>水泳：90分 中程度のペース</li></ul>"
    //             }
    //             ],
    //         },
    //         {
    //             id: 3,
    //             name: "Sample Training",
    //             goal: "Sample Goal",
    //             frequency: "3 times a week",
    //             plan: [{"date": "2025-01-01", "exercise": "Sample Exercise"}],
    //         },
    //     ]
    // }

    // 開発用
    // ★ダミーデータでPOSTリクエストを送信する関数★
    const handlePostDummyData = async () => {
        setApiStatus({ success: false, message: '送信中...', error: null }) // ★apiStatus に変更★

        const dummyData = {
            name: "ダミープラン " + new Date().toLocaleTimeString(), // テストごとに名前が変わるように
            exercises: "腕立て伏せ, 腹筋, スクワット",
            goal: "体重維持",
            frequency: "月・水・金",
            start_date: "2025-06-15", // 例として未来の日付
            end_date: "2025-07-15",   // 例として未来の日付
        }
        try {
            const response = await fetchData(API_URL, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(dummyData),
            })

            if (response && response.id) {
                setApiStatus({ success: true, message: 'ダミーデータでプランが作成されました！', error: null }) 
                fetchTrainingPlans() // データが更新されたら再取得
            } else {
                const errorData = response || { message: '不明なエラー' }
                setApiStatus({ success: false, message: 'プラン作成に失敗しました。', error: errorData }) 
            }
        } catch (err) {
            setApiStatus({ success: false, message: 'ネットワークエラーまたはサーバーエラー。', error: err })
            console.error("POSTエラー:", err)
        }
    }
    // ここまで開発用

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

    // ★トレーニングプランを編集ページにナビゲートする関数★
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

        <div className="button-group" style={{ backgroundColor: '#777777', padding: '10px', borderRadius: '5px', marginBottom: '20px' }}>
            <h2>開発用</h2>
            <p>APIステータスを表示</p>
            {/* APIリクエストのステータス表示 */}
            {apiStatus.message && ( // ★apiStatus に変更★
                <p className={apiStatus.success ? "text-green-500" : "text-red-500"}>
                    {apiStatus.message}
                    {apiStatus.error && `: ${JSON.stringify(apiStatus.error)}`}
                </p>
            )}

            <button
                onClick={handlePostDummyData}
                className="test-post-button"
                style={{ marginLeft: '10px', backgroundColor: '#4CAF50', color: 'white', padding: '10px 15px', border: 'none', borderRadius: '5px', cursor: 'pointer' }}
            >
                ダミーデータでプラン作成
            </button>
        </div>
            
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