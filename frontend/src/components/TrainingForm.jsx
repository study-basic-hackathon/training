// src/components/TrainingForm.jsx

import React, { useState } from 'react';

function TrainingForm() {
  const [formData, setFormData] = useState({
    goal_text: '',
    plan_name: '',
    created_date: new Date().toISOString().split('T')[0]
  });
  
  const [aiResponse, setAiResponse] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // リセットボタンの処理
  const handleReset = (e) => {
    e.preventDefault(); // デフォルトの動作を防ぐ
    setFormData({
      goal_text: '',
      plan_name: '',
      created_date: new Date().toISOString().split('T')[0]
    });
    setAiResponse('');
    setError('');
    setSuccess(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess(false);
    setAiResponse('');

    try {
      // ユーザーIDを取得（ローカルストレージまたはコンテキストから）
      const userId = localStorage.getItem('userId');
      if (!userId) {
        throw new Error('ユーザーが登録されていません。先にログインしてください。');
      }

      const response = await fetch('http://localhost:8000/api/training/create_with_ai/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...formData,
          user_id: userId
        })
      });

      if (!response.ok) {
        throw new Error('送信に失敗しました');
      }

      const data = await response.json();
      setAiResponse(data.ai_response);
      setSuccess(true);
      
    } catch (err) {
      setError(err.message || 'エラーが発生しました');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto p-6 max-w-4xl">
      <h1 className="text-3xl font-bold mb-8 text-center">トレーニングプラン作成</h1>
      
      <form onSubmit={handleSubmit} className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="goal_text">
            トレーニング目標
          </label>
          <textarea
            id="goal_text"
            name="goal_text"
            value={formData.goal_text}
            onChange={handleChange}
            required
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            rows="3"
            placeholder="例：3ヶ月で10kg減量したい"
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="plan_name">
            計画名
          </label>
          <input
            id="plan_name"
            name="plan_name"
            type="text"
            value={formData.plan_name}
            onChange={handleChange}
            required
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            placeholder="例：夏までにダイエット計画"
          />
        </div>

        <div className="mb-6">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="created_date">
            作成日
          </label>
          <input
            id="created_date"
            name="created_date"
            type="date"
            value={formData.created_date}
            onChange={handleChange}
            required
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>

        <div className="flex items-center justify-center gap-4">
          <button
            type="submit"
            disabled={loading}
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline disabled:opacity-50"
          >
            {loading ? 'AIプラン生成中...' : 'トレーニングプランを作成'}
          </button>
          <button
            type="button"
            onClick={handleReset}
            className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          >
            リセット
          </button>
        </div>
      </form>

      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4">
          <strong className="font-bold">エラー:</strong>
          <span className="block sm:inline"> {error}</span>
        </div>
      )}

      {success && (
        <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative mb-4">
          <strong className="font-bold">成功!</strong>
          <span className="block sm:inline"> トレーニングプランが正常に作成されました。</span>
        </div>
      )}

      {aiResponse && (
        <div className="bg-white shadow-lg rounded-lg p-6 mt-6">
          <h2 className="text-2xl font-bold mb-4">AIによるトレーニングプラン提案</h2>
          <div className="whitespace-pre-wrap text-gray-700 leading-relaxed">
            {aiResponse}
          </div>
        </div>
      )}
    </div>
  );
}

export default TrainingForm;