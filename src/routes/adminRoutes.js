// IMPORTS
import { Router } from "express";
import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";
import db from "../db.js";

dotenv.config();

// CONSTANTES
const router = Router();
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// ROTAS
router.get("/", (req, res) => {
  // Verifica se o usuário está logado
  if (req.session && req.session.user) {
    return res.redirect("/admin");
  }
  // Renderiza o arquivo HTML
  res.sendFile(path.join(__dirname, "../views/login.html"));
});

router.post("/", (req, res) => {
  const { email, senha } = req.body;

  if (!email || !senha) {
    return res.status(400).send("Preencha todos os campos.");
  }
  // Consulta ao banco SQLite3
  const query = `SELECT * FROM administradores WHERE email = ? AND senha = ?`;

  db.get(query, [email, senha], (err, row) => {
    if (err) {
      console.error("Erro ao consultar banco:", err);
      return res.status(500).send("Erro interno do servidor.");
    }

    if (row) {
      req.session.user = { id: row.id, email: row.email };
      return res.status(200).send("Login bem-sucedido.");
    } else {
      return res.status(401).send("Email ou senha inválidos.");
    }
  });
});

export default router;
