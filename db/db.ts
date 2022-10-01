const mysql = require('mysql2');


const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    port:3307,
    database: 'nodedb'
})

module.exports = connection;