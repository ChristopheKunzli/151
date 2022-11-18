const mariadb = require('mariadb')

const pool = mariadb.createPool({
    host: 'localhost',
    user: 'admin_test_151',
    password: 'Pa$$w0rd',
    database: 'test'
})

module.exports = pool