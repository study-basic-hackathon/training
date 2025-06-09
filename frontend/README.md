# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.    
    
  
  

## `/frontend/src/hooks/userFetchData.js`でAPIエンドポイントと通信する

### `GET` リクエストの場合 (DashboardPage.jsx)

データをロードするコンポーネント（例: `DashboardPage.jsx`）で、以下のように使います。

```javascript
import React, { useEffect } from 'react';
import useFetchData from '../hooks/useFetchData.js'; // 変更されたフックをインポート

const API_URL = '/api/training'; // GETリクエスト用

const DashboardPage = () => {
    const { data, loading, error, fetchData } = useFetchData(); // fetchData関数を取得

    // コンポーネントがマウントされたときにデータを取得
    useEffect(() => {
        fetchData(API_URL, { method: 'GET' }); // URLとGETメソッドを指定して呼び出す
    }, [fetchData]); // fetchDataがメモ化されているので依存配列に含める

    // ... (既存のローディング、エラー表示、データ表示ロジック) ...
    if (loading) {
        return <div className="dashboard-loading">データを読み込み中...</div>;
    }

    if (error) {
        return <div className="dashboard-error">エラーが発生しました: {error.message}</div>;
    }

    return (
        // ... (省略) ...
    );
};

export default DashboardPage;
```

### `POST` リクエストの場合 (例: CreatePlanPage.jsx)

新しいトレーニングプランを作成するページ（`CreatePlanPage.jsx` など）で、フォームの送信時に使います。

```javascript
import React, { useState } from 'react';
import useFetchData from '../hooks/useFetchData.js';
import { useNavigate } from 'react-router-dom';

const CREATE_API_URL = '/api/training/generate-plan/'; // POSTリクエスト用のURL

const CreatePlanPage = () => {
    const { loading, error, fetchData } = useFetchData(); // dataは不要なので取得しない
    const navigate = useNavigate();

    const [planDetails, setPlanDetails] = useState({
        name: '',
        exercises: [],
        goal: '',
        frequency: [],
        start_date: '',
        end_date: '',
    });

    const handleChange = (e) => {
        setPlanDetails({ ...planDetails, [e.target.name]: e.target.value });
    };
    
    // 例: exercisesやfrequencyが配列の場合のハンドリング
    const handleArrayChange = (e, field) => {
        setPlanDetails({ ...planDetails, [field]: e.target.value.split(',').map(item => item.trim()) });
    };


    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const result = await fetchData(CREATE_API_URL, {
                method: 'POST',
                body: planDetails, // planDetailsオブジェクトがJSONとして送信される
            });
            console.log('プラン作成成功:', result);
            alert('プランが正常に作成されました！');
            navigate('/dashboard'); // ダッシュボードへ遷移
        } catch (err) {
            console.error('プラン作成エラー:', err);
            alert(`プランの作成に失敗しました: ${err.message}`);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            {/* フォーム入力フィールド */}
            <input type="text" name="name" value={planDetails.name} onChange={handleChange} placeholder="トレーニング名" />
            <input type="text" name="goal" value={planDetails.goal} onChange={handleChange} placeholder="目標" />
            <input type="text" name="frequency" value={planDetails.frequency.join(',')} onChange={(e) => handleArrayChange(e, 'frequency')} placeholder="頻度 (例: 月,水,金)" />
            <input type="text" name="exercises" value={planDetails.exercises.join(',')} onChange={(e) => handleArrayChange(e, 'exercises')} placeholder="運動内容 (例: ランニング,筋トレ)" />
            <input type="date" name="start_date" value={planDetails.start_date} onChange={handleChange} />
            <input type="date" name="end_date" value={planDetails.end_date} onChange={handleChange} />

            <button type="submit" disabled={loading}>
                {loading ? '作成中...' : 'プランを作成'}
            </button>
            {error && <p style={{ color: 'red' }}>エラー: {error.message}</p>}
        </form>
    );
};

export default CreatePlanPage;
```

#### `PUT` / `DELETE` リクエストの場合

`PUT` や `DELETE` も同様に、`method` を適切に指定して `fetchData` を呼び出します。

```javascript
// 例：PUTリクエスト (更新)
const handleUpdate = async (id, updatedData) => {
    try {
        const result = await fetchData(`/api/training/${id}/`, {
            method: 'PUT',
            body: updatedData,
        });
        console.log('更新成功:', result);
    } catch (err) {
        console.error('更新エラー:', err);
    }
};

// 例：DELETEリクエスト (削除)
const handleDelete = async (id) => {
    if (window.confirm('本当に削除しますか？')) {
        try {
            await fetchData(`/api/training/${id}/`, {
                method: 'DELETE',
            });
            console.log('削除成功');
            // 削除後、データを再取得するか、リストから削除されたアイテムをUIから除く
        } catch (err) {
            console.error('削除エラー:', err);
        }
    }
};
```