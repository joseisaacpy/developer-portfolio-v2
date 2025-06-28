// IMPORTS
import express from "express";
import session from "express-session";
import path from "path";
import { fileURLToPath } from "url";
import projetosRoutes from "./src/routes/projetosRoutes.js";
import adminRoutes from "./src/routes/adminRoutes.js";

// CONSTANTES
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const app = express();
const port = 3000;

// Express Session
app.use(
  session({
    secret: "chaveSecretaPortfolio",
    resave: false,
    saveUninitialized: false,
  })
);

// MIDDLEWARES
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));
app.use(express.static(path.join(__dirname, "src")));
app.use("/api/projetos", projetosRoutes); // CRUD de projetos
app.use("/login", adminRoutes); // Rotas do ADM realizar login

// ROTAS
// Rota raiz
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "src", "views", "index.html"));
});

// Rotas de curriculo
app.get("/curriculo", (req, res) => {
  res.download(
    path.join(__dirname, "public", "Jose-Isaac-Estagio-TI.pdf"),
    "Curriculo-Jose-Isaac.pdf"
  );
});

// Rota do ADM
app.get("/admin", (req, res) => {
  res.sendFile(path.join(__dirname, "src", "views", "form-projeto.html"));
});

//
app.use((req, res) => {
  res.status(404).sendFile(path.join(__dirname, "src", "views", "404.html"));
});

// OUVINTE DE SERVIDOR
app.listen(port, () => {
  console.log("Servidor rodando em http://localhost:3000");
});
