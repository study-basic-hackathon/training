import React, { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom' // URLパラメーターとナビゲーション用
import './PlanResultPage.css' // このページのスタイルシート

// APIのベースURL（トレーニングプラン個別取得用）
const API_URL = '/api/training/'

const dummyTrainingPlan = {
    id: 1,
    name: "初期ダミープラン A",
    exercises: "ウォーキング, ストレッチ",
    goal: "健康維持",
    frequency: "毎日",
    start_date: "2025-06-01",
    end_date: "2025-09-01",
    plan: [
        { date: "2025-06-01", exercise: "<ul><li>ウォーキング 30分</li><li>軽いストレッチ 10分</li></ul>" },
        { date: "2025-06-02", exercise: "<ul><li>全身ストレッチ 20分</li></ul>" },
        { date: "2025-06-03", exercise: "<ul><li>軽いジョギング 15分</li></ul>" },
    ],
    status: "active"
}

const PlanResultPage = () => {
    const { id } = useParams() // URLからIDを取得
    const navigate = useNavigate()
    const [trainingPlan, setTrainingPlan] = useState(null)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)

    useEffect(() => {
        if (!id) {
            setError('プランIDが指定されていません。')
            setLoading(false)
            return
        }
        const fetchTrainingPlan = async () => {
            try {
                setLoading(true)
                const response = await fetch(`${API_URL}${id}/`)
                if (!response.ok) {
                    throw new Error('プランの取得に失敗しました')
                }
                const data = await response.json()
                setTrainingPlan(data)
            } catch (err) {
                setError(err.message)
            } finally {
                setLoading(false)
            }
        }
        fetchTrainingPlan()
    }, [id])

    const handleBackToDashboard = () => {
        navigate('/dashboard')
    }

    if (loading) {
        return (
            <div className="plan-result-container">
                <div className="loading">読み込み中...</div>
            </div>
        )
    }

    if (error) {
        return (
            <div className="plan-result-container">
                <div className="error">{error}</div>
                <button className="back-button" onClick={handleBackToDashboard}>
                    ダッシュボードに戻る
                </button>
            </div>
        )
    }

    if (!trainingPlan) {
        return (
            <div className="plan-result-container">
                <div className="error">プラン情報が見つかりません。</div>
                <button className="back-button" onClick={handleBackToDashboard}>
                    ダッシュボードに戻る
                </button>
            </div>
        )
    }

    return (
        <div className="plan-result-container">
            <h2>トレーニングプラン詳細</h2>

            <div className="plan-details">
                <div className="plan-header">
                    <h3>{trainingPlan.name}</h3>
                    <span className={`status ${trainingPlan.status || 'active'}`}>
                        {trainingPlan.status === 'active' ? 'アクティブ' : '非アクティブ'}
                    </span>
                </div>

                <div className="plan-info">
                    <div className="info-item">
                        <label>目標:</label>
                        <span>{trainingPlan.goal}</span>
                    </div>
                    <div className="info-item">
                        <label>運動:</label>
                        <span>{trainingPlan.exercises}</span>
                    </div>
                    <div className="info-item">
                        <label>頻度:</label>
                        <span>{trainingPlan.frequency}</span>
                    </div>
                    <div className="info-item">
                        <label>開始日:</label>
                        <span>{trainingPlan.start_date}</span>
                    </div>
                    <div className="info-item">
                        <label>終了日:</label>
                        <span>{trainingPlan.end_date}</span>
                    </div>
                </div>

                {trainingPlan.plan && (
                    <div className="plan-schedule">
                        <h4>トレーニングスケジュール</h4>
                        <div className="schedule-list">
                            {trainingPlan.plan.map((day, idx) => (
                                <div key={idx} className="schedule-item">
                                    <div className="date">{day.date}</div>
                                    <div 
                                        className="exercise" 
                                        dangerouslySetInnerHTML={{ __html: day.exercise }}
                                    />
                                </div>
                            ))}
                        </div>
                    </div>
                )}
            </div>

            <button className="back-button" onClick={handleBackToDashboard}>
                ダッシュボードに戻る
            </button>
        </div>
    )
}

export default PlanResultPage

