const sqlite3 = require("sqlite3").verbose();
const fs = require("fs");

const DB_FILES = __dirname + "/database.db";
const INIT_SQL = __dirname + "/sql/init.sql";

const db = new sqlite3.Database(DB_FILES);

db.serialize(() => {
  const init = fs.readFileSync(INIT_SQL, "utf8");
  db.exec(init);
});

module.exports = db;
