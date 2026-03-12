# 2026-02-27-web-server

### 仕様
- 下記情報を管理するツール
  - name
  - age
- nameとageを入力して送信ボタンを押すと、mongodbにデータが格納される
- 格納されたデータは、リロード後にhttp://localhost:3000/に表示される
- nameとageが両方入力されないまま送信ボタンが押された場合、アラートが出る
- 検索欄にキーワードを入力して検索ボタンを押すと、nameが一致するデータのみ表示される
- 検索結果はマッチした文字列がハイライト表示される

### フォルダ構成
```
web/
├── index.js          # サーバーのエントリーポイント（Express）
├── user.js           # DBへのデータ挿入・取得のロジック
├── user.test.js      # user.jsのテスト
├── public/
│   └── index.js      # クライアントサイドのJavaScript
├── views/
│   └── index.ejs     # HTMLテンプレート
└── .github/
    └── workflows/
        └── ci.yml    # GitHub Actions CI設定

```

### 起動方法
```bash
# MongoDBをDockerで起動
docker run --rm --name=my-app-db -p 27017:27017 mongo

# サーバーを起動
node index.js
```

### テスト実行
```bash
node --test
```

