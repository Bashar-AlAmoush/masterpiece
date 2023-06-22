const Pool = require("pg").Pool;

const pool = new Pool({
    user: 'postgres',
    password: 'admin',
    host: 'localhost',
    port: 5555,
    database: 'postgres',

})


module.exports = pool;