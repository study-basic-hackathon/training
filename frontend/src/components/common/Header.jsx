// 現在のページをハイライト表示する方法
// React Router の NavLink コンポーネントを使うのが最も簡単で推奨される方法です。NavLink は、現在のURLと一致した場合に自動的に active クラスを要素に追加してくれます。
import { NavLink } from 'react-router-dom'; // ★ここをLinkからNavLinkに変更★

const Header = () => {
    return (<>
        <div>
            <hr />
            <p>(HEADER)</p>
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
                <p style={{ color: '#333', margin: 0, padding: 0 }}>APIエンドポイントのテスト用</p>
                <div style={{ display: 'flex', justifyContent: 'center', gap: '2rem' }}>
                    <NavLink to="/test/users/register">Users Register Test</NavLink>
                    <NavLink to="/test/login">Users Login Test</NavLink>
                    <NavLink to="/test/training">Training CRUD Test</NavLink>
                    <NavLink to="/test/ai">AI Test</NavLink>
                </div>
            </nav>

            <p>(HEADERおわり)</p>
            <hr />
        </div>
    </>);
};

export default Header;