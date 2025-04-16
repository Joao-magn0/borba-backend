const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const Usuario = require("../models/Usuario");

const JWT_SECRET = process.env.JWT_SECRET || "segredo-borba";

// Rota de registro
router.post("/register", async (req, res) => {
  const { usuario, senha, hierarquia } = req.body;

  if (!usuario || !senha || !hierarquia) {
    return res.status(400).json({ message: "Preencha todos os campos." });
  }

  try {
    const existeUsuario = await Usuario.findOne({ usuario });
    if (existeUsuario) {
      return res.status(400).json({ message: "Usuário já existe." });
    }

    const senhaHash = await bcrypt.hash(senha, 10);
    const novoUsuario = new Usuario({ usuario, senha: senhaHash, hierarquia });
    await novoUsuario.save();

    res.status(201).json({ message: "Usuário registrado com sucesso." });
  } catch (error) {
    res.status(500).json({ message: "Erro no servidor." });
  }
});

// Rota de login
router.post("/login", async (req, res) => {
  const { usuario, senha } = req.body;

  if (!usuario || !senha) {
    return res.status(400).json({ message: "Preencha todos os campos." });
  }

  try {
    const user = await Usuario.findOne({ usuario });
    if (!user) {
      return res.status(404).json({ message: "Usuário não encontrado." });
    }

    const senhaValida = await bcrypt.compare(senha, user.senha);
    if (!senhaValida) {
      return res.status(401).json({ message: "Senha incorreta." });
    }

    const token = jwt.sign(
      { id: user._id, hierarquia: user.hierarquia, usuario: user.usuario },
      JWT_SECRET,
      { expiresIn: "7d" }
    );

    res.status(200).json({
      token,
      usuario: user.usuario,
      hierarquia: user.hierarquia,
    });
  } catch (error) {
    res.status(500).json({ message: "Erro no servidor." });
  }
});

module.exports = router;
