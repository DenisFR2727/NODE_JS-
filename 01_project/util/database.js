// Sequelize version
const Sequelize = require("sequelize");

const sequelize = new Sequelize("test_sql", "root", "Specialized8110", {
  dialect: "mysql",
  host: "localhost",
});

module.exports = sequelize;

// MySQL version poll

// const mysql = require("mysql2");

// const pool = mysql.createPool({
//   host: "localhost",
//   user: "root",
//   database: "test_sql",
//   password: "Specialized8110",
// });

// module.exports = pool.promise();
