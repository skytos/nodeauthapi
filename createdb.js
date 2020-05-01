const sqlite3 = require('sqlite3').verbose()

const createSql = 'CREATE TABLE users ( id INTEGER PRIMARY KEY, username TEXT NOT NULL, password TEXT NOT NULL)'
const indexSql = 'CREATE UNIQUE INDEX users_username_idx ON users(username)'

const db = new sqlite3.Database('users.db')
db.serialize(() => {
    db.run(createSql)
    db.run(indexSql)
})