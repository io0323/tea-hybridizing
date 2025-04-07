# 品種改良シミュレーター

品種改良をシミュレートするWebアプリケーションです。React、Flask、Tailwind CSSを使用して構築されています。

## 機能

- 品種の特性（香り、耐病性、収量、味）の表示
- ドラッグ＆ドロップによる品種の選択
- 品種の交配シミュレーション
- 特性のグラフによる可視化
- 新品種の登録機能

## 技術スタック

- フロントエンド：React、Tailwind CSS、Chart.js
- バックエンド：Flask
- データ可視化：Chart.js
- ドラッグ＆ドロップ：react-dnd

## セットアップ手順

### バックエンド（Flask）のセットアップ

1. バックエンドディレクトリに移動：
```bash
cd backend
```

2. 仮想環境の作成と有効化：
```bash
python -m venv venv
source venv/bin/activate  # Windowsの場合は `venv\Scripts\activate`
```

3. 依存関係のインストール：
```bash
pip install -r requirements.txt
```

4. Flaskサーバーの起動：
```bash
python app.py
```

### フロントエンド（React）のセットアップ

1. フロントエンドディレクトリに移動：
```bash
cd frontend
```

2. 依存関係のインストール：
```bash
npm install
```

3. 開発サーバーの起動：
```bash
npm start
```

## 使用方法

1. ブラウザで `http://localhost:3000` にアクセス
2. 右側のフォームから新品種を登録
3. 品種一覧から2つの品種をドラッグ＆ドロップで選択
4. 「交配する」ボタンをクリックして新しい品種を生成
5. グラフで各品種の特性を比較

## プロジェクト構造

```
.
├── backend/
│   ├── app.py              # Flaskアプリケーション
│   └── requirements.txt    # Python依存関係
├── frontend/
│   ├── public/             # 静的ファイル
│   ├── src/                # Reactソースコード
│   ├── package.json        # Node.js依存関係
│   └── tailwind.config.js  # Tailwind設定
└── README.md               # プロジェクト説明
```

## ライセンス

MIT License 