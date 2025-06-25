// IMPORTS
import { Router } from "express";

// CONSTANTES
const router = Router();

// ROTAS
router.post("/", (req, res) => {
  res.send("Post Rota de projetos");
});

router.get("/", (req, res) => {
  res.send("Get Rota de projetos");
});

router.put("/", (req, res) => {
  res.send("Put Rota de projetos");
});

router.delete("/", (req, res) => {
  res.send("Delete Rota de projetos");
});
// EXPORT
export default router;
