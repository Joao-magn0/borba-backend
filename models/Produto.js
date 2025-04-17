const mongoose = require('mongoose');

const produtoSchema = new mongoose.Schema({
  nome: { 
    type: String, 
    required: true, 
    trim: true 
  },
  categoria: { 
    type: String, 
    required: true, 
    trim: true 
  },
  quantidade: { 
    type: Number, 
    required: true, 
    min: 0,       // não permite valores negativos
    default: 0    // começa em zero
  }
}, {
  timestamps: true  // createdAt e updatedAt automáticos
});

module.exports = mongoose.model('Produto', produtoSchema);
