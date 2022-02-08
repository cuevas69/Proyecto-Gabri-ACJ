var mongoose = require("mongoose"),
  Schema = mongoose.Schema;

var pokemon = new Schema({
  nombre: { type: String },
  id: { type: Number },
  tipo: { type: String },
  genero: { type: String },
});

module.exports = mongoose.model("Pokemon", pokemon);