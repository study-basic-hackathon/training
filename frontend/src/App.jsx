import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom'

// 現在のページをハイライト表示する方法
// React Router の NavLink コンポーネントを使うのが最も簡単で推奨される方法です。NavLink は、現在のURLと一致した場合に自動的に active クラスを要素に追加してくれます。
import { NavLink } from 'react-router-dom'; // ★ここをLinkからNavLinkに変更★

// // 各ページコンポーネント (後で作成)
import LoginPage from './pages/LoginPage';
import DashboardPage from './pages/DashboardPage';
// import PlanCreatePage from './pages/PlanCreatePage';
// import PlanResultPage from './pages/PlanResultPage';

// // 共通コンポーネント (後で作成)
import Header from './components/common/Header';
// import Footer from './components/common/Footer';

import './App.css'

function App() {

    return (<>
        <Router>
            <Header />

            {/* 各ページへのナビゲーションリンク (開発中はアクセスしやすいように設置) */}
            <nav style={{ width: '100%', padding: '2px', backgroundColor: '#ccc' }}>
                <p style={{ color: '#333', margin: 0, padding: 0 }}>各ページへのナビゲーションリンク (開発中はアクセスしやすいように設置)</p>
                <div style={{ display: 'flex', justifyContent: 'center', gap: '2rem' }}>
                    <NavLink to="/" end>Login (Top)</NavLink>
                        {/* end プロパティ: ルートパス (/) の NavLink には end プロパティを追加しています。これは exact プロパティの新しい名称で、パスが完全に一致する場合にのみ active クラスを適用するために使います。これがないと、/dashboard にいる時でも / のリンクがアクティブになってしまう可能性があります。 */}
                    <NavLink to="/dashboard">Dashboard</NavLink>
                    <NavLink to="/create">Create Plan</NavLink>
                    <NavLink to="/result">Plan Result</NavLink>
                </div>
            </nav>
            
            {/* ルートの定義 */}
            <Routes>
                <Route path="/" element={<LoginPage />} /> 初期表示のルート
                <Route path="/login" element={<LoginPage />} />
                <Route path="/dashboard" element={<DashboardPage />} />
                {/* <Route path="/create" element={<PlanCreatePage />} /> */}
                {/* <Route path="/result" element={<PlanResultPage />} /> */}
                {/* その他のルートがあれば追加 */}
            </Routes>

            {/* <Footer /> */}
        </Router>
    </>)
}

export default App
