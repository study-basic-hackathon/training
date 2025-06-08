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

function App() {

    return (<>
        <Router>
            <Header />
            
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
