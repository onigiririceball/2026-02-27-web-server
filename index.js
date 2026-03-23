//サーバのエントリーポイント
//mongodb(データベース)に接続しないとサーバが立ち上がらない
//app.listenをclient.connectの前におくと、ユーザがデータベースにアクセスできないままサーバにアクセス
// (docker run --rm --name=my-app-db -p 27017:27017 mongo)
const express = require('express');//express:サーバーを立ち上げる大元のライブラリ
const { MongoClient } = require('mongodb');
const path = require('path');//OSによってパスの書き方が違うのを解決
const { insertUser } = require('./user')
const { getUsers } = require('./user')
const cors = require('cors');
const app = express();//expressを使ってサーバーを立ち上げる
//app.set('view engine', 'ejs');//ejsを使ってテンプレートを表示する
const client = new MongoClient('mongodb://localhost:27017');//どのmongodbに繋ぐか

//app.use('/static', express.static(path.join(__dirname, 'public')));
app.use(cors({ origin: 'http://localhost:5173' }));//viteを使用するためのポートを開く

async function main() {
  // サーバーのlisten前に接続する
  await client.connect();//接続する(非同期関数ー＞成功するかわからないのでawaitで待つ)

  const db = client.db('my-app');

  /*
  app.get('/', async (req, res) => {//npm install ejsが必要
    const { users } = await getUsers(db);
    res.render(path.resolve(__dirname, 'views/index.ejs'), { users: users, query: '' });
  });

  app.get('/search', async (req, res) => {
    const query = req.query.query || '';
    const { users } = await getUsers(db, query);
    res.render(path.resolve(__dirname, 'views/index.ejs'), { users: users, query: query });
  });
*/

//DBからデータを取得。Reactで使用するためのAPI
  app.get('/api/users', async (req, res) => {
    const query = req.query.query || '';
    const { users } = await getUsers(db, query);
    res.json(users);
  });

  //post:データベースにデータを追加する
  //api/userにデータを送信する
  app.post('/api/user', express.json(), async (req, res) => {
    const name = req.body.name;
    const age = req.body.age;
    const { status, body } = await insertUser(name, age, db);
    res.status(status).send(body);
  });

  app.listen(3000, () => {
    console.log('start listening');
  });
}
main();