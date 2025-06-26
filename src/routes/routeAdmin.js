// IMPORTS
import { Router } from "express";

// CONSTANTES
const router = Router();

// ROTAS
router.get("/", (req, res) => {
  res.send(`
    <form method="POST" action="/login">
      <input type="email" name="email" placeholder="Email" required/>
      <input type="password" name="senha" placeholder="Senha" required/>
      <button type="submit">Entrar</button>
    </form>
  `);
});

router.post("/", (req, res) => {
  const { email, senha } = req.body;
  if (email === "joseisaacnascimento@gmail.com" && senha === "12345678") {
    req.session.user = { email };
    res.redirect("/admin");
  } else {
    res.send("Login inválido");
  }
});

export default router;
