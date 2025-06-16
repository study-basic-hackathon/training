import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom'

// // 各ページコンポーネント (後で作成)
import LoginPage from './pages/LoginPage';
import DashboardPage from './pages/DashboardPage';
// import PlanCreatePage from './pages/PlanCreatePage';
// import PlanResultPage from './pages/PlanResultPage';

// // 共通コンポーネント (後で作成)
import Header from './components/common/Header';
// import Footer from './components/common/Footer';

import './App.css'

// // 開発用コンポーネント
import TrainingForm from './components/TrainingForm';
import UserRegistration from './components/UserRegistration'; // ユーザー登録コンポーネントをインポート
import AITest from './components/AITest'; // ユーザー登録コンポーネントをインポート

function App() {

    return (<>
        <Router>
            <Header />
            
            {/* ルートの定義 */}
            <Routes>
                <Route path="/" element={<LoginPage />} /> {/* 初期表示のルート */}
                <Route path="/dashboard" element={<DashboardPage />} />
                {/* <Route path="/create" element={<PlanCreatePage />} /> */}
                {/* <Route path="/result" element={<PlanResultPage />} /> */}
                {/* その他のルートがあれば追加 */}

                {/* 開発用 */}
                <Route path="/test/users/register" element={<UserRegistration />} /> {/* User新規登録のテスト */}
                <Route path="/test/training" element={<TrainingForm />} />  {/* APIトレーニングのダッシュボード */}
                <Route path="/test/ai" element={<AITest />} />  {/* AI生成部分のみのテスト */}
            </Routes>

            {/* <Footer /> */}
        </Router>
    </>)
}

export default App
