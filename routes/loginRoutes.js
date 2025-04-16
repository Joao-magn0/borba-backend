const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const Usuario = require("../models/Usuario");

const JWT_SECRET = process.env.JWT_SECRET || "segredo-borba";

router.post("/login", async (req, res) => {
  const { usuario, senha } = req.body;

  if (!usuario || !senha) {
    return res.status(400).json({ message: "Usuário e senha obrigatórios." });
  }

  try {
    const usuarioEncontrado = await Usuario.findOne({ usuario });
    if (!usuarioEncontrado) {
      return res.status(400).json({ message: "Usuário não encontrado." });
    }

    const senhaCorreta = await bcrypt.compare(senha, usuarioEncontrado.senha);
    if (!senhaCorreta) {
      return res.status(401).json({ message: "Senha incorreta." });
    }

    const token = jwt.sign(
      { id: usuarioEncontrado._id, usuario: usuarioEncontrado.usuario, hierarquia: usuarioEncontrado.hierarquia },
      JWT_SECRET,
      { expiresIn: "2h" }
    );

    res.json({ token, hierarquia: usuarioEncontrado.hierarquia });
  } catch (error) {
    res.status(500).json({ message: "Erro ao fazer login." });
  }
});

module.exports = router;
