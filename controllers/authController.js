const Usuario = require("../models/Usuario");
const bcrypt = require("bcryptjs");

exports.registrar = async (req, res) => {
  try {
    const { nome, usuario, senha } = req.body;

    const jaExiste = await Usuario.findOne({ usuario });
    if (jaExiste) return res.status(400).json({ message: "Usuário já existe." });

    const senhaCriptografada = await bcrypt.hash(senha, 10);

    const novoUsuario = new Usuario({ nome, usuario, senha: senhaCriptografada });
    await novoUsuario.save();

    res.status(201).json({ message: "Usuário registrado com sucesso!" });
  } catch (error) {
    res.status(500).json({ message: "Erro ao registrar usuário." });
  }
};

exports.login = async (req, res) => {
  try {
    const { usuario, senha } = req.body;

    const usuarioEncontrado = await Usuario.findOne({ usuario });
    if (!usuarioEncontrado) return res.status(404).json({ message: "Usuário não encontrado." });

    const senhaCorreta = await bcrypt.compare(senha, usuarioEncontrado.senha);
    if (!senhaCorreta) return res.status(401).json({ message: "Senha incorreta." });

    res.json({
      message: "Login realizado com sucesso!",
      usuario: {
        nome: usuarioEncontrado.nome,
        usuario: usuarioEncontrado.usuario,
        nivel: usuarioEncontrado.nivel
      }
    });
  } catch (error) {
    res.status(500).json({ message: "Erro ao fazer login." });
  }
};
