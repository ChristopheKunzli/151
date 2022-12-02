const mariadb = require('mariadb')

const pool = mariadb.createPool({
    host: 'localhost',
    user: 'your_user',
    password: 'your_password',
    database: 'your_db'
})

module.exports = pool