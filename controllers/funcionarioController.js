const Funcionario = require('../models/Funcionario');


exports.getFuncionarios = async (req, res) => {
  try {
    const funcionarios = await Funcionario.find();
    res.json(funcionarios);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.createFuncionario = async (req, res) => {
  try {
    const novo = new Funcionario(req.body);
    await novo.save();
    res.status(201).json(novo);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

exports.updateConsumo = async (req, res) => {
  try {
    const funcionario = await Funcionario.findById(req.params.id);
    if (!funcionario) return res.status(404).json({ message: 'Funcionário não encontrado' });

    funcionario.consumo += req.body.valor;
    await funcionario.save();

    res.json(funcionario);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

exports.deleteFuncionario = async (req, res) => {
  try {
    const funcionario = await Funcionario.findByIdAndDelete(req.params.id);
    if (!funcionario) return res.status(404).json({ message: 'Funcionário não encontrado' });
    res.json({ message: 'Funcionário removido' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
