// frontend/src/pages/AITest.jsx
import React, { useState, useEffect } from 'react';
import useFetchData from '../hooks/useFetchData.js'; // API呼び出し用カスタムフック
import './AITest.css'; // このページのスタイルシートをインポート

// バックエンドで定義したAI生成テスト用エンドポイントのURL
// このエンドポイントは、フロントエンドから送られたトレーニングプランの要件に基づき、
// ダミーのAI生成プランを返します。
const AI_TEST_API_URL = '/api/training/ai_test/'; 

const AITest = () => {
    // API呼び出しの状態（データ、ローディング、エラー）を管理するuseFetchDataフック
    // `aiResponse` にAPIからのデータ（AI生成プラン）が格納されます。
    const { data: aiResponse, loading, error, fetchData } = useFetchData(); 
    
    // トレーニングプランの入力フォームデータを管理するためのステート
    // TrainingForm.jsx と同様の構造を持ちます。
    const [formData, setFormData] = useState({
        name: '',          // プラン名
        exercises: '',     // 運動内容
        goal: '',          // 目的
        frequency: '',     // 頻度
        start_date: '', // 今日の日付をデフォルトに
        end_date: ''   // 今日の日付をデフォルトに
    });

        // ★フォームにダミーデータを自動入力するハンドラー★
    const handleAutoFill = () => {
        setFormData({
            // プラン名にタイムスタンプを追加して自動入力
            name: `自動入力プラン ${new Date().toLocaleString()}`, // 現在の日時を追加
            exercises: "筋トレ、ジョギング",
            goal: "体重を5kg減らし、体脂肪率を3%下げる。基礎体力を向上させ、疲れにくい体を作る。",
            frequency: "週1回",
            start_date: "2025-07-01",
            end_date: "2025-07-30"
        });
        setApiStatus({ success: false, message: '入力が自動補完されました。', error: null });
    };

    useEffect(() => {
        handleAutoFill(); // コンポーネントがマウントされたときに自動入力を実行
    }, []); // 初回マウント時のみ実行

    // APIリクエストの成功/失敗メッセージを管理するステート
    const [apiStatus, setApiStatus] = useState({ success: false, message: '', error: null });

    // フォームの入力値が変更されたときに formData ステートを更新するハンドラー
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    // 「AIプランを生成」ボタンがクリックされたときのハンドラー
    // フォームデータをバックエンドに送信し、AI生成プランを取得します。
    const handleGeneratePlan = async (e) => {
        e.preventDefault(); // フォームのデフォルト送信を防ぐ

        setApiStatus({ success: false, message: 'AIプラン生成中...', error: null });

        try {
            // バックエンドのAIテスト用エンドポイントにPOSTリクエストを送信
            // body には、AIに渡すための formData をJSON形式で含めます。
            const response = await fetchData(AI_TEST_API_URL, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData), // ここで formData を送信
            });

            // レスポンスに 'plan' フィールドがあるか確認して成功メッセージを表示
            if (response && response.plan) { 
                setApiStatus({ success: true, message: 'AIプランが正常に生成されました！', error: null });
                // `aiResponse` は `useFetchData` が自動的にセットしてくれるので、ここではセットしません。
            } else {
                // APIからのエラーレスポンスを処理
                const errorData = response || { message: '不明なエラー' };
                setApiStatus({ success: false, message: 'AIプラン生成に失敗しました。', error: errorData });
                console.error("AIプラン生成エラー:", errorData);
            }
        } catch (err) {
            // ネットワークエラーなど、fetch中に発生した例外をキャッチ
            setApiStatus({ success: false, message: 'ネットワークエラーまたはサーバーエラー。', error: err });
            console.error("API呼び出しエラー:", err);
        }
    };

    // フォームのリセットハンドラー
    const handleReset = (e) => {
        e.preventDefault();
        setFormData({
            name: '',
            exercises: '',
            goal: '',
            frequency: '',
            start_date: new Date().toISOString().split('T')[0],
            end_date: new Date().toISOString().split('T')[0],
        });
        setApiStatus({ success: false, message: '', error: null });
        // AIレスポンスもクリアしたい場合
        // setAiResponse(null); // useFetchDataからのdataをリセットする方法を検討
    };


    return (
        <div className="ai-test-container">
            <h2>AI生成プラン テストページ</h2>

            {/* 適当な値を入れる【自動入力】ボタン */}
            <button 
                onClick={handleAutoFill} 
                className="autofill-button" // CSSファイルで定義されたクラスを使用
            >
                適当な値を入れる【自動入力】
            </button>


            {/* APIリクエストのステータス表示 */}
            {apiStatus.message && (
                <p className={apiStatus.success ? "text-green-500" : "text-red-500"}>
                    {apiStatus.message}
                    {apiStatus.error && `: ${JSON.stringify(apiStatus.error)}`}
                </p>
            )}

            {/* AIへの入力フォーム */}
            <form onSubmit={handleGeneratePlan} className="ai-input-form">
                <div className="form-group">
                    <label htmlFor="name">プラン名:</label>
                    <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        placeholder="例: 3ヶ月で健康的な体作り"
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="goal">目的:</label>
                    <textarea
                        id="goal"
                        name="goal"
                        value={formData.goal}
                        onChange={handleChange}
                        placeholder="例: 体重を5kg減らし、体脂肪率を3%下げる。"
                        rows="3"
                        required
                    ></textarea>
                </div>
                <div className="form-group">
                    <label htmlFor="exercises">運動内容:</label>
                    <textarea
                        id="exercises"
                        name="exercises"
                        value={formData.exercises}
                        onChange={handleChange}
                        placeholder="例: 週3回の筋力トレーニング、週2回の有酸素運動"
                        rows="3"
                        required
                    ></textarea>
                </div>
                <div className="form-group">
                    <label htmlFor="frequency">頻度:</label>
                    <input
                        type="text"
                        id="frequency"
                        name="frequency"
                        value={formData.frequency}
                        onChange={handleChange}
                        placeholder="例: 週5回（筋トレ3回、有酸素運動2回）"
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="start_date">開始日:</label>
                    <input
                        type="date"
                        id="start_date"
                        name="start_date"
                        value={formData.start_date}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="end_date">終了日:</label>
                    <input
                        type="date"
                        id="end_date"
                        name="end_date"
                        value={formData.end_date}
                        onChange={handleChange}
                        required
                    />
                </div>

                <div className="form-actions">
                    <button type="submit" disabled={loading} className="generate-button">
                        {loading ? '生成中...' : 'AIプランを生成'}
                    </button>
                    <button type="button" onClick={handleReset} className="reset-button">
                        リセット
                    </button>
                </div>
            </form>

            {/* ローディング中の表示 */}
            {loading && <div className="ai-loading">AIプランを生成中...</div>}

            {/* エラー発生時の表示 */}
            {error && <div className="ai-error">エラーが発生しました: {error.message}</div>}

            {/* AI生成プランの表示 */}
            {aiResponse && aiResponse.plan && (
                <div className="ai-result-section">
                    <h3>生成されたAIプラン:</h3>
                    <ul className="ai-plan-list">
                        {aiResponse.plan.map((item, index) => {
                            const days = ['日', '月', '火', '水', '木', '金', '土'];
                            const dateObj = new Date(item.date + 'T00:00:00'); 
                            const dayOfWeek = days[dateObj.getDay()];
                            return (
                                <li key={index} className="ai-plan-item">
                                    <p className="ai-plan-date">{item.date} ({dayOfWeek}):</p>
                                    <div dangerouslySetInnerHTML={{ __html: item.exercise }} />
                                </li>
                            );
                        })}
                    </ul>
                </div>
            )}
        </div>
    );
};

export default AITest;
