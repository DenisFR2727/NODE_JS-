const dns = require("dns");
const mongodb = require("mongodb");

const MongoClient = mongodb.MongoClient;

let _db;
// MongoDB connection pool
const mongoConnect = (callback) => {
  // Router DNS may refuse SRV queries from Node.js (querySrv ECONNREFUSED)
  dns.setServers(["8.8.8.8", "1.1.1.1"]);

  MongoClient.connect(
    "mongodb+srv://dh92fr_db_user:Specialized8110@clusters.4wo2tpe.mongodb.net/?appName=Clusters",
  )
    .then((client) => {
      console.log("Connected!");
      _db = client.db();
      callback(client);
    })
    .catch((err) => {
      console.log(err);
      throw err;
    });
};
const getDb = () => {
  if (_db) {
    return _db;
  }
  throw "No database found!";
};
module.exports = { mongoConnect, getDb };

// Sequelize version
// const Sequelize = require("sequelize");

// const sequelize = new Sequelize("test_sql", "root", "Specialized8110", {
//   dialect: "mysql",
//   host: "localhost",
// });

// module.exports = sequelize;

// MySQL version poll

// const mysql = require("mysql2");

// const pool = mysql.createPool({
//   host: "localhost",
//   user: "root",
//   database: "test_sql",
//   password: "Specialized8110",
// });

// module.exports = pool.promise();
