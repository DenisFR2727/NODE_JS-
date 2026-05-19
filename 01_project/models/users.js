const fs = require("fs");
const path = require("path");

const p = path.join(path.dirname(require.main.filename), "data", "users.json");

const getUsersFromFile = async (cb) => {
  fs.readFile(p, (err, fileContent) => {
    if (err) {
      cb([]);
    } else {
      cb(JSON.parse(fileContent));
    }
  });
};

module.exports = class User {
  constructor(name) {
    this.name = name;
  }

  save() {
    this.id = Math.random().toString();
    getUsersFromFile((users) => {
      users.push(this);

      fs.writeFile(p, JSON.stringify(users), (err) => {
        console.log(err);
      });
    });
  }
  static async fetchUsersAll(cb) {
    getUsersFromFile(cb);
  }
  static findById(id, cb) {
    getUsersFromFile((users) => {
      const user = users.find((u) => u.id === id);
      cb(user);
    });
  }
};
