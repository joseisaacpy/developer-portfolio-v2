// IMPORTS
import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import router from "./src/routes/routeProjects.js";
import db from "./src/db.js";

// CONSTANTES
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const app = express();
const port = 3000;

// MIDDLEWARES
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "src")));
app.use("/api/projetos", router); // CRUD de projetos

// ROTAS
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "src", "views", "index.html"));
});

// OUVINTE DE SERVIDOR
app.listen(port, () => {
  console.log("Servidor rodando em http://localhost:3000");
});
