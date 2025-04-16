const mongoose = require('mongoose');

const UsuarioSchema = new mongoose.Schema({
  usuario: {
    type: String,
    required: true,
    unique: true
  },
  senha: {
    type: String,
    required: true
  },
  hierarquia: {
    type: String,
    enum: ["admin", "funcionario"],
    default: "funcionario"
  }
});

module.exports = mongoose.model("Usuario", UsuarioSchema);
