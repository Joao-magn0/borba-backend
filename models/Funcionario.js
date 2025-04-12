const mongoose = require("mongoose");

const FuncionarioSchema = new mongoose.Schema({
  nome: {
    type: String,
    required: true,
  },
  foto: {
    type: String,
    default: "foto-perfil.png", // boneco cinza
  },
  consumo: {
    type: Number,
    default: 0,
  },
}, {
  timestamps: true,
});

module.exports = mongoose.model("Funcionario", FuncionarioSchema);
