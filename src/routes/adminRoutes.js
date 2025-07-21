// IMPORTS
import { Router } from "express";
import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";

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
});

export default router;
