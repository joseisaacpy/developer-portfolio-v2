// IMPORTS
import { Router } from "express";
import db from "../db.js";

// CONSTANTES
const router = Router();

// ROTAS
// Criação de um novo projeto
router.post("/", (req, res) => {
  const { nome, descricao, data_criacao, status } = req.body;
  const sql = `INSERT INTO projetos (nome, descricao, data_criacao, link, status) VALUES (?, ?, ?, ?, ?)`;
  db.run(sql, [nome, descricao, data_criacao, status], (err) => {
    if (err) {
      res.status(500).send("Erro ao criar projeto");
    }
    res.status(201).json({
      message: "Projeto criado com sucesso",
      projeto: {
        nome,
        descricao,
        data_criacao,
        link,
        status,
      },
    });
  });
});

// Listagem de todos os projetos
router.get("/", (req, res) => {
  const sql = "SELECT * FROM projetos";
  db.all(sql, [], (err, rows) => {
    if (err) {
      res.status(500).send("Erro ao buscar projetos");
    }
    res.json(rows);
  });
});

// Busca de um projeto específico
router.get("/:id", (req, res) => {
  const { id } = req.params;
  const sql = "SELECT * FROM projetos WHERE id = ?";
  db.all(sql, [id], (err, rows) => {
    if (err) {
      res.status(500).send("Erro ao buscar projeto");
    }
    if (rows.length === 0) {
      return res.status(404).send("Projeto não encontrado");
    }
    res.json(rows);
  });
});

// Atualização de um projeto
router.put("/:id", (req, res) => {
  const { id } = req.params;
  const { nome, descricao, data_criacao, link, status } = req.body;
  const sql = `UPDATE projetos SET nome = ?, descricao = ?, data_criacao = ?, link = ?,status = ? WHERE id = ?`;
  db.run(sql, [nome, descricao, data_criacao, link, status, id], (err) => {
    if (err) {
      res.status(500).send("Erro ao atualizar projeto");
    }
    res.json({
      message: "Projeto atualizado com sucesso",
      projeto: {
        id,
        nome,
        descricao,
        data_criacao,
        link,
        status,
      },
    });
  });
});

// Exclusão de um projeto
router.delete("/:id", (req, res) => {
  const { id } = req.params;
  const sql = "DELETE FROM projetos WHERE id = ?";

  db.run(sql, [id], function (err) {
    if (err) {
      return res.status(500).send("Erro ao deletar projeto");
    }

    if (this.changes === 0) {
      // Nenhuma linha deletada, projeto não encontrado
      return res.status(404).send("Projeto não encontrado");
    }

    res.json({ message: "Projeto deletado com sucesso" });
  });
});

// EXPORT
export default router;
