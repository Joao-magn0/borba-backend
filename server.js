const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 5000;

// Conectar ao MongoDB
connectDB();

// Middlewares
app.use(cors());
app.use(express.json());

// Rotas da API
app.use("/api/financeiro", require("./routes/financeiroRoutes"));
app.use("/api/funcionarios", require("./routes/funcionarioRoutes"));
app.use("/api/produtos", require("./routes/produtoRoutes"));


// Rota base
app.get("/", (req, res) => {
  res.send("🚀 API do Sistema Borba Café está rodando!");
});

// Iniciar servidor
app.listen(PORT, () => {
  console.log(`✅ Servidor rodando na porta ${PORT}`);
});
