const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const Usuario = require("../models/Usuario");

const JWT_SECRET = process.env.JWT_SECRET || "segredo-borba";

router.post("/registrar", async (req, res) => {
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

module.exports = router;
