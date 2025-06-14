// src/components/TrainingForm.jsx

import React, { useState, useEffect } from 'react';

function TrainingForm() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  // 一覧
  const [trainings, setTrainings] = useState([]); // トレーニングプランのリスト用
  useEffect(() => {
    const fetchTrainings = async () => {
      try {
        const res = await fetch('/api/training/'); 
        if (!res.ok) throw new Error('一覧取得に失敗しました');
        const data = await res.json();
        setTrainings(data);
      } catch (err) {
        setError(err.message || 'トレーニングプランの取得に失敗しました');
      }
    };
    fetchTrainings();
  }, [success]); // 新規作成後も再取得

  // 新規登録のテスト
  const [aiResponse, setAiResponse] = useState('');
  const [formData, setFormData] = useState({
    name: '',
    exercises: '',
    goal: '', // 目標
    frequency: '', // 週何回
    start_date: new Date().toISOString().split('T')[0],
    end_date: new Date().toISOString().split('T')[0]
  });

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
      name: '',
      exercises: '',
      goal: '',
      frequency: '',
      start_date: new Date().toISOString().split('T')[0],
      end_date: new Date().toISOString().split('T')[0],
    });
    setAiResponse('');
    setError('');
    setSuccess(false);
  };

  const [editId, setEditId] = useState(null); // 編集用のIDを管理

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess(false);
    setAiResponse('');

    try {
    //   // ユーザーIDを取得（ローカルストレージまたはコンテキストから）
    //   const userId = localStorage.getItem('userId');
    //   if (!userId) {
    //     throw new Error('ユーザーが登録されていません。先にログインしてください。');
    //   }

      let response;
      if (editId) {
        // 編集の場合はPUTリクエスト
        response = await fetch(`/api/training/${editId}/`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            ...formData,
            // user_id: userId // ユーザーIDはサーバー側で自動でセットする（ユーザ－側からの変更不可にするべき）
          })
        });
      } else {
        // 新規登録の場合はPOSTリクエスト
        response = await fetch('/api/training/', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            ...formData,
          //   user_id: userId // ユーザーIDはサーバー側で自動でセットする（ユーザ－側からの変更不可にするべき）
          })
        });
      }

      if (!response.ok) {
        throw new Error(editId ? '更新に失敗しました' : '送信に失敗しました');
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

  // 編集用の関数
  const handleEdit = (item) => {
    setFormData({
        name: item.name,
        exercises: item.exercises,
        goal: item.goal,
        frequency: item.frequency,
        start_date: item.start_date,
        end_date: item.end_date,
    });
    // 編集時は何かフラグを立てて、submit時にPUT/POSTを切り替える実装もおすすめです
    setEditId(item.id); // 編集中のIDをセットして編集モードに
    handleSubmit();
  };
    
  // 削除用の関数
    const handleDelete = async (id) => {
        if (!window.confirm('本当に削除しますか？')) return;
        try {
            setLoading(true);
            setError('');
            const res = await fetch(`/api/training/${id}/`, { method: 'DELETE' });
            if (!res.ok) throw new Error('削除に失敗しました');
            setSuccess(true);
            // 削除後に一覧を再取得
            setTrainings(trainings.filter((t) => t.id !== id));
        } catch (err) {
            setError(err.message || '削除時にエラーが発生しました');
        } finally {
            setLoading(false);
        }
    };

  return (
    <div className="container mx-auto p-6 max-w-4xl">
        
      {/* 一覧表示 */}
      <div className="mt-10">
        <h2 className="text-xl font-bold mb-2">一覧・変更・削除のテスト</h2>
        <table className="min-w-full bg-white border">
          <thead>
            <tr>
              <th className="border px-4 py-2">ID</th>
              <th className="border px-4 py-2">プラン名</th>
              <th className="border px-4 py-2">目的</th>
                <th className="border px-4 py-2">運動内容</th>
              <th className="border px-4 py-2">頻度</th>
              <th className="border px-4 py-2">スタート日</th>
              <th className="border px-4 py-2">終了日</th>
            </tr>
          </thead>
          <tbody>
            {trainings.length === 0 ? (
              <tr>
                <td colSpan="4" className="text-center py-4">データがありません</td>
              </tr>
            ) : (
              trainings.map((t) => (
                <tr key={t.id}>
                  <td className="border px-4 py-2">{t.id}</td>
                  <td className="border px-4 py-2">{t.name}</td>
                  <td className="border px-4 py-2">{t.goal}</td>
                  <td className="border px-4 py-2">{t.exercises}</td>
                  <td className="border px-4 py-2">{t.frequency}</td>
                  <td className="border px-4 py-2">{t.start_date}</td>
                  <td className="border px-4 py-2">{t.end_date}</td>
                  <td className="border px-4 py-2">
                    <button
                        className="bg-yellow-400 hover:bg-yellow-500 text-white font-bold py-1 px-3 rounded mr-2"
                        onClick={() => handleEdit(t)}
                    >
                        変更
                    </button>
                    <button
                        className="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-3 rounded"
                        onClick={() => handleDelete(t.id)}
                    >
                        削除
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      <hr />

      {/* 新規作成 */}
      <h1 className="text-3xl font-bold mb-8 text-center">トレーニングプラン{ editId ? '変更' : '新規作成'}test</h1>

      <form onSubmit={handleSubmit} className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="name">
            トレーニングプランに名前をつけましょう
          </label>
          <input
            id="name"
            name="name"
            type="text"
            value={formData.name}
            onChange={handleChange}
            required
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            placeholder="例：夏までにダイエット計画"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="goal">
            トレーニングの目的を教えてください
          </label>
          <textarea
            id="goal"
            name="goal"
            value={formData.goal}
            onChange={handleChange}
            required
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            rows="3"
            placeholder="例：3ヶ月で10kg減量したい"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="exercises">
            どんな運動を行いますか？
          </label>
          <textarea
            id="exercises"
            name="exercises"
            value={formData.exercises}
            onChange={handleChange}
            required
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            rows="3"
            placeholder="例：筋トレ、ランニング、ヨガなど"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="frequency">
            週に何回トレーニングを行いますか？
          </label>
          <textarea
            id="frequency"
            name="frequency"
            value={formData.frequency}
            onChange={handleChange}
            required
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            rows="3"
            placeholder="例：週3回（月、水、金）, 週1回, 毎日など"
          />
        </div>

        <div className="mb-6">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="start_date">
            スタート日
          </label>
          <input
            id="start_date"
            name="start_date"
            type="date"
            value={formData.start_date}
            onChange={handleChange}
            required
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>
        <div className="mb-6">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="end_date">
            終了日
          </label>
          <input
            id="end_date"
            name="end_date"
            type="date"
            value={formData.end_date}
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
            {loading ? 'AIプラン生成中...' : `トレーニングプランを ${editId ? '変更' : '新規作成'}`}
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