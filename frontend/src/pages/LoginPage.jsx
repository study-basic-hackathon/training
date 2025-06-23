// frontend/src/pages/LoginPage.jsx
import React from 'react';
import { useNavigate } from 'react-router-dom'; // ページ遷移のために useNavigate をインポート
import './LoginPage.css'; // ★追加: LoginPage.css をインポート★

const LoginPage = () => {
    const navigate = useNavigate(); // useNavigate フックを初期化

    // 「ログイン」ボタンがクリックされたときにダッシュボードページへ遷移するハンドラー
    const handleLoginClick = () => {
        navigate('/dashboard');
    };

    return (
        <div className="login-container"> {/* ★クラス名変更★ */}
            <div className="login-card"> {/* ★クラス名変更★ */}
                <h1 className="login-title">トップページ / ログイン</h1> {/* ★クラス名追加★ */}
                <p className="login-description">現在、ログイン機能は未実装です。</p> {/* ★クラス名追加★ */}
                
                {/* ログインボタン */}
                <button
                    onClick={handleLoginClick}
                    className="login-button" // ★クラス名変更★
                >
                    ログイン (ダッシュボードへ)
                </button>
            </div>
        </div>
    );
};

export default LoginPage;
