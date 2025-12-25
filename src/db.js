const path = require("path");
const fs = require("fs");
const sqlite3 = require("sqlite3");
const { open } = require("sqlite");

const dataDir = path.join(__dirname, "..", "data");
const dbPath = process.env.DB_PATH || path.join(dataDir, "recipes.db");

let dbPromise;

const ensureDataDir = () => {
  if (!fs.existsSync(dataDir)) {
    fs.mkdirSync(dataDir, { recursive: true });
  }
};

const initDb = async () => {
  ensureDataDir();
  const db = await open({
    filename: dbPath,
    driver: sqlite3.Database,
  });

  await db.exec(`
    CREATE TABLE IF NOT EXISTS recipes (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      title TEXT NOT NULL,
      ingredients TEXT NOT NULL,
      procedure TEXT NOT NULL,
      image_url TEXT,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    );
  `);

  dbPromise = Promise.resolve(db);
  return db;
};

const getDb = async () => {
  if (!dbPromise) {
    dbPromise = initDb();
  }

  return dbPromise;
};

module.exports = {
  initDb,
  getDb,
};
