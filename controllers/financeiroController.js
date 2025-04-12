// controllers/financeiroController.js

const Lancamento = require('../models/Lancamento');

exports.getLancamentos = async (req, res) => {
  try {
    const lancamentos = await Lancamento.find();
    res.json(lancamentos);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.createLancamento = async (req, res) => {
  try {
    const novo = new Lancamento(req.body);
    await novo.save();
    res.status(201).json(novo);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

exports.deleteLancamento = async (req, res) => {
  try {
    const lancamento = await Lancamento.findByIdAndDelete(req.params.id);
    if (!lancamento) return res.status(404).json({ message: 'Lançamento não encontrado' });
    res.json({ message: 'Lançamento removido' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
