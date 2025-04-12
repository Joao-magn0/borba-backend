const mongoose = require('mongoose');

const LancamentoSchema = new mongoose.Schema({
  data: {
    type: String, // Armazenado como "DD/MM/AAAA"
    required: true
  },
  descricao: {
    type: String,
    required: true
  },
  tipo: {
    type: String,
    enum: ['receita', 'despesa'],
    required: true
  },
  valor: {
    type: Number,
    required: true
  }
});

module.exports = mongoose.model('Lancamento', LancamentoSchema);
