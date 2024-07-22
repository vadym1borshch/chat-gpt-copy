const sql = require('better-sqlite3')
const db = sql('users.db')

db.prepare(
  `
   CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    email TEXT UNIQUE,
    password TEXT
  )
`
).run()

module.exports = db;