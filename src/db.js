// IMPORTS
import sqlite3 from "sqlite3";

// CONTANTES
const { verbose } = sqlite3;
const sqlite = verbose();
const db = new sqlite.Database("./src/db/database.db", (err) => {
  if (err) {
    console.error("Error opening database:", err.message);
  } else {
    console.log("Connected to the SQLite database.");
  }
});

// CRIAÇÃO DE TABELAS
db.run(`CREATE TABLE IF NOT EXISTS projetos (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  nome TEXT NOT NULL,
  descricao TEXT,
  data_criacao TEXT DEFAULT (datetime('now')),
  link TEXT,
  status TEXT
)`);

// EXPORTAÇÃO
export default db;
