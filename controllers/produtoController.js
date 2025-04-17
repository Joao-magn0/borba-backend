const Produto = require('../models/Produto');

exports.getProdutos = async (req, res) => {
  try {
    const produtos = await Produto.find();
    res.json(produtos);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.createProduto = async (req, res) => {
  try {
    const novo = new Produto(req.body);
    await novo.save();
    res.status(201).json(novo);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// **NOVO**: atualiza quantidade somando o delta (+ ou –)
exports.updateQuantidade = async (req, res) => {
  try {
    const { delta } = req.body; // espera { delta: 1 } ou { delta: -1 }
    const produto = await Produto.findById(req.params.id);
    if (!produto) return res.status(404).json({ message: 'Produto não encontrado' });
    produto.quantidade = Math.max(0, produto.quantidade + delta);
    await produto.save();
    res.json(produto);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.deleteProduto = async (req, res) => {
  try {
    const produto = await Produto.findByIdAndDelete(req.params.id);
    if (!produto) return res.status(404).json({ message: 'Produto não encontrado' });
    res.json({ message: 'Produto removido' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
