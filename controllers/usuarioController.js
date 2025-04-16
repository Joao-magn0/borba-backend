const Usuario = require('../models/Usuario');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

exports.createUsuario = async (req, res) => {
  try {
    const { usuario, senha } = req.body;

    const existente = await Usuario.findOne({ usuario });
    if (existente) return res.status(400).json({ message: "Usuário já existe" });

    const hashed = await bcrypt.hash(senha, 10);
    const novoUsuario = new Usuario({
      usuario,
      senha: hashed,
      hierarquia: "funcionario" // Evita que criem admins via frontend
    });

    await novoUsuario.save();
    res.status(201).json({ message: "Usuário registrado com sucesso!" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.loginUsuario = async (req, res) => {
  try {
    const { usuario, senha } = req.body;

    const user = await Usuario.findOne({ usuario });
    if (!user) return res.status(400).json({ message: "Usuário não encontrado" });

    const senhaCorreta = await bcrypt.compare(senha, user.senha);
    if (!senhaCorreta) return res.status(401).json({ message: "Senha incorreta" });

    const token = jwt.sign(
      { id: user._id, hierarquia: user.hierarquia },
      process.env.JWT_SECRET,
      { expiresIn: "2h" }
    );

    res.json({ token, hierarquia: user.hierarquia });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
