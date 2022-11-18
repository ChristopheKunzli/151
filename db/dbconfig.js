const mariadb = require('mariadb')

const pool = mariadb.createPool({
    host: 'localhost',
    user: 'admin_test_151',
    password: 'Pa$$w0rd',
    database: 'test'
})
/*
connection.connect((error) => {
    if (error) throw error
    console.log('connection to db complete')
})
*/
module.exports = pool