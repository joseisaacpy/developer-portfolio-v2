// IMPORTS
import connect from "../db/connection.js";
import Projeto from "../db/schema.js";
import { Router } from "express";

// Chama a função de conexão
await connect(); // Vai dar o console.log informando que conectou

// CONSTANTES
const router = Router();

// ROTAS

// POST
router.post("/", async (req, res) => {
  try {
    const novoProjeto = new Projeto(req.body);
    await novoProjeto.save();
    res.status(201).json(novoProjeto);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Erro ao criar projeto" });
  }
});
// GET
router.get("/", async (req, res) => {
  try {
    const allProjetos = await Projeto.find();
    res.json(allProjetos);
  } catch (error) {
    console.error(error);
  }
});

export default router;
