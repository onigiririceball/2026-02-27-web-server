async function insertUser(name, age, db) {
    if (!name) {
        return { status: 400, body: 'Bad Request' };
    }
    if (typeof name !== 'string') {
        return { status: 400, body: 'Bad Request'};
    }
    if (name.length > 100) {
        return { status: 400, body: 'over length'};
    }
    await db.collection('user').insertOne({ name: name, age: age });
    return { status: 200, body: 'Created' };
}

exports.insertUser = insertUser;

async function getUsers(db, search) {
    try {
        //searchがある場合は、searchに合致するデータを取得
        if (search) {
            const users = await db.collection('user').find({ name: { $regex: search } }).toArray();
            return { users: users };
        }
        //users配列の中はオブジェクト
        const users = await db.collection('user').find().toArray();//users:データベースからとってきた値(find())をtoArray()
        return { users: users };
    } catch (e) {
        return  { users: [] };
    }
}
exports.getUsers = getUsers;
  