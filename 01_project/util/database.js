const mysql = require("mysql2");

const pool = mysql.createPool({
  host: "localhost",
  user: "root",
  database: "test_sql",
  password: "Specialized8110",
});

module.exports = pool.promise();
