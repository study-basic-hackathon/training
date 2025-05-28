### 手順1（必要なら）: 不足しているモジュールをインストールする

`pip install djangorestframework`  
`pip install django-cors-headers`  

(プロジェクトルート)/frontendで  
`npm install`  

### 手順2: ローカルサーバーを立てる
[バックエンド] (プロジェクトルート)/backend　で　python manage.py runserver 8080    
[フロントエンド] (プロジェクトルート)/frontend　で　npm run dev

### 手順3: ブラウザで確認
勝手にブラウザが立ち上がってVite+Reactのページが見られる。  
もし見られなかったら、
`http://localhost:5173` にアクセスする。  
`http://localhost:5173/api/training` にアクセスするとバックエンドAPIのエントリーポイントをのぞける  

バックエンド側では　`http://localhost:8080/api/training`  
